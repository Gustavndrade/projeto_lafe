import { PlayerTeamRepository } from "../repositories/PlayerTeamRepository";
import { PlayerTeamCreateDTO, PlayerTeamUpdateDTO } from "../dtos/PlayerTeamRequestDTO";
import { PlayerTeamModel } from "../models/PlayerTeamModel";
import { PaginationQuery } from "../../../shared/dtos/PaginationDTO";

export class PlayerTeamService {
    private repository: PlayerTeamRepository;

    constructor() {
        this.repository = new PlayerTeamRepository();
    }

    async createPlayerTeam(data: PlayerTeamCreateDTO) {
        const created = await this.repository.create(data);
        return PlayerTeamModel.toDTO(created);
    }

    async listPlayerTeamPaginated(query: PaginationQuery) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const data = await this.repository.findAll(skip, limit, query.search);
        const total = data.length; // Para simplificar, pode usar count no futuro
        return {
            data: data.map(PlayerTeamModel.toDTO),
            pagination: { page, limit, total },
        };
    }

    async findById(id: number) {
        const found = await this.repository.findById(id);
        return found ? PlayerTeamModel.toDTO(found) : null;
    }

    async updatePlayerTeam(id: number, data: PlayerTeamUpdateDTO) {
        const updated = await this.repository.update(id, data);
        return PlayerTeamModel.toDTO(updated);
    }

    async deletePlayerTeam(id: number) {
        return this.repository.delete(id);
    }

    async restorePlayerTeam(id: number) {
        const restored = await this.repository.restore(id);
        return PlayerTeamModel.toDTO(restored);
    }

    async findDeletedPlayerTeams() {
        const deleted = await this.repository.findDeleted();
        return deleted.map(PlayerTeamModel.toDTO);
    }

    async togglePlayerTeamStatus(id: number) {
        const toggled = await this.repository.toggleStatus(id);
        return PlayerTeamModel.toDTO(toggled);
    }
}