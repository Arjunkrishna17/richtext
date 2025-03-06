import React from "react";

const Editor = ({ editorRef }) => {
  return (
    <div
      ref={editorRef}
      contentEditable
      className="editor p-4 min-h-64 border border-gray-200 rounded-b-lg outline-none"
    ></div>
  );
};

export default Editor;
