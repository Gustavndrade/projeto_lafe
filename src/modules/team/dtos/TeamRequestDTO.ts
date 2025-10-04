export interface TeamRequestDTO {
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'suspended';
    id_course: number;
}

export interface TeamUpdateDTO {
    id?: number;
    name?: string;
    description?: string;
    status?: 'active' | 'inactive' | 'suspended';
    id_course?: number;
}