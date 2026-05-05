import { Priority, TaskStatus } from "../constants/enums";
import { CreateTaskData, TaskShape } from "../types/task.types";
import { UserShape } from "../types/user.types";

export class Task implements TaskShape {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignee?: UserShape;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;

  constructor(data: CreateTaskData) {
    this.id = crypto.randomUUID();
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.priority = data.priority;
    this.assignee = data.assignee;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.dueDate = data.dueDate;
  }

  isOverdue(): boolean {
    return (this.dueDate ? new Date() > this.dueDate : false) && this.status !== TaskStatus.Done;
  }

  getSummary(): string {
    return `${this.title} - ${this.description}`;
  }

  assignToUser(user: UserShape): void {
    this.assignee = user;
    this.updatedAt = new Date();
  }
  
}