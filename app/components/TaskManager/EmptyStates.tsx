import React from "react";

interface EmptyStateProps {
  status: "todo" | "inprogress" | "completed";
}

export const EmptyState: React.FC<EmptyStateProps> = ({ status }) => (
  <div className="text-center py-8 text-gray-500">
    <p>No tasks in {status === "inprogress" ? "progress" : status}</p>
  </div>
);