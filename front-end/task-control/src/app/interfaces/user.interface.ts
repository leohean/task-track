import { Role } from "../enums/role.enum";

export interface User {
    accountNonExpired: boolean,
    accountNonLocked: boolean,
    credentialsNonExpired: boolean,
    email: string,
    enabled: boolean,
    id: number,
    name: string,
    role: Role,
    username: string
}