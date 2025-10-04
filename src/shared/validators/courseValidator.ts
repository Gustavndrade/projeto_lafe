// Validações simples e diretas para usuários
import { validateEmailFormat } from '../utils/emailValidator';

export function validateCreateUser(data: any): string[] {
    const errors: string[] = [];
    
    // Validar nome
    if (!data.name) {
        errors.push('Nome é obrigatório');
    } else if (typeof data.name !== 'string') {
        errors.push('Nome deve ser um texto');
    } else if (data.name.length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    } else if (data.name.length > 100) {
        errors.push('Nome deve ter no máximo 100 caracteres');
    }
    
    // Validar email
    const emailErrors = validateEmailFormat(data.email);
    errors.push(...emailErrors);
    
    // Validar senha
    if (!data.password) {
        errors.push('Senha é obrigatória');
    } else if (typeof data.password !== 'string') {
        errors.push('Senha deve ser um texto');
    } else if (data.password.length < 6) {
        errors.push('Senha deve ter pelo menos 6 caracteres');
    } else if (data.password.length > 50) {
        errors.push('Senha deve ter no máximo 50 caracteres');
    }
    
    // Validar role
    if (data.role && !['admin', 'user'].includes(data.role)) {
        errors.push('Role deve ser "admin" ou "user"');
    }
    
    // Validar isActive (se fornecido)
    if (data.isActive !== undefined && typeof data.isActive !== 'boolean') {
        errors.push('isActive deve ser um valor booleano (true/false)');
    }
    
    return errors;
}

export function validateUpdateUser(data: any): string[] {
    const errors: string[] = [];
    
    // Verificar se pelo menos um campo foi fornecido
    const hasFields = data.name || data.email || data.password || data.role || data.isActive !== undefined;
    if (!hasFields) {
        errors.push('Pelo menos um campo deve ser fornecido para atualização');
        return errors;
    }
    
    // Validar nome (se fornecido)
    if (data.name !== undefined) {
        if (typeof data.name !== 'string') {
            errors.push('Nome deve ser um texto');
        } else if (data.name.length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        } else if (data.name.length > 100) {
            errors.push('Nome deve ter no máximo 100 caracteres');
        }
    }
    
    // Validar email (se fornecido)
    if (data.email !== undefined) {
        const emailErrors = validateEmailFormat(data.email);
        errors.push(...emailErrors);
    }
    
    // Validar senha (se fornecida)
    if (data.password !== undefined) {
        if (typeof data.password !== 'string') {
            errors.push('Senha deve ser um texto');
        } else if (data.password.length < 6) {
            errors.push('Senha deve ter pelo menos 6 caracteres');
        } else if (data.password.length > 50) {
            errors.push('Senha deve ter no máximo 50 caracteres');
        }
    }
    
    // Validar role (se fornecido)
    if (data.role !== undefined && !['admin', 'user'].includes(data.role)) {
        errors.push('Role deve ser "admin" ou "user"');
    }
    
    // Validar isActive (se fornecido)
    if (data.isActive !== undefined && typeof data.isActive !== 'boolean') {
        errors.push('isActive deve ser um valor booleano (true/false)');
    }
    
    return errors;
}

export function validateUserId(params: any): string[] {
    const errors: string[] = [];
    
    if (!params.id) {
        errors.push('ID é obrigatório');
    } else if (isNaN(Number(params.id))) {
        errors.push('ID deve ser um número');
    } else if (Number(params.id) <= 0) {
        errors.push('ID deve ser um número positivo');
    }
    
    return errors;
}
