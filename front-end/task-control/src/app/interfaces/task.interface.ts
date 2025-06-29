import { TaskStatus } from "../enums/task-status.enum";
import { BasicUser } from "./basic-user";
import { User } from "./user.interface";

export interface Task {
    id: number;
    title: string;
    description: string;
    taskOrder: number;
    estimatedTime: number;
    spentTime: number;
    status: TaskStatus;
    responsible: User;
}

