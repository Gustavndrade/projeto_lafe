import { UserRequestDTO } from '../dtos/UserRequestDTO';
import { UserResponseDTO } from '../dtos/UserResponseDTO';


export class UserModel {
   
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public role: 'admin' | 'user',
        public isActive: boolean = true,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public deletedAt: Date | null = null
    ) {}

    
    //costrutor vazio
    static vazio(): UserModel {
        return new UserModel(0, '', '', '', 'user', true);
    }


    static dtos(sto:UserRequestDTO): UserModel {
        return new UserModel(0,
                            sto.name,
                            sto.email,
                            sto.password,
                            sto.role,
                            true);
    }

    static prismaToModel(data: any):UserModel{
        return new UserModel(
            data.id,
            data.name,
            data.email,
            data.password,
            data.role,
            data.isActive,
            data.createdAt,
            data.updatedAt,
            data.deletedAt
        );
    }

    dataToPrisma(){
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            isActive: this.isActive
        };
    }

    toResponse(): UserResponseDTO {
        return {
            id: this.id,
            name: this.name,
            email: this.email,      
            role: this.role,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
    
    
    
    







   
}


