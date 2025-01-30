import React, { useState, useMemo, useEffect } from "react";
import { Plus, Trash, LayoutGrid, List, Search } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { TaskColumn } from "./TaskColumn";
import { ListView } from "./ListView";
import { Modal } from "./Modal";
import { Task, AppProps } from "./types";
import { filterTasks } from "./utils";
import { useUser } from "@clerk/nextjs";

export const MainComp: React.FC<AppProps> = ({ onTasksChange }) => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<"board" | "list">("board");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "Work" | "Personal"
  >("all");
  const [dateFilter, setDateFilter] = useState<
    "all" | "today" | "week" | "month"
  >("all");
  const [newTask, setNewTask] = useState<Omit<Task, "_id">>({
    title: "",
    description: "",
    category: "Work",
    dueDate: "",
    status: "todo",
    selected: false,
    clerkUserId: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/task?clerkUserId=${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Save view mode to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("viewMode", viewMode);
    }
  }, [viewMode]);

  const updateTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    onTasksChange?.(newTasks);
  };

  const selectedTasks = useMemo(() => {
    return (tasks || []).filter((task) => task.selected);
  }, [tasks]);

  const deleteSelectedTasks = async () => {
    try {
      const selectedIds = selectedTasks.map((task) => task._id);

      const response = await fetch("/api/task", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete selected tasks");
      }

      updateTasks(tasks.filter((task) => !task.selected));
      showNotification("Selected tasks deleted successfully");
    } catch (error) {
      console.error("Error deleting selected tasks:", error);
      showNotification("Failed to delete selected tasks. Please try again.");
    }
  };

  const toggleTaskSelection = (taskId: string) => {
    updateTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, selected: !task.selected } : task
      )
    );
  };

  const handleStatusChange = async (
    taskId: string,
    newStatus: "todo" | "inprogress" | "completed"
  ) => {
    try {
      const response = await fetch("/api/task", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: taskId,
          status: newStatus,
          clerkUserId: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      const updatedTask = await response.json();
      updateTasks(
        tasks.map((task) => (task._id === taskId ? updatedTask.task : task))
      );

      const statusMessages = {
        todo: "Task moved to To Do",
        inprogress: "Task moved to In Progress",
        completed: "Task completed successfully! 🎉",
      };
      showNotification(statusMessages[newStatus]);
    } catch (error) {
      console.error("Error updating task status:", error);
      showNotification("Failed to update task status. Please try again.");
    }
  };

  // add task handler
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response;
      if (editingTask) {
        // Update an existing task
        response = await fetch("/api/task", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingTask._id,
            ...newTask,
            clerkUserId: user?.id,
          }),
        });
      } else {
        // Create a new task
        response = await fetch("/api/task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newTask,
            clerkUserId: user?.id,
          }),
        });
      }
      console.log("Editing Task ID:", editingTask?._id);
      console.log("New Task Data:", newTask);

      if (!response.ok) {
        throw new Error("Failed to save task");
      }

      const savedTask = await response.json();

      // Update the local state
      if (editingTask) {
        updateTasks(
          tasks.map((task) =>
            task._id === editingTask._id ? savedTask.task : task
          )
        );
        showNotification("Task updated successfully! ✏️");
      } else {
        updateTasks([...tasks, savedTask.task]);
        showNotification("Task added successfully! 📝");
      }

      // Reset the form and close the modal
      setNewTask({
        title: "",
        description: "",
        category: "Work",
        dueDate: "",
        status: "todo",
        selected: false,
        clerkUserId: "",
      });
      setEditingTask(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
      showNotification("Failed to save task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/task?id=${taskId}`, {
        method: "DELETE",
      });
      console.log("Deleting Task ID:", taskId);

      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
        alert("Task deleted successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to delete the task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred while deleting the task.");
    }
  };

  const editTask = (task: Task) => {
    console.log("Editing Task:", task);

    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      category: task.category,
      dueDate: task.dueDate,
      status: task.status,
      selected: task.selected,
      clerkUserId: task.clerkUserId,
    });
    setIsModalOpen(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-blue-50");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-blue-50");
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: Task["status"]
  ) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-blue-50");
    const taskId = e.dataTransfer.getData("taskId");
    handleStatusChange(taskId, newStatus);
  };

  const showNotification = (message: string) => {
    toast.success(message, {
      style: {
        background: "#10B981",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#10B981",
      },
    });
  };

  const filteredTasks = filterTasks(
    tasks,
    searchQuery,
    categoryFilter,
    dateFilter
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Task Manager
            </h1>
            <button
              onClick={() => {
                setEditingTask(null);
                setNewTask({
                  title: "",
                  description: "",
                  category: "Work",
                  dueDate: "",
                  status: "todo",
                  selected: false,
                  clerkUserId: "",
                });
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span className="hidden md:inline">Add Task</span>
            </button>
          </div>

          {selectedTasks.length > 0 && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex justify-between items-center">
              <span className="text-red-800">
                {selectedTasks.length} task{selectedTasks.length > 1 ? "s" : ""}{" "}
                selected
              </span>
              <button
                onClick={deleteSelectedTasks}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash size={16} />
                Delete Selected
              </button>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(
                    e.target.value as "all" | "Work" | "Personal"
                  )
                }
                className="border rounded-lg px-3 py-2"
              >
                <option value="all">All Categories</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(
                    e.target.value as "all" | "today" | "week" | "month"
                  )
                }
                className="border rounded-lg px-3 py-2"
              >
                <option value="all">All Dates</option>
                <option value="today">Due Today</option>
                <option value="week">Due This Week</option>
                <option value="month">Due This Month</option>
              </select>
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("board")}
                  className={`flex-1 md:flex-none px-3 py-2 ${
                    viewMode === "board"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 md:flex-none px-3 py-2 ${
                    viewMode === "list"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {viewMode === "board" ? (
          <div className="flex flex-col md:flex-row gap-6 md:overflow-x-auto pb-4">
            <TaskColumn
              title="To Do"
              status="todo"
              tasks={filteredTasks}
              onStatusChange={handleStatusChange}
              onEdit={editTask}
              onDelete={handleDeleteTask}
              onToggleSelection={toggleTaskSelection}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            <TaskColumn
              title="In Progress"
              status="inprogress"
              tasks={filteredTasks}
              onStatusChange={handleStatusChange}
              onEdit={editTask}
              onDelete={handleDeleteTask}
              onToggleSelection={toggleTaskSelection}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            <TaskColumn
              title="Completed"
              status="completed"
              tasks={filteredTasks}
              onStatusChange={handleStatusChange}
              onEdit={editTask}
              onDelete={handleDeleteTask}
              onToggleSelection={toggleTaskSelection}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <ListView
              tasks={filteredTasks}
              onStatusChange={handleStatusChange}
              onEdit={editTask}
              onDelete={handleDeleteTask}
              onToggleSelection={toggleTaskSelection}
            />
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
          newTask={newTask}
          setNewTask={setNewTask}
          editingTask={editingTask}
        />
      </div>
    </div>
  );
};
