export interface PlayerTeamCreateDTO {
    playerId: number;
    teamId: number;
    isActive?: boolean;
    joinedAt?: Date;
    leftAt?: Date;
}

export interface PlayerTeamUpdateDTO {
    isActive?: boolean;
    leftAt?: Date;
}