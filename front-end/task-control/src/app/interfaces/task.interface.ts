import { TaskStatus } from "../enums/task-status.enum";
import { BasicUser } from "./basic-user";

export interface Task {
    id: number;
    title: string;
    description: string;
    taskOrder: number;
    estimatedTime: number;
    spentTime: number;
    status: TaskStatus;
    responsibleUser: BasicUser;
}

