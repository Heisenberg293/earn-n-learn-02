
import React from "react";
import { EscrowTransaction } from "./types";

interface StatusBadgeProps {
  status: EscrowTransaction["status"];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    "pending": "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    "completed": "bg-green-100 text-green-800",
    "disputed": "bg-red-100 text-red-800",
    "refunded": "bg-gray-100 text-gray-800"
  };
  
  const statusLabels = {
    "pending": "Pending Acceptance",
    "in-progress": "In Progress",
    "completed": "Completed",
    "disputed": "Disputed",
    "refunded": "Refunded"
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;
