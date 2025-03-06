import React, { useRef } from "react";

import Toolbar from "./ToolBar/Toolbar";
import Editor from "./Editor/Editor";

const RichTextEditor = () => {
  const editorRef = useRef(null);

  return (
    <div className="editor-container bg-white rounded-lg shadow-md p-4">
      <Toolbar editorRef={editorRef} />
      <Editor editorRef={editorRef} />
    </div>
  );
};

export default RichTextEditor;
