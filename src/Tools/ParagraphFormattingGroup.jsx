import React, { useState } from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";

const MoreTools = ({ alignText, indentText, outdentText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const paragraphOptions = [
    {
      type: "Left",
      icon: AlignLeft,
      title: "Align Left",
      color: "text-blue-500",
    },
    {
      type: "Center",
      icon: AlignCenter,
      title: "Align Center",
      color: "text-green-500",
    },
    {
      type: "Right",
      icon: AlignRight,
      title: "Align Right",
      color: "text-purple-500",
    },
    {
      type: "Indent",
      icon: ChevronRight,
      title: "Indent",
      color: "text-orange-500",
      action: indentText,
    },
    {
      type: "Outdent",
      icon: ChevronLeft,
      title: "Outdent",
      color: "text-red-500",
      action: outdentText,
    },
  ];

  return (
    <div className="relative inline-block">
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center 
          space-x-2 
          px-3 
          py-2 
          bg-white 
          border 
          border-gray-300 
          rounded-md 
          hover:bg-gray-50 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-300
        "
      >
        <span className="text-sm text-gray-700">More</span>
        <ChevronDown
          size={16}
          className={`
            text-gray-500 
            transition-transform 
            duration-200 
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="
          absolute 
          left-0 
          mt-2 
          w-48 
          bg-white 
          border 
          border-gray-300 
          rounded-md 
          shadow-lg 
          z-10
          overflow-hidden
        "
        >
          {paragraphOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => {
                option.action ? option.action() : alignText(option.type);
                setIsOpen(false);
              }}
              className="
                w-full 
                flex 
                items-center 
                px-3 
                py-2 
                text-left 
                hover:bg-gray-100 
                transition-colors 
                duration-200
              "
            >
              <option.icon size={16} className={`${option.color} mr-3`} />
              <span className="text-sm text-gray-700">{option.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoreTools;
