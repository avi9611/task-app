import React from "react";
import { Task } from "./types";
import { MoveRight, Check, Edit3, Trash2 } from "lucide-react";

interface ListViewProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleSelection: (taskId: string) => void;
}

export const ListView: React.FC<ListViewProps> = ({
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
  onToggleSelection,
}) => {
  const handleSelectAll = (checked: boolean) => {
    console.log("Select All Checked:", checked);
    tasks.forEach((task) => onToggleSelection(task._id));
    
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-4 text-left">
              <input
                type="checkbox"
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={
                  tasks.length > 0 && tasks.every((task) => task.selected)
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th className="p-4 text-left font-semibold">Task Name</th>
            <th className="p-4 text-left font-semibold">Due Date</th>
            <th className="p-4 text-left font-semibold">Status</th>
            <th className="p-4 text-left font-semibold">Category</th>
            <th className="p-4 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task._id}
              className="border-b hover:bg-gray-50 cursor-move bg-white"
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  checked={task.selected}
                  onChange={() => onToggleSelection(task._id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td className="p-4">
                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-gray-500">
                    {task.description}
                  </div>
                </div>
              </td>
              <td className="p-4">
                {new Date(task.dueDate).toLocaleDateString()}
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    task.status === "todo"
                      ? "bg-purple-100 text-purple-800"
                      : task.status === "inprogress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {task.status === "inprogress"
                    ? "In Progress"
                    : task.status === "completed"
                    ? "Completed"
                    : "To Do"}
                </span>
              </td>
              <td className="p-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {task.category}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  {task.status !== "completed" && (
                    <button
                      onClick={() =>
                        onStatusChange(
                          task._id,
                          task.status === "todo" ? "inprogress" : "completed"
                        )
                      }
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-white transition-colors ${
                        task.status === "todo"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {task.status === "todo" ? (
                        <>
                          <MoveRight size={18} />
                          <span>Start</span>
                        </>
                      ) : (
                        <>
                          <Check size={18} />
                          <span>Complete</span>
                        </>
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => onEdit(task)} 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  >
                    <Edit3 size={18} />
                    <span>Edit</span>
                  </button>
                  
                  <button
                    onClick={() => onDelete(task._id)} 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">No tasks found</div>
      )}
    </div>
  );
};
