import { Priority, TaskStatus } from "../constants/enums";
import { BaseShape } from "./base.types";
import { UserShape } from "./user.types";

export interface TaskShape extends BaseShape {
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignee?: UserShape;
  dueDate?: Date;
}

export type TaskFilter = Partial<TaskShape>;

export type CreateTaskData = Omit<TaskShape, "id" | "createdAt" | "updatedAt">;

export type UpdateTaskData = Partial<CreateTaskData>;

export type SummaryReport = {
  totalTasks: number;
  statusCounts: Record<TaskStatus, number>;
  overdueCount: number;
};