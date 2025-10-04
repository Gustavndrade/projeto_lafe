export interface CourseRequestDTO {
    name: string;
    description: string;
    isActive?: boolean
}

export interface CourseUpdateDTO {
    name?: string;
    description?: string;
    isActive?: boolean
}