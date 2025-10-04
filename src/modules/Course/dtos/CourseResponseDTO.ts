export interface CourseResponseDTO{
    id: number; 
    name: String;
    description: String;
    isActive: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
}