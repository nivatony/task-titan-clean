
import { Project, Task, User } from "@/types";

// Mock users
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "project_manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: "4",
    name: "Sam Wilson",
    email: "sam@example.com",
    role: "developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam"
  }
];

// Mock tasks
const generateTasks = (projectId: string): Task[] => {
  return [
    {
      id: `task-${projectId}-1`,
      title: "Design the user interface",
      description: "Create wireframes and mockups for the new feature",
      status: "done",
      assignee: users[1],
      createdAt: new Date(2025, 4, 1),
      updatedAt: new Date(2025, 4, 3),
      projectId
    },
    {
      id: `task-${projectId}-2`,
      title: "Implement frontend components",
      description: "Develop the React components based on the approved designs",
      status: "progress",
      assignee: users[2],
      createdAt: new Date(2025, 4, 2),
      updatedAt: new Date(2025, 4, 5),
      projectId
    },
    {
      id: `task-${projectId}-3`,
      title: "Write API documentation",
      description: "Create comprehensive API docs for the backend team",
      status: "todo",
      assignee: users[3],
      createdAt: new Date(2025, 4, 2),
      updatedAt: new Date(2025, 4, 2),
      projectId
    }
  ];
};

// Mock projects
export const projects: Project[] = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Complete overhaul of the company website with new branding guidelines",
    deadline: new Date(2025, 5, 15),
    createdAt: new Date(2025, 3, 1),
    updatedAt: new Date(2025, 4, 5),
    tasks: generateTasks("1")
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Develop a new mobile app for both iOS and Android platforms",
    deadline: new Date(2025, 7, 30),
    createdAt: new Date(2025, 3, 15),
    updatedAt: new Date(2025, 4, 5),
    tasks: generateTasks("2")
  },
  {
    id: "3",
    title: "Customer Dashboard",
    description: "Build an analytics dashboard for customers to track their usage",
    deadline: new Date(2025, 6, 20),
    createdAt: new Date(2025, 4, 1),
    updatedAt: new Date(2025, 4, 5),
    tasks: generateTasks("3")
  }
];

// Mock API methods
export const getProjects = (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...projects]);
    }, 500);
  });
};

export const getProject = (id: string): Promise<Project | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projects.find(p => p.id === id));
    }, 300);
  });
};

export const getUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...users]);
    }, 300);
  });
};

// Helper function to calculate project stats
export const getProjectStats = (project: Project) => {
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(task => task.status === "done").length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const daysLeft = Math.ceil((project.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    totalTasks,
    completedTasks,
    progressPercentage,
    daysLeft
  };
};
