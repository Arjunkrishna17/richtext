import React from "react";

const ToolbarGroup = ({ children }) => {
  return (
    <div className="toolbar-group flex border-r border-gray-200 pr-2 mr-2">
      {children}
    </div>
  );
};

export default ToolbarGroup;
