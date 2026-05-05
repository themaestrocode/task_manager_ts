import { Priority, TaskStatus } from "./constants/enums";
import { User } from "./models/User";
import { TaskService } from "./services/TaskService";
import { UserService } from "./services/UserService";
import { ApiResponse } from "./types/api.types";
import { SummaryReport } from "./types/task.types";
import { formatReport, formatTask } from "./utils/formatters";

const userService = new UserService();
const victor = userService.add({ name: "Victor", email: "victor@example.com" });
const oge = userService.add({ name: "Oge", email: "oge@example.com" });

const taskService = new TaskService();

const task1 = taskService.add({
  title: "Design Homepage",
  description: "Create wireframes and mockups for the homepage",
  status: TaskStatus.ToDo,
  priority: Priority.High,
  dueDate: new Date("2024-07-01")
});

const task2 = taskService.add({
  title: "Implement Authentication",
  description: "Set up user authentication with JWT",
  status: TaskStatus.InProgress,
  priority: Priority.Medium,
  dueDate: new Date("2024-07-10")
});

const task3 = taskService.add({
  title: "Deploy to production",
  description: "Deploy the application to production",
  status: TaskStatus.ToDo,
  priority: Priority.Low,
  assignee: victor
});

const task4 = taskService.add({
  title: "Write unit tests",
  description: "Write unit tests for the TaskService",
  status: TaskStatus.Done,
  priority: Priority.Medium,
  assignee: oge,
  dueDate: new Date("2024-06-30")
});

const task5 = taskService.add({
  title: "Set up CI/CD",
  description: "Configure continuous integration and deployment",
  status: TaskStatus.InProgress,
  priority: Priority.High,
  assignee: victor,
  dueDate: new Date("2024-07-15")
});

// Assign tasks
taskService.assignTaskToUser(task1.id, victor);
taskService.assignTaskToUser(task2.id, oge);

const tasksTodo = taskService.getTasksByStatus(TaskStatus.ToDo);
const tasksInProgress = taskService.getTasksByStatus(TaskStatus.InProgress);

const highPriorityTasks = taskService.getTasksByPriority(Priority.High);
const mediumPriorityTasks = taskService.getTasksByPriority(Priority.Medium);

// Get tasks assigned to Victor
const victorsTasks = taskService.getTasksByAssignee(victor.id);

// Get summary report
const summaryReport = taskService.getSummaryReport();

console.log("=========== USERS ===========");
console.log(`users:: oge: ${oge.name} and victor: ${victor.name} \n`)

console.log("To Do Tasks:", tasksTodo.map(t => formatTask(t)));
console.log("High Priority:", highPriorityTasks.map(t => formatTask(t)));
console.log("Victor's Tasks:", victorsTasks.map(t => formatTask(t)));
console.log(formatReport(summaryReport.data));