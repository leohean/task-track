import { User } from "./user.interface";

export interface Project {
  id?: number;
  name: string;
  description: string;
  createdBy?: User;
  createdAt?: Date;
  lastUpdateAt?: Date;
  lastUpdateBy?: User;
} 