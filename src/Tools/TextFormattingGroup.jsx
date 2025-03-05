import React from "react";
import { Bold, Italic, Underline, Droplet } from "lucide-react";

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
  return (
    <div className="toolbar-group">
      <button
        onClick={toggleBold}
        className={`toolbar-btn ${isBold ? "bg-blue-100 text-blue-600" : ""}`}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={toggleItalic}
        className={`toolbar-btn ${isItalic ? "bg-blue-100 text-blue-600" : ""}`}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={toggleUnderline}
        className={`toolbar-btn ${
          isUnderline ? "bg-blue-100 text-blue-600" : ""
        }`}
        title="Underline"
      >
        <Underline size={16} />
      </button>
      <button
        onClick={toggleHighlight}
        className={`toolbar-btn ${
          isHighlighted ? "bg-blue-100 text-blue-600" : ""
        }`}
        title="Highlight"
      >
        <Droplet size={16} />
      </button>
    </div>
  );
};

export default TextFormattingGroup;
