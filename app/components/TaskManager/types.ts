export interface Task {
  _id: string; 
  title: string;
  description: string;
  category: "Work" | "Personal";
  dueDate: string;
  status: "todo" | "inprogress" | "completed";
  selected: boolean;
  clerkUserId: string;
};

export interface AppProps {
  onTasksChange?: (tasks: Task[]) => void;
}
