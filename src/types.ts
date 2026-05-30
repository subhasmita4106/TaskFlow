export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'doc';
  url?: string;
}

export type TaskStatus = 'Todo' | 'InProgress' | 'InReview' | 'Done';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  dueDate: string;
  assignees: {
    name: string;
    avatar: string;
    role?: string;
  }[];
  subtasks: SubTask[];
  comments: Comment[];
  attachments: Attachment[];
  tags: string[];
}

export interface Activity {
  id: string;
  type: 'add' | 'check' | 'comment' | 'edit';
  user: {
    name: string;
    avatar?: string;
  };
  taskTitle: string;
  detail?: string;
  timestamp: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  company: string;
}
