import { Request, Response, NextFunction } from "express";
import { CourseService } from "../services/CourseService";
import { CourseUpdateDTO } from "../dtos/CourseRequestDTO";
import { PaginationQuery } from "../../../shared/dtos/PaginationDTO";

export class CourseController {
    private courseService: CourseService;

    constructor() {
        this.courseService = new CourseService();
    }

    async createCourse(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const data = req.body;
            const course = await this.courseService.createCourse(data);

            return res.status(201).json(course);
        } catch (error) {
            next(error);
        }
    }

    async listCourses(req: Request, res: Response, next: NextFunction): Promise<any>{
        try{
            const query: PaginationQuery = {
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
            search: req.query.search as string,
            };

            const result = await this.courseService.listCoursesPaginated(query);

            if (result.data.length === 0) {
                return res.status(404).json({ 
                    mensagem: "Curso inexistente",
                    pagination: result.pagination
                });
            }
            return res.status(404).json(result);
        }   catch(error){
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const course = await this.courseService.findById(Number(id));
            return res.status(200).json(course);
        } catch (error) {
            next(error);
        }
    }

        async updateCourse(req: Request, res: Response, next: NextFunction): Promise<any> {
            try {
                const { id } = req.params;
                const data: CourseUpdateDTO = req.body;
                const course = await this.courseService.updateCourse(Number(id), data);
                return res.status(200).json(course);
            } catch (error) {
                next(error);
            }
        }

        async deleteCourse(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            await this.courseService.deleteCourse(Number(id));
            return res.status(200).json({ message: "Curso deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }

        async restoreCourse(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const course = await this.courseService.restoreCourse(Number(id));
            return res.status(200).json({ 
                message: "Curso restaurado com sucesso",
                course: course
            });
        } catch (error) {
            next(error);
        }
    }

    async findDeletedCourse(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const courses = await this.courseService.findDeletedCourses();
            
            if (courses.length === 0) {
                return res.status(200).json({ 
                    mensagem: "Nenhum curso deletado encontrado",
                    data: []
                });
            }
            
            return res.status(200).json({ 
                mensagem: "Cursos deletados encontrados",
                course: courses
            });
        } catch (error) {
            next(error);
        }
    }

    async toggleCourseStatus(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id } = req.params;
            const course = await this.courseService.toggleCourseStatus(Number(id));
            return res.status(200).json({ 
                message: `Curso ${course.isActive ? 'ativado' : 'desativado'} com sucesso`,
                course: course
            });
        } catch (error) {
            next(error);
        }
    }

}