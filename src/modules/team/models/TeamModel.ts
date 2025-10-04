import { TeamRequestDTO } from '../dtos/TeamRequestDTO';
import { TeamResponseDTO } from '../dtos/TeamResponseDTO';


export class TeamModel {
   
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public status: 'active' | 'inactive' | 'suspended',
        public id_course: number,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public deletedAt: Date | null = null
    ) {}

    static vazio(): TeamModel {
        return new TeamModel(0, '', '', 'active', 0);
    }


    static dtos(sto:TeamRequestDTO): TeamModel {
        return new TeamModel(
                            0,
                            sto.name,
                            sto.description,
                            sto.status,
                            0
                            );
    }

    static prismaToModel(data: any):TeamModel{
        return new TeamModel(
            data.id,
            data.name,
            data.description,
            data.status,
            data.course,
            data.createdAt,
            data.updatedAt,
            data.deletedAt
        );
    }

    dataToPrisma(){
        return {
            name: this.name,
            description: this.description,
            status: this.status,
            course: this.id_course
        };
    }

    toResponse(): TeamResponseDTO {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            status: this.status,
            course: this.id_course,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    
    }
    
}