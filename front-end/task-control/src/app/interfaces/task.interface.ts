import { TaskStatus } from "../enums/task-status.enum";
import { BasicUser } from "./basic-user";

export interface Task {
    id: number;
    name: string;
    description: string;
    order: number;
    estimatedTime: number;
    spentTime: number;
    status: TaskStatus;
    responsibleUser: BasicUser;
}

