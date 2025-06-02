import { Task } from "./task.interface";

export interface UserStory {
    id: number;
    name: string;
    description: string;
    order: number;
    sprintId: number;
    tasks: Task[];
}
