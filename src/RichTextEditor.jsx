import React, { useRef, useState } from "react";
import Toolbar from "./Toolbar";
import Editor from "./Editor";
import TableControls from "./TableControls";

const RichTextEditor = () => {
  const editorRef = useRef(null);
  const [hoveredTable, setHoveredTable] = useState(null);

  return (
    <div className="editor-container bg-white rounded-lg shadow-md p-4">
      <Toolbar editorRef={editorRef} />
      <Editor
        editorRef={editorRef}
        hoveredTable={hoveredTable}
        setHoveredTable={setHoveredTable}
      />
      {hoveredTable && <TableControls table={hoveredTable} />}
    </div>
  );
};

export default RichTextEditor;
