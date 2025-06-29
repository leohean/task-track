import { Task } from "./task.interface";

export interface UserStory {
    id?: number;
    title: string;
    description: string;
    storyOrder: number;
    sprintId: number;
    createdAt?: Date;
    createdBy?: string;
    lastUpdateAt?: Date;
    lastUpdateBy?: string;
    tasks: Task[];
}
