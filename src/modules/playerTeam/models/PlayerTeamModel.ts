import { PlayerTeamResponseDTO } from "../dtos/PlayerTeamResponseDTO";

export class PlayerTeamModel {
    static toDTO(data: any): PlayerTeamResponseDTO {
        return {
            id: data.id,
            playerId: data.playerId,
            teamId: data.teamId,
            isActive: data.isActive,
            joinedAt: data.joinedAt,
            leftAt: data.leftAt,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
}