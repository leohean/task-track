import { Role } from "../enums/role.enum"

export interface ProjectUser {
    email: string,
    id: number,
    name: string,
    role: Role
}