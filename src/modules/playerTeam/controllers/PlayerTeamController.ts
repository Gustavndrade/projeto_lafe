import { Request, Response, NextFunction } from "express";
import { PlayerTeamService } from "../services/PlayerTeamService";
import { PlayerTeamUpdateDTO } from "../dtos/PlayerTeamRequestDTO";
import { PaginationQuery } from "../../../shared/dtos/PaginationDTO";

export class PlayerTeamController {
    private playerTeamService: PlayerTeamService;

    constructor() {
        this.playerTeamService = new PlayerTeamService();
    }

    async createPlayerTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const data = req.body;
            const playerTeam = await this.playerTeamService.createPlayerTeam(data);
            return res.status(201).json(playerTeam);
        } catch (error) {
            next(error);
        }
    }

    async listPlayerTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const query: PaginationQuery = {
                page: req.query.page ? Number(req.query.page) : undefined,
                limit: req.query.limit ? Number(req.query.limit) : undefined,
                search: req.query.search as string
            };

            const result = await this.playerTeamService.listPlayerTeamPaginated(query);

            if (result.data.length === 0) {
                return res.status(200).json({
                    mensagem: "Nenhum vínculo jogador/time encontrado",
                    pagination: result.pagination
                });
            }

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const playerTeam = await this.playerTeamService.findById(Number(id));
            if (!playerTeam) {
                return res.status(404).json({ mensagem: "Vínculo jogador/time não encontrado" });
            }
            return res.status(200).json(playerTeam);
        } catch (error) {
            next(error);
        }
    }

    async updatePlayerTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const data: PlayerTeamUpdateDTO = req.body;
            const playerTeam = await this.playerTeamService.updatePlayerTeam(Number(id), data);
            return res.status(200).json(playerTeam);
        } catch (error) {
            next(error);
        }
    }

    async deletePlayerTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            await this.playerTeamService.deletePlayerTeam(Number(id));
            return res.status(200).json({ message: "Vínculo jogador/time deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }

    async restorePlayerTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const playerTeam = await this.playerTeamService.restorePlayerTeam(Number(id));
            return res.status(200).json({
                message: "Vínculo jogador/time restaurado com sucesso",
                playerTeam: playerTeam
            });
        } catch (error) {
            next(error);
        }
    }

    async findDeletedPlayerTeams(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const playerTeams = await this.playerTeamService.findDeletedPlayerTeams();

            if (playerTeams.length === 0) {
                return res.status(200).json({
                    mensagem: "Nenhum vínculo jogador/time deletado encontrado",
                    data: []
                });
            }

            return res.status(200).json({
                mensagem: "Vínculos jogador/time deletados encontrados",
                data: playerTeams
            });
        } catch (error) {
            next(error);
        }
    }

    async togglePlayerTeamsStatus(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const playerTeam = await this.playerTeamService.togglePlayerTeamStatus(Number(id));
            return res.status(200).json({
                message: `Vínculo jogador/time ${playerTeam.isActive ? 'ativado' : 'desativado'} com sucesso`,
                playerTeam: playerTeam
            });
        } catch (error) {
            next(error);
        }
    }
}