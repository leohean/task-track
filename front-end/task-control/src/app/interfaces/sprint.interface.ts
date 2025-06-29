import { User } from "./user.interface";

export interface Sprint {
    id?: number;
    name: string;
    description: string;
    createdBy?: User;
    createdAt?: Date;
    lastUpdatedAt?: Date;
    lastUpdatedBy?: User;
    projectId: number;
} 