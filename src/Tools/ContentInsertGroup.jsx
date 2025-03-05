import React from "react";
import { List, ListOrdered, CheckSquare, Image, Code } from "lucide-react";
import TableToolbar from "./TableToolbar";

const ContentInsertionGroup = ({
  insertList,
  insertCheckboxList,
  editorRef,
  insertImage,
  insertCodeBlock,
}) => {
  return (
    <div className="toolbar-group">
      <button
        onClick={() => insertList("unordered")}
        className="toolbar-btn"
        title="Bullet List"
      >
        <List size={16} />
      </button>
      <button
        onClick={() => insertList("ordered")}
        className="toolbar-btn"
        title="Numbered List"
      >
        <ListOrdered size={16} />
      </button>
      <button
        onClick={insertCheckboxList}
        className="toolbar-btn"
        title="Checkbox List"
      >
        <CheckSquare size={16} />
      </button>
      <TableToolbar editorRef={editorRef} />
      <button
        onClick={insertImage}
        className="toolbar-btn"
        title="Insert Image"
      >
        <Image size={16} />
      </button>
      <button onClick={insertCodeBlock} title="Insert Code Block">
        <Code size={16} />
      </button>
    </div>
  );
};

export default ContentInsertionGroup;
