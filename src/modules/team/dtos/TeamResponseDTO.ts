export interface TeamResponseDTO {
    id: number;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'suspended';
    course: number;
    createdAt?: Date;
    updatedAt?: Date;
}