export interface UserResponseDTO {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}