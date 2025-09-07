export interface UserRequestDTO {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    isActive?: boolean;
}

export interface UserUpdateDTO {
    name?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user';
    isActive?: boolean;
}