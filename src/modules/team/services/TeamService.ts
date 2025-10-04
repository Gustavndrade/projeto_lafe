import { AppError } from "../../../shared/errors/AppError";
import { hashPassword } from "../../../shared/utils/Hash";
import { TeamRequestDTO, TeamUpdateDTO } from "../dtos/TeamRequestDTO";
import { TeamResponseDTO } from "../dtos/TeamResponseDTO";
import { TeamModel } from "../models/TeamModel";
import { TeamRepository } from "../repositories/TeamRepository";
import { PaginationQuery, PaginationResponse } from "../../../shared/dtos/PaginationDTO";



export class TeamService {

    private teamRepository: TeamRepository;

    constructor() {
        this.teamRepository = new TeamRepository();
    }

    async createTeam(team: TeamRequestDTO): Promise<TeamResponseDTO> {
    const teamResponse = await this.teamRepository.createTeam(team);

    return teamResponse.toResponse();
    }

    async listTeams(): Promise<TeamResponseDTO[]> {
        const teams = await this.teamRepository.listTeams();
        
        if (!teams || teams.length === 0) {
            return [];
        }
        
        return teams.map(team => team.toResponse());
    }

    async listTeamsPaginated(query: PaginationQuery): Promise<PaginationResponse<TeamResponseDTO>> {
        const result = await this.teamRepository.listTeamsPaginated(query);
        
        return {
            data: result.data.map(team => team.toResponse()),
            pagination: result.pagination
        };
    }

    async findById(id: number): Promise<TeamResponseDTO> {
        const team = await this.teamRepository.findById(id);
        if (!team) {
            throw new AppError("Time não encontrado", 404);
        }
        return team.toResponse();
    }

    async updateTeam(id: number, team: TeamUpdateDTO): Promise<TeamResponseDTO> {
        const existingTeam = await this.teamRepository.findById(id);
        if (!existingTeam) {
            throw new AppError("Time não encontrado", 404);
        }

        const teamResponse = await this.teamRepository.alterTeam(id, team);
        return teamResponse.toResponse();
    }

    async deleteTeam(id: number): Promise<void> {
        await this.teamRepository.deleteTeam(id);
    }

    async restoreTeam(id: number): Promise<TeamResponseDTO> {
        const team = await this.teamRepository.restoreTeam(id);
        return team.toResponse();
    }

    async findDeletedTeams(): Promise<TeamResponseDTO[]> {
        const teams = await this.teamRepository.findDeletedTeams();
        return teams.map(team => team.toResponse());
    }

}