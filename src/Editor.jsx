import React, { useEffect } from "react";

const Editor = ({ editorRef, hoveredTable, setHoveredTable }) => {
  useEffect(() => {
    const editor = editorRef.current;

    const handleMouseEnter = (event) => {
      const table = event.target.closest("table");
      if (table) {
        setHoveredTable(table);
      }
    };

    const handleMouseLeave = () => {
      setHoveredTable(null);
    };

    editor.addEventListener("mouseenter", handleMouseEnter, true);
    editor.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      editor.removeEventListener("mouseenter", handleMouseEnter, true);
      editor.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [editorRef, setHoveredTable]);

  return (
    <div
      ref={editorRef}
      contentEditable
      className="editor p-4 min-h-64 border border-gray-200 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    ></div>
  );
};

export default Editor;
