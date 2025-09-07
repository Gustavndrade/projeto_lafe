import { PrismaClient } from "@prisma/client";
import { UserModel } from "../models/UserModel";
import { UserRequestDTO, UserUpdateDTO } from "../dtos/UserRequestDTO";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationQuery, PaginationResponse } from "../../../shared/dtos/PaginationDTO";


const prisma = new PrismaClient();

export class UserRepository {

    async createUser(user: UserRequestDTO): Promise<UserModel> {

        const newUser = UserModel.dtos(user);

        if (!newUser) {
            throw new AppError("Dados inválidos para criar usuário", 400);
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                email: newUser.email,
                deletedAt: null
            }
        });

        if (existingUser) {
            throw new AppError("E-mail já cadastrado", 400);
        }


        const createdUser = await prisma.user.create({
            data: newUser.dataToPrisma()
        });

        return UserModel.prismaToModel(createdUser);
    }

    async listUsers(): Promise<UserModel[]> {
        const users = await prisma.user.findMany({
            where: {
                deletedAt: null
            }
        });
        return users.map(user => UserModel.prismaToModel(user));
    }

    async listUsersPaginated(query: PaginationQuery): Promise<PaginationResponse<UserModel>> {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        // Construir filtros
        const where: any = {
            deletedAt: null // Sempre filtrar usuários não deletados
        };
        
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { email: { contains: query.search, mode: 'insensitive' } }
            ];
        }
        
        if (query.role) {
            where.role = query.role;
        }

        // Buscar usuários com paginação
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.count({ where })
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: users.map(user => UserModel.prismaToModel(user)),
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

    async findById(id: number): Promise<UserModel | null> {

        const user = await prisma.user.findFirst({
            where: {
                id: id,
                deletedAt: null
            }
        });

        if (!user) {
            return null;
        }

        return UserModel.prismaToModel(user);
    }

    async alterUser(id: number, user: UserUpdateDTO): Promise<UserModel> {

        // Verificar se o usuário existe
        const existingUser = await this.findById(id);
        if (!existingUser) {
            throw new AppError("Usuário não encontrado", 404);
        }

        // Verificar se o email já está sendo usado por outro usuário
        if (user.email && user.email !== existingUser.email) {
            const emailFound = await prisma.user.findFirst({
                where: {
                    email: user.email,
                    deletedAt: null
                }
            });

            if (emailFound) {
                throw new AppError("E-mail já cadastrado", 400);
            }
        }

        // Preparar dados para atualização
        const updateData: any = {};

        // Só incluir campos que foram fornecidos
        if (user.name !== undefined) {
            updateData.name = user.name;
        }
        
        if (user.email !== undefined) {
            updateData.email = user.email;
        }
        
        if (user.role !== undefined) {
            updateData.role = user.role;
        }
        
        if (user.password) {
            updateData.password = user.password;
        }
        
        if (user.isActive !== undefined) {
            updateData.isActive = user.isActive;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: updateData
        });

        return UserModel.prismaToModel(updatedUser);
    }

    async deleteUser(id: number): Promise<void> {

        const existingUser = await this.findById(id);

        if (!existingUser) {
            throw new AppError("Usuário não encontrado", 404);
        }

        // Soft delete - apenas marca como deletado
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                deletedAt: new Date()
            }
        });
    }

    async restoreUser(id: number): Promise<UserModel> {
        const user = await prisma.user.findFirst({
            where: {
                id: id,
                deletedAt: { not: null }
            }
        });

        if (!user) {
            throw new AppError("Usuário não encontrado ou não está deletado", 404);
        }

        const restoredUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                deletedAt: null
            }
        });

        return UserModel.prismaToModel(restoredUser);
    }

    async findDeletedUsers(): Promise<UserModel[]> {
        const users = await prisma.user.findMany({
            where: {
                deletedAt: { not: null }
            },
            orderBy: { deletedAt: 'desc' }
        });
        
        return users.map(user => UserModel.prismaToModel(user));
    }


}