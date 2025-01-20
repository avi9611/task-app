import { Task } from "./types";

export const getStatusColor = (status: Task["status"]) => {
  switch (status) {
    case "todo":
      return "bg-purple-100 border-purple-200";
    case "inprogress":
      return "bg-sky-100 border-sky-200";
    case "completed":
      return "bg-green-100 border-green-200";
  }
};

export const filterTasks = (
  tasks: Task[],
  searchQuery: string,
  categoryFilter: "all" | "Work" | "Personal",
  dateFilter: "all" | "today" | "week" | "month"
) => {
  return tasks.filter((task) => {
    const matchesSearch =
      (task.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);

    const matchesCategory =
      categoryFilter === "all" || task.category === categoryFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const taskDate = new Date(task.dueDate);
      const today = new Date();
      const weekAhead = new Date();
      const monthAhead = new Date();
      weekAhead.setDate(today.getDate() + 7);
      monthAhead.setMonth(today.getMonth() + 1);

      if (dateFilter === "today") {
        matchesDate = taskDate.toDateString() === today.toDateString();
      } else if (dateFilter === "week") {
        matchesDate = taskDate <= weekAhead && taskDate >= today;
      } else if (dateFilter === "month") {
        matchesDate = taskDate <= monthAhead && taskDate >= today;
      }
    }

    return matchesSearch && matchesCategory && matchesDate;
  });
};

export const loadTasksFromStorage = (): Task[] => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};