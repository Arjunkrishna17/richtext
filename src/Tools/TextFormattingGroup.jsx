import React from "react";
import { Bold, Italic, Underline, Highlighter } from "lucide-react";

const TextFormattingGroup = ({
  isBold,
  toggleBold,
  isItalic,
  toggleItalic,
  isUnderline,
  toggleUnderline,
  isHighlighted,
  toggleHighlight,
}) => {
  // Configuration for formatting buttons with colored icons
  const formattingOptions = [
    {
      icon: Bold,
      isActive: isBold,
      onClick: toggleBold,
      title: "Bold",
      activeColor: "bg-blue-100 text-blue-700",
      hoverColor: "hover:bg-blue-50",
      iconColor: "text-blue-500",
      activeIconColor: "text-blue-700",
    },
    {
      icon: Italic,
      isActive: isItalic,
      onClick: toggleItalic,
      title: "Italic",
      activeColor: "bg-green-100 text-green-700",
      hoverColor: "hover:bg-green-50",
      iconColor: "text-green-500",
      activeIconColor: "text-green-700",
    },
    {
      icon: Underline,
      isActive: isUnderline,
      onClick: toggleUnderline,
      title: "Underline",
      activeColor: "bg-purple-100 text-purple-700",
      hoverColor: "hover:bg-purple-50",
      iconColor: "text-purple-500",
      activeIconColor: "text-purple-700",
    },
    {
      icon: Highlighter,
      isActive: isHighlighted,
      onClick: toggleHighlight,
      title: "Highlight",
      activeColor: "bg-yellow-100 text-yellow-700",
      hoverColor: "hover:bg-yellow-50",
      iconColor: "text-yellow-500",
      activeIconColor: "text-yellow-700",
    },
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-50 p-1 rounded-lg border border-gray-200 shadow-sm">
      {formattingOptions.map((option, index) => (
        <button
          key={index}
          onClick={option.onClick}
          title={option.title}
          className={`
            p-2 rounded-md transition-all duration-200 ease-in-out
            ${option.isActive ? option.activeColor : "text-gray-600"}
            ${!option.isActive && option.hoverColor}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300
            hover:scale-105 active:scale-95
          `}
        >
          <option.icon
            size={16}
            strokeWidth={option.isActive ? 2.5 : 1.5}
            className={`
              transition-all 
              ${option.isActive ? option.activeIconColor : option.iconColor}
            `}
          />
        </button>
      ))}
    </div>
  );
};

export default TextFormattingGroup;
