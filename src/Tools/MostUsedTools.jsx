import React from "react";
import { List, ListOrdered } from "lucide-react";

const ListTools = ({ insertList }) => {
  // List tool configuration
  const listOptions = [
    {
      type: "unordered",
      icon: List,
      title: "Bullet List",
      color: "text-teal-500",
      hoverColor: "hover:bg-teal-50",
      activeColor: "active:bg-teal-100",
    },
    {
      type: "ordered",
      icon: ListOrdered,
      title: "Numbered List",
      color: "text-indigo-500",
      hoverColor: "hover:bg-indigo-50",
      activeColor: "active:bg-indigo-100",
    },
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-50 p-1 rounded-lg border border-gray-200 shadow-sm">
      {listOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => insertList(option.type)}
          className={`
            p-2 
            rounded-md 
            transition-all 
            duration-200 
            ease-in-out
            ${option.color}
            ${option.hoverColor}
            ${option.activeColor}
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-300
            hover:scale-105 
            active:scale-95
          `}
          title={option.title}
        >
          <option.icon size={16} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
};

export default ListTools;
