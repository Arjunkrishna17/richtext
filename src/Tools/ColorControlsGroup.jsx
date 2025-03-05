import React from "react";
import { Droplet } from "lucide-react";
import ColorPicker from "../ColorPicker";

const ColorControlsGroup = ({
  textColor,
  changeTextColor,
  showColorPicker,
  setShowColorPicker,
  highlightColor,
  setHighlightColor,
}) => {
  return (
    <div className="toolbar-group">
      <ColorPicker
        color={textColor}
        onChange={changeTextColor}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
      />
      <div className="flex items-center gap-1" title="Highlight Color">
        <Droplet size={16} className="text-gray-500" />
        <input
          type="color"
          value={highlightColor}
          onChange={(e) => setHighlightColor(e.target.value)}
          className="toolbar-color"
        />
      </div>
    </div>
  );
};

export default ColorControlsGroup;
