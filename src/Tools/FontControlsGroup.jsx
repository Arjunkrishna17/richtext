import React from "react";
import { Type } from "lucide-react";

const FontControlsGroup = ({
  fontFamily,
  changeFontFamily,
  fontSize,
  changeFontSize,
}) => {
  return (
    <div className="toolbar-group">
      <div className="flex items-center gap-1">
        <Type size={16} className="text-gray-500" />
        <select
          value={fontFamily}
          onChange={(e) => changeFontFamily(e.target.value)}
          className="toolbar-select"
          title="Font Family"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
        </select>
      </div>
      <div className="flex items-center gap-1">
        <select
          value={fontSize}
          onChange={(e) => changeFontSize(e.target.value)}
          className="toolbar-select"
          title="Font Size"
        >
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
        </select>
      </div>
    </div>
  );
};

export default FontControlsGroup;
