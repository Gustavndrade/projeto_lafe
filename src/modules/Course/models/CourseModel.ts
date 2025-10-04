import { CourseRequestDTO } from '../dtos/CourseRequestDTO';
import { CourseResponseDTO } from '../dtos/CourseResponseDTO';


export class CourseModel {
   
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public isActive: boolean = true,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public deletedAt: Date | null = null
    ) {}

    static vazio(): CourseModel {
        return new CourseModel(0, '', '', true);
    }


    static dtos(sto:CourseRequestDTO): CourseModel {
        return new CourseModel(
                            0,
                            sto.name,
                            sto.description,
                            true);
    }

    static prismaToModel(data: any):CourseModel{
        return new CourseModel(
            data.id,
            data.name,
            data.description,
            data.isActive,
            data.createdAt,
            data.updatedAt,
            data.deletedAt
        );
    }

    dataToPrisma(){
        return {
            name: this.name,
            description: this.description,
            isActive: this.isActive
        };
    }

    toResponse(): CourseResponseDTO {
        return {
            id: this.id,
            name: this.name,
            description: this.description,      
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }  


    
}