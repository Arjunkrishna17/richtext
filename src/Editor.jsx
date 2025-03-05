import React, { useEffect } from "react";

const Editor = ({ editorRef, hoveredTable, setHoveredTable }) => {
  return (
    <div
      ref={editorRef}
      contentEditable
      className="editor p-4 min-h-64 border border-gray-200 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    ></div>
  );
};

export default Editor;
