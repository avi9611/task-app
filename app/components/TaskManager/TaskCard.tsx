import React from "react";
import { Task } from "./types";
import { MoveRight, Check, Edit3, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  status: Task["status"];
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleSelection: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  status,
  onStatusChange,
  onEdit,
  onDelete,
  onToggleSelection,
}) => {
  const handleDelete = () => {
    if (task._id) {
      if (window.confirm("Are you sure you want to delete this task?")) {
        console.log("Deleting Task ID:", task._id);
        onDelete(task._id);
      }
    } else {
      console.error("Task ID is undefined");
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm cursor-move transition-all duration-200 border"
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task._id || "");
        e.currentTarget.classList.add("opacity-50");
      }}
      onDragEnd={(e) => e.currentTarget.classList.remove("opacity-50")}
    >
      <div className="flex items-start gap-3 p-4">
        <input
          type="checkbox"
          checked={task.selected}
          onChange={() => onToggleSelection(task._id)}
          className="mt-1"
        />
        <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent flex item from growing */}
          <h3 className="font-medium text-gray-800 truncate">{task.title}</h3>
          <p className="text-sm text-gray-600 mt-1 break-words overflow-hidden overflow-ellipsis">
            {task.description}
          </p>
          <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
            <div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {task.category}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t px-4 py-2 flex justify-end gap-2 bg-gray-50 flex-wrap">
        {status !== "completed" && (
          <button
            onClick={() =>
              onStatusChange(
                task._id,
                status === "todo" ? "inprogress" : "completed"
              )
            }
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-white transition-colors ${
              status === "todo"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {status === "todo" ? (
              <>
                <MoveRight size={16} />
                <span className="text-sm">Start</span>
              </>
            ) : (
              <>
                <Check size={14} />
                <span className="text-sm">Complete</span>
              </>
            )}
          </button>
        )}
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        >
          <Edit3 size={16} />
          <span className="text-sm">Edit</span>
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
        >
          <Trash2 size={16} />
          <span className="text-sm">Delete</span>
        </button>
      </div>
    </div>
  );
};