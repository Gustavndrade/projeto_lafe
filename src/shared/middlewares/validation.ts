import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

// Middleware simples para validação de dados
export function validateData(validator: (data: any) => string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = validator(req.body);
        
        if (errors.length > 0) {
            throw new AppError(`Dados inválidos: ${errors.join(', ')}`, 400);
        }
        
        next();
    };
}

// Middleware simples para validação de parâmetros
export function validateParams(validator: (data: any) => string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = validator(req.params);
        
        if (errors.length > 0) {
            throw new AppError(`Parâmetros inválidos: ${errors.join(', ')}`, 400);
        }
        
        next();
    };
}

// Middleware simples para validação de query parameters
export function validateQuery(validator: (data: any) => string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = validator(req.query);
        
        if (errors.length > 0) {
            throw new AppError(`Query parameters inválidos: ${errors.join(', ')}`, 400);
        }
        
        next();
    };
}
