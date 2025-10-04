import { PrismaClient } from "@prisma/client";
import { CourseModel } from "../models/CourseModel";
import { CourseRequestDTO, CourseUpdateDTO } from "../dtos/CourseRequestDTO";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationQuery, PaginationResponse } from "../../../shared/dtos/PaginationDTO";


const prisma = new PrismaClient();

export class CourseRepository {

    async createCourse(course: CourseRequestDTO): Promise<CourseModel> {

        const newCourse = CourseModel.dtos(course);

        if (!newCourse) {
            throw new AppError("Dados inválidos para criar Curso", 400);
        }

        const existingCourse = await prisma.course.findFirst({
            where: {
                name: newCourse.name,
                deletedAt: null
            }
        });

        if (existingCourse
        ) {
            throw new AppError("Curso já cadastrado", 400);
        }

        const createdCourse = await prisma.course.create({
            data: newCourse.dataToPrisma()
        });

        return CourseModel.prismaToModel(createdCourse);
    }

    async listCourse(): Promise<CourseModel[]> {
        const courses = await prisma.course.findMany({
            where: {
                deletedAt: null
            }
        });
        return courses.map(course => CourseModel.prismaToModel(course));
    }

    async listCoursesPaginated(query: PaginationQuery): Promise<PaginationResponse<CourseModel>> {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        const where: any = {
            deletedAt: null 
        };
        
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } }
            ];
        }

        const [courses, total] = await Promise.all([
            prisma.course.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.course.count({ where })
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: courses.map(course => CourseModel.prismaToModel(course)),
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        };
    }

    async findById(id: number): Promise<CourseModel | null> {

        const course = await prisma.course.findFirst({
            where: {
                id: id,
                deletedAt: null
            }
        });

        if (!course) {
            return null;
        }

        return CourseModel.prismaToModel(course);
    }

    async alterCourse(id: number, course: CourseUpdateDTO): Promise<CourseModel> {

        const existingCourse = await this.findById(id);
        if (!existingCourse) {
            throw new AppError("Curso não encontrado", 404);
        }

        if (course.name && course.name !== existingCourse.name){
            const nameFound = await prisma.course.findFirst({
                where: {
                        name: course.name,
                        deletedAt: null
                       }
                    });
        
         if (nameFound) {
            throw new AppError("Curso já cadastrado", 400);
            }
        }

        const updateData: any = {};

        if (course.name !== undefined) {
            updateData.name = course.name;
        }
        
        if (course.isActive !== undefined) {
            updateData.isActive = course.isActive;
        }

        const updatedCourse = await prisma.course.update({
            where: {
                id: id
            },
            data: updateData
        });

        return CourseModel.prismaToModel(updatedCourse);
    }

    async deleteCourse(id: number): Promise<void> {

        const existingCourse = await this.findById(id);

        if (!existingCourse) {
            throw new AppError("Curso não encontrado", 404);
        }

        await prisma.course.update({
            where: {
                id: id
            },
            data: {
                deletedAt: new Date()
            }
        });
    }

    async restoreCourse(id: number): Promise<CourseModel> {
        const course = await prisma.course.findFirst({
            where: {
                id: id,
                deletedAt: { not: null }
            }
        });

        if (!course) {
            throw new AppError("Curso não encontrado ou não está deletado", 404);
        }

        const restoredCourse = await prisma.course.update({
            where: {
                id: id
            },
            data: {
                deletedAt: null
            }
        });

        return CourseModel.prismaToModel(restoredCourse);
    }

    async findDeletedCourses(): Promise<CourseModel[]> {
        const Courses = await prisma.course.findMany({
            where: {
                deletedAt: { not: null }
            },
            orderBy: { deletedAt: 'desc' }
        });
        
        return Courses.map(course => CourseModel.prismaToModel(course));
    }


}