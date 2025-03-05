import React, { useRef } from "react";
import {
  List,
  ListOrdered,
  CheckSquare,
  Image,
  Code,
  Paperclip,
} from "lucide-react";
import Table from "../Table";

const ContentInsertionGroup = ({
  insertList,
  insertCheckboxList,
  editorRef,
  insertImage,
  insertCodeBlock,
  insertAttachment,
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    insertAttachment(event.target.files);
  };

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
      <Table editorRef={editorRef} />
      <button
        onClick={insertImage}
        className="toolbar-btn"
        title="Insert Image"
      >
        <Image size={16} />
      </button>
      <button
        onClick={insertCodeBlock}
        className="toolbar-btn"
        title="Insert Code Block"
      >
        <Code size={16} />
      </button>
      <button
        onClick={() => fileInputRef.current.click()}
        className="toolbar-btn"
        title="Attach File"
      >
        <Paperclip size={16} />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        multiple
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ContentInsertionGroup;
