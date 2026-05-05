import { Priority, TaskStatus } from "../constants/enums";
import { Task } from "../models/Task";
import { ApiResponse } from "../types/api.types";
import { CreateTaskData, SummaryReport, TaskFilter, TaskShape, UpdateTaskData } from "../types/task.types";
import { UserShape } from "../types/user.types";
import { BaseService } from "./BaseService";

export class TaskService extends BaseService<Task> {

  add(data: CreateTaskData): Task {
    const newTask = new Task(data);
    this.items.push(newTask);
    return newTask;
  }

  update(id: string, data: UpdateTaskData): Task {
    const task = this.findById(id);
    Object.assign(task, data);
    task.updatedAt = new Date();
    return task;
  }

  assignTaskToUser(id: string, user: UserShape): void {
    const task = this.findById(id);
    task.assignToUser(user);
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.items.filter(t => t.status === status);
  }

  getTasksByPriority(priority: Priority): Task[] {
    return this.items.filter(t => t.priority === priority);
  }

  getTasksByAssignee(userId: string): Task[] {
    return this.items.filter(t => t.assignee?.id === userId);
  }

  filterTasks(filter: TaskFilter): Task[] {
    return this.items.filter(task => {
      if (filter.status && task.status !== filter.status) return false;
      if (filter.priority && task.priority !== filter.priority) return false;
      if (filter.assignee && task.assignee?.id !== filter.assignee.id) return false;
      return true;
    });
  }

  searchTask(query: string): Task[] {
    if (!query) return [];

    const lowQuery = query.toLowerCase();

    const tasks: Task[] = this.items.filter(t => {
      return t.title.toLowerCase().includes(lowQuery) || t.description.toLowerCase().includes(lowQuery);
    });

    return tasks;
  }

  sortTasks(by: keyof Omit<TaskShape, "id" | "updatedAt" | "assignee">): Task[] {
    return [...this.items].sort((a, b) => {
      const valA = a[by];
      const valB = b[by];

      if (valA === undefined) return 1;
      if (valB === undefined) return -1;

      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });
  }

  getSummaryReport(): ApiResponse<SummaryReport> {
    const totalTasks = this.items.length;
    const statusCounts = this.items.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<TaskStatus, number>);
    const overdueCount = this.items.filter(t => t.isOverdue()).length;

    return {
      success: true,
      data: {
        totalTasks,
        statusCounts,
        overdueCount
      }
    };
  }

}