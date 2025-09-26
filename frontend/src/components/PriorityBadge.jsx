import React from "react";

const colorMap = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
};

const PriorityBadge = ({ priority }) => {
  const key = (priority || "").toLowerCase();
  const cls = colorMap[key] || "bg-gray-100 text-gray-800 border-gray-200";
  return (
    <span className={`inline-block text-xs px-2 py-1 border rounded ${cls}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;

const cardColorMap = {
  low: "bg-green-50 border-green-200",
  medium: "bg-yellow-50 border-yellow-200",
  high: "bg-red-50 border-red-200",
};

export const getPriorityCardClass = (priority) => {
  const key = (priority || "").toLowerCase();
  // console.log(priority, key, cardColorMap[key]);

  return cardColorMap[key] || "bg-white border-gray-200";
};
