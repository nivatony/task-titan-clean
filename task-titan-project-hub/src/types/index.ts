
export type UserRole = "admin" | "project_manager" | "developer";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

export type TaskStatus = "todo" | "progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee?: User;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
}
