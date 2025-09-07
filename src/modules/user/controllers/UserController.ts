import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { UserUpdateDTO } from "../dtos/UserRequestDTO";
import { PaginationQuery } from "../../../shared/dtos/PaginationDTO";



export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const data = req.body;
            const user = await this.userService.createUser(data);
            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async listUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const query: PaginationQuery = {
                page: req.query.page ? Number(req.query.page) : undefined,
                limit: req.query.limit ? Number(req.query.limit) : undefined,
                search: req.query.search as string,
                role: req.query.role as 'admin' | 'user'
            };

            const result = await this.userService.listUsersPaginated(query);
            
            if (result.data.length === 0) {
                return res.status(200).json({ 
                    mensagem: "Nenhum usuário cadastrado",
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
            const user = await this.userService.findById(Number(id));
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const data: UserUpdateDTO = req.body;
            const user = await this.userService.updateUser(Number(id), data);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(Number(id));
            return res.status(200).json({ message: "Usuário deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }

    async restoreUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const user = await this.userService.restoreUser(Number(id));
            return res.status(200).json({ 
                message: "Usuário restaurado com sucesso",
                user: user
            });
        } catch (error) {
            next(error);
        }
    }

    async findDeletedUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const users = await this.userService.findDeletedUsers();
            
            if (users.length === 0) {
                return res.status(200).json({ 
                    mensagem: "Nenhum usuário deletado encontrado",
                    data: []
                });
            }
            
            return res.status(200).json({ 
                mensagem: "Usuários deletados encontrados",
                data: users
            });
        } catch (error) {
            next(error);
        }
    }

    async toggleUserStatus(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const user = await this.userService.toggleUserStatus(Number(id));
            return res.status(200).json({ 
                message: `Usuário ${user.isActive ? 'ativado' : 'desativado'} com sucesso`,
                user: user
            });
        } catch (error) {
            next(error);
        }
    }


}