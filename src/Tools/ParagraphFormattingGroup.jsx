import React from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const ParagraphFormattingGroup = ({ alignText, indentText, outdentText }) => {
  return (
    <div className="toolbar-group">
      <button
        onClick={() => alignText("Left")}
        className="toolbar-btn"
        title="Align Left"
      >
        <AlignLeft size={16} />
      </button>
      <button
        onClick={() => alignText("Center")}
        className="toolbar-btn"
        title="Align Center"
      >
        <AlignCenter size={16} />
      </button>
      <button
        onClick={() => alignText("Right")}
        className="toolbar-btn"
        title="Align Right"
      >
        <AlignRight size={16} />
      </button>
      <button onClick={indentText} className="toolbar-btn" title="Indent">
        <ChevronRight size={16} />
      </button>
      <button onClick={outdentText} className="toolbar-btn" title="Outdent">
        <ChevronLeft size={16} />
      </button>
    </div>
  );
};

export default ParagraphFormattingGroup;
