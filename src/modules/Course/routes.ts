import { Router, Request, Response, NextFunction } from "express";
import { CourseController } from "./controllers/CourseController";
import { validateData, validateParams, validateQuery } from "../../shared/middlewares/validation";
import { validateCreateCourse, validateUpdateCourse, validateCourseId } from "../../shared/validators/courseValidator";
import { validatePaginationQuery } from "../../shared/validators/paginationValidator";

export function userRoutes() {

    const router = Router();

    const userController = new UserController();

    // POST /users - Criar usuário
    router.post("/", 
        validateData(validateCreateUser),
        (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res, next)
    );

    // GET /users - Listar usuários (com paginação)
    router.get("/", 
        validateQuery(validatePaginationQuery),
        (req: Request, res: Response, next: NextFunction) => userController.listUsers(req, res, next)
    );

    // GET /users/:id - Buscar usuário por ID
    router.get("/:id", 
        validateParams(validateUserId),
        (req: Request, res: Response, next: NextFunction) => userController.findById(req, res, next)
    );

    // PUT /users/:id - Atualizar usuário
    router.put("/:id", 
        validateParams(validateUserId),
        validateData(validateUpdateUser),
        (req: Request, res: Response, next: NextFunction) => userController.updateUser(req, res, next)
    );

    // DELETE /users/:id - Deletar usuário (soft delete)
    router.delete("/:id", 
        validateParams(validateUserId),
        (req: Request, res: Response, next: NextFunction) => userController.deleteUser(req, res, next)
    );

    // POST /users/:id/restore - Restaurar usuário deletado
    router.post("/:id/restore", 
        validateParams(validateUserId),
        (req: Request, res: Response, next: NextFunction) => userController.restoreUser(req, res, next)
    );

    // GET /users/deleted - Listar usuários deletados
    router.get("/deleted", 
        (req: Request, res: Response, next: NextFunction) => userController.findDeletedUsers(req, res, next)
    );

    // PATCH /users/:id/toggle-status - Ativar/Desativar usuário
    router.patch("/:id/toggle-status", 
        validateParams(validateUserId),
        (req: Request, res: Response, next: NextFunction) => userController.toggleUserStatus(req, res, next)
    );

    return router;
}