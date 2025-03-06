import React from "react";
import { Bold, Italic, Underline, Highlighter } from "lucide-react";

const TextFormat = ({
  isBold,
  toggleBold,
  isItalic,
  toggleItalic,
  isUnderline,
  toggleUnderline,
  isHighlighted,
  toggleHighlight,
}) => {
  const formattingOptions = [
    {
      icon: Bold,
      isActive: isBold,
      onClick: toggleBold,
      title: "Bold",
    },
    {
      icon: Italic,
      isActive: isItalic,
      onClick: toggleItalic,
      title: "Italic",
    },
    {
      icon: Underline,
      isActive: isUnderline,
      onClick: toggleUnderline,
      title: "Underline",
    },
    {
      icon: Highlighter,
      isActive: isHighlighted,
      onClick: toggleHighlight,
      title: "Highlight",
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
            ${option.isActive ? " " : ""}
            hover:bg-gray-100,   
          `}
        >
          <option.icon size={16} />
        </button>
      ))}
    </div>
  );
};

export default TextFormat;
