export interface Sprint {
    id?: number;
    name: string;
    description: string;
    createdBy?: string;
    createdAt?: Date;
    lastUpdatedAt?: Date;
    lastUpdatedBy?: string;
    projectId: number;
} 