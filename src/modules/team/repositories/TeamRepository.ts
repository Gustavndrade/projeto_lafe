import { PrismaClient } from "@prisma/client";
import { TeamModel } from "../models/TeamModel";
import { TeamRequestDTO, TeamUpdateDTO } from "../dtos/TeamRequestDTO";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationQuery, PaginationResponse } from "../../../shared/dtos/PaginationDTO";


const prisma = new PrismaClient();

export class TeamRepository {

    async createTeam(team: TeamRequestDTO): Promise<TeamModel> {

        const newTeam = TeamModel.dtos(team);

        if (!newTeam) {
            throw new AppError("Dados inválidos para criar time", 400);
        }

        const existingTeam = await prisma.team.findFirst({
            where: {
                id: newTeam.id,
                deletedAt: null
            }
        });

        if (existingTeam) {
            throw new AppError("Time já cadastrado", 400);
        }


        const createdTeam = await prisma.team.create({
            data: newTeam.dataToPrisma()
        });

        return TeamModel.prismaToModel(createdTeam);
    }

    async listTeams(): Promise<TeamModel[]> {
        const teams = await prisma.team.findMany({
            where: {
                deletedAt: null
            }
        });
        return teams.map(team => TeamModel.prismaToModel(team));
    }

    async listTeamsPaginated(query: PaginationQuery): Promise<PaginationResponse<TeamModel>> {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        const where: any = {
            deletedAt: null
        };
        
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { id: { contains: query.search, mode: 'insensitive' } }
            ];
        }
        
        if (query.role) {
            where.role = query.role;
        }

        const [teams, total] = await Promise.all([
            prisma.team.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.team.count({ where })
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: teams.map(team => TeamModel.prismaToModel(team)),
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        };
    }

    async findById(id: number): Promise<TeamModel | null> {

        const team = await prisma.team.findFirst({
            where: {
                id: id,
                deletedAt: null
            }
        });

        if (!team) {
            return null;
        }

        return TeamModel.prismaToModel(team);
    }

    async alterTeam(id: number, team: TeamUpdateDTO): Promise<TeamModel> {

        const existingTeam = await this.findById(id);
        if (!existingTeam) {
            throw new AppError("Time não encontrado", 404);
        }


        const updateData: any = {};


        if (team.name !== undefined) {
            updateData.name = team.name;
        }
        
        if (team.description !== undefined) {
            updateData.description = team.description;
        }
        
        if (team.status !== undefined) {
            updateData.role = team.status;
        }
        
        if (team.id_course) {
            updateData.id_course = team.id_course;
        }
        
        const updatedTeam = await prisma.team.update({
            where: {
                id: id
            },
            data: updateData
        });

        return TeamModel.prismaToModel(updatedTeam);
    }

    async deleteTeam(id: number): Promise<void> {

        const existingTeam = await this.findById(id);

        if (!existingTeam) {
            throw new AppError("Time não encontrado", 404);
        }

        await prisma.team.update({
            where: {
                id: id
            },
            data: {
                deletedAt: new Date()
            }
        });
    }

    async restoreTeam(id: number): Promise<TeamModel> {
        const team = await prisma.team.findFirst({
            where: {
                id: id,
                deletedAt: { not: null }
            }
        });

        if (!team) {
            throw new AppError("Time não encontrado ou não está deletado", 404);
        }

        const restoredTeam = await prisma.team.update({
            where: {
                id: id
            },
            data: {
                deletedAt: null
            }
        });

        return TeamModel.prismaToModel(restoredTeam);
    }

    async findDeletedTeams(): Promise<TeamModel[]> {
        const team = await prisma.team.findMany({
            where: {
                deletedAt: { not: null }
            },
            orderBy: { deletedAt: 'desc' }
        });
        
        return team.map(team => TeamModel.prismaToModel(team));
    }


}