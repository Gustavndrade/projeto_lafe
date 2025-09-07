import { AppError } from "../../../shared/errors/AppError";
import { hashPassword } from "../../../shared/utils/Hash";
import { UserRequestDTO, UserUpdateDTO } from "../dtos/UserRequestDTO";
import { UserResponseDTO } from "../dtos/UserResponseDTO";
import { UserModel } from "../models/UserModel";
import { UserRepository } from "../repositories/UserRepository";
import { PaginationQuery, PaginationResponse } from "../../../shared/dtos/PaginationDTO";



export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(user: UserRequestDTO): Promise<UserResponseDTO> {
        // Hash da senha
        user.password = await hashPassword(user.password);

        const userResponse = await this.userRepository.createUser(user);

        return userResponse.toResponse();
    }

    async listUsers(): Promise<UserResponseDTO[]> {
        const users = await this.userRepository.listUsers();
        
        if (!users || users.length === 0) {
            return [];
        }
        
        return users.map(user => user.toResponse());
    }

    async listUsersPaginated(query: PaginationQuery): Promise<PaginationResponse<UserResponseDTO>> {
        const result = await this.userRepository.listUsersPaginated(query);
        
        return {
            data: result.data.map(user => user.toResponse()),
            pagination: result.pagination
        };
    }

    async findById(id: number): Promise<UserResponseDTO> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }
        return user.toResponse();
    }

    async updateUser(id: number, user: UserUpdateDTO): Promise<UserResponseDTO> {
        // Verificar se o usuário existe
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new AppError("Usuário não encontrado", 404);
        }

        // Se a senha foi fornecida, hash ela
        if (user.password) {
            user.password = await hashPassword(user.password);
        } else {
            // Se não foi fornecida, manter a senha atual
            user.password = existingUser.password;
        }

        const userResponse = await this.userRepository.alterUser(id, user);
        return userResponse.toResponse();
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.deleteUser(id);
    }

    async restoreUser(id: number): Promise<UserResponseDTO> {
        const user = await this.userRepository.restoreUser(id);
        return user.toResponse();
    }

    async findDeletedUsers(): Promise<UserResponseDTO[]> {
        const users = await this.userRepository.findDeletedUsers();
        return users.map(user => user.toResponse());
    }

    async toggleUserStatus(id: number): Promise<UserResponseDTO> {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new AppError("Usuário não encontrado", 404);
        }

        const updatedUser = await this.userRepository.alterUser(id, {
            isActive: !existingUser.isActive
        });

        return updatedUser.toResponse();
    }



}