import { Request, Response, NextFunction } from "express";
import { TeamService } from "../services/TeamService";
import { TeamUpdateDTO } from "../dtos/TeamRequestDTO";
import { PaginationQuery } from "../../../shared/dtos/PaginationDTO";

export class TeamController {
    private teamService: TeamService;

    constructor() {
        this.teamService = new TeamService();
    }

    async createTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const data = req.body;
            const team = await this.teamService.createTeam(data);

            return res.status(201).json(team);
        } catch (error) {
            next(error);
        }
    }

    async listTeam(req: Request, res: Response, next: NextFunction): Promise<any>{
        try{
            const query: PaginationQuery = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            search: req.query.search as string,
            };

            const result = await this.teamService.listTeamsPaginated(query);

            if (result.data.length === 0) {
                return res.status(404).json({ 
                    mensagem: "Time inexistente",
                    pagination: result.pagination
                });
            }
            return res.status(404).json(result);
        }   catch(error){
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const team = await this.teamService.findById(Number(id));
            return res.status(200).json(team);
        } catch (error) {
            next(error);
        }
    }

        async updateTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
            try {
                const { id } = req.params;
                const data: TeamUpdateDTO = req.body;
                const team = await this.teamService.updateTeam(Number(id), data);
                return res.status(200).json(team);
            } catch (error) {
                next(error);
            }
        }

        async deleteTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            await this.teamService.deleteTeam(Number(id));
            return res.status(200).json({ message: "Time deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }

        async restoreTeam(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const team = await this.teamService.restoreTeam(Number(id));
            return res.status(200).json({ 
                message: "Time restaurado com sucesso",
                time: team
            });
        } catch (error) {
            next(error);
        }
    }

    async findDeletedTeams(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const team = await this.teamService.findDeletedTeams();
            
            if (team.length === 0) {
                return res.status(200).json({ 
                    mensagem: "Nenhum time deletado encontrado",
                    data: []
                });
            }
            
            return res.status(200).json({ 
                mensagem: "Times deletados encontrados",
                team: team
            });
        } catch (error) {
            next(error);
        }
    }

}