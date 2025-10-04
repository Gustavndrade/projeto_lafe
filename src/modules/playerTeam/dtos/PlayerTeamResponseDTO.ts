export interface PlayerTeamResponseDTO {
    id: number;
    playerId: number;
    teamId: number;
    isActive: boolean;
    joinedAt: Date;
    leftAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}