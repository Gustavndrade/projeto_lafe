// Validação simples para parâmetros de paginação

export function validatePaginationQuery(query: any): string[] {
    const errors: string[] = [];
    
    // Validar page
    if (query.page !== undefined) {
        if (isNaN(Number(query.page))) {
            errors.push('Página deve ser um número');
        } else if (Number(query.page) < 1) {
            errors.push('Página deve ser maior que 0');
        }
    }
    
    // Validar limit
    if (query.limit !== undefined) {
        if (isNaN(Number(query.limit))) {
            errors.push('Limite deve ser um número');
        } else if (Number(query.limit) < 1) {
            errors.push('Limite deve ser maior que 0');
        } else if (Number(query.limit) > 100) {
            errors.push('Limite deve ser no máximo 100');
        }
    }
    
    // Validar search
    if (query.search !== undefined && typeof query.search !== 'string') {
        errors.push('Busca deve ser um texto');
    }
    
    // Validar role
    if (query.role !== undefined && !['admin', 'user'].includes(query.role)) {
        errors.push('Role deve ser "admin" ou "user"');
    }
    
    return errors;
}
