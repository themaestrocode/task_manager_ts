import { TaskShape } from "../types/task.types";

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatTask(task: TaskShape): string {
  return `${task.title} - ${task.description} (Due: ${task.dueDate ? formatDate(task.dueDate) : "No due date"})`;
}

export function formatReport(report: object): string {
  const lines = ["===== TASK SUMMARY REPORT ====="];

  for (const [key, value] of Object.entries(report)) {
    lines.push(`  ${key}: ${JSON.stringify(value)}`);
  }
  lines.push("================================");
  
  return lines.join("\n");
}