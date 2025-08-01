export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export type Filter = "all" | "todo" | "completed";
