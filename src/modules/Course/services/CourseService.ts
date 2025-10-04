import { AppError } from "../../../shared/errors/AppError";
import { CourseRequestDTO, CourseUpdateDTO } from "../dtos/CourseRequestDTO";
import { CourseResponseDTO } from "../dtos/CourseResponseDTO";
import { CourseRepository } from "../repositories/CourseRepository";
import { PaginationQuery, PaginationResponse } from "../../../shared/dtos/PaginationDTO";

export class CourseService {
    private courseRepository: CourseRepository;

    constructor() {
        this.courseRepository = new CourseRepository();
    }

    async createCourse(course: CourseRequestDTO): Promise<CourseResponseDTO> {
        const createdCourse = await this.courseRepository.createCourse(course);
        return createdCourse.toResponse();
    }

    async listCourses(): Promise<CourseResponseDTO[]> {
        const courses = await this.courseRepository.listCourse();
        
        if (!courses || courses.length === 0) {
            return [];
        }
        
        return courses.map(course => course.toResponse());
    }

    async listCoursesPaginated(query: PaginationQuery): Promise<PaginationResponse<CourseResponseDTO>> {
        const result = await this.courseRepository.listCoursesPaginated(query);
        
        return {
            data: result.data.map(course => course.toResponse()),
            pagination: result.pagination
        };
    }

    async findById(id: number): Promise<CourseResponseDTO> {
        const course = await this.courseRepository.findById(id);
        if (!course) {
            throw new AppError("Curso não encontrado", 404);
        }
        return course.toResponse();
    }

    async updateCourse(id: number, course: CourseUpdateDTO): Promise<CourseResponseDTO> {
        const existingCourse = await this.courseRepository.findById(id);
        if (!existingCourse) {
            throw new AppError("Curso não encontrado", 404);
        }

        const updatedCourse = await this.courseRepository.alterCourse(id, course);
        return updatedCourse.toResponse();
    }

    async deleteCourse(id: number): Promise<void> {
        await this.courseRepository.deleteCourse(id);
    }

    async restoreCourse(id: number): Promise<CourseResponseDTO> {
        const course = await this.courseRepository.restoreCourse(id);
        return course.toResponse();
    }

    async findDeletedCourses(): Promise<CourseResponseDTO[]> {
        const courses = await this.courseRepository.findDeletedCourses();
        return courses.map(course => course.toResponse());
    }

    async toggleCourseStatus(id: number): Promise<CourseResponseDTO> {
        const existingCourse = await this.courseRepository.findById(id);
        if (!existingCourse) {
            throw new AppError("Curso não encontrado", 404);
        }

        const updatedCourse = await this.courseRepository.alterCourse(id, {
            isActive: !existingCourse.isActive
        });

        return updatedCourse.toResponse();
    }
}
