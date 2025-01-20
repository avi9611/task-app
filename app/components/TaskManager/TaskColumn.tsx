import React from "react";
import { Task } from "./types";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "./EmptyStates";
import { getStatusColor } from "./utils";

interface TaskColumnProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleSelection: (taskId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, status: Task["status"]) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  status,
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
  onToggleSelection,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const statusTasks = tasks.filter((task) => task.status === status);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragOver(e);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(e, status);
  };

  return (
    <div
      className={`flex-1 min-w-[300px] ${getStatusColor(
        status
      )} rounded-lg p-4 border`}
      onDragOver={handleDragOver}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {title}{" "}
          <span className="text-sm text-gray-500">({statusTasks.length})</span>
        </h2>
      </div>
      <div className="space-y-3">
        {statusTasks.length > 0 ? (
          statusTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              status={status}
              onStatusChange={onStatusChange}
              onEdit={onEdit} 
              onDelete={onDelete} 
              onToggleSelection={onToggleSelection}
            />
          ))
        ) : (
          <EmptyState status={status} />
        )}
      </div>
    </div>
  );
};
