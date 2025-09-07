// Validação robusta de email

export function isValidEmail(email: string): boolean {
    // Regex mais robusta para validação de email
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Verificações básicas
    if (!email || typeof email !== 'string') {
        return false;
    }
    
    // Verificar se tem @
    if (!email.includes('@')) {
        return false;
    }
    
    // Verificar se tem pelo menos um ponto após o @
    const parts = email.split('@');
    if (parts.length !== 2) {
        return false;
    }
    
    const [localPart, domainPart] = parts;
    
    // Verificar parte local (antes do @)
    if (!localPart || localPart.length === 0 || localPart.length > 64) {
        return false;
    }
    
    // Verificar domínio (após o @)
    if (!domainPart || domainPart.length === 0 || domainPart.length > 255) {
        return false;
    }
    
    // Verificar se o domínio tem pelo menos um ponto
    if (!domainPart.includes('.')) {
        return false;
    }
    
    // Verificar se não começa ou termina com ponto
    if (localPart.startsWith('.') || localPart.endsWith('.')) {
        return false;
    }
    
    if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
        return false;
    }
    
    // Verificar se não tem pontos consecutivos
    if (localPart.includes('..') || domainPart.includes('..')) {
        return false;
    }
    
    // Aplicar regex
    return emailRegex.test(email);
}

export function validateEmailFormat(email: string): string[] {
    const errors: string[] = [];
    
    if (!email) {
        errors.push('Email é obrigatório');
        return errors;
    }
    
    if (typeof email !== 'string') {
        errors.push('Email deve ser um texto');
        return errors;
    }
    
    if (email.length > 255) {
        errors.push('Email deve ter no máximo 255 caracteres');
        return errors;
    }
    
    if (!isValidEmail(email)) {
        errors.push('Email deve ter um formato válido (exemplo: usuario@dominio.com)');
        return errors;
    }
    
    return errors;
}
