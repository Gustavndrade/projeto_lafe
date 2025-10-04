import { PrismaClient } from "@prisma/client";
import { PlayerTeamCreateDTO, PlayerTeamUpdateDTO } from "../dtos/PlayerTeamRequestDTO";

const prisma = new PrismaClient();

export class PlayerTeamRepository {
    async create(data: PlayerTeamCreateDTO) {
        return prisma.playerTeam.create({ data });
    }

    async findById(id: number) {
        return prisma.playerTeam.findUnique({ where: { id } });
    }

    async findAll(skip = 0, take = 10, search?: string) {
        return prisma.playerTeam.findMany({
            skip,
            take,
            where: search
                ? {
                      OR: [
                          { player: { name: { contains: search, mode: "insensitive" } } },
                          { team: { name: { contains: search, mode: "insensitive" } } },
                      ],
                  }
                : {},
            include: { player: true, team: true },
        });
    }

    async update(id: number, data: PlayerTeamUpdateDTO) {
        return prisma.playerTeam.update({ where: { id }, data });
    }

    async delete(id: number) {
        return prisma.playerTeam.delete({ where: { id } });
    }

    async findDeleted() {
        // PlayerTeam não tem deletedAt, mas pode usar isActive = false ou leftAt preenchido
        return prisma.playerTeam.findMany({
            where: {
                isActive: false,
            },
        });
    }

    async restore(id: number) {
        return prisma.playerTeam.update({
            where: { id },
            data: { isActive: true, leftAt: null },
        });
    }

    async toggleStatus(id: number) {
        const current = await prisma.playerTeam.findUnique({ where: { id } });
        if (!current) return null;
        return prisma.playerTeam.update({
            where: { id },
            data: { isActive: !current.isActive },
        });
    }
}