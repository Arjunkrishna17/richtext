import React, { useState } from "react";
import { Droplet, X } from "lucide-react";
import ColorPicker from "../ColorPicker";

const ColorControlsGroup = ({
  textColor,
  changeTextColor,
  showColorPicker,
  setShowColorPicker,
  highlightColor,
  setHighlightColor,
}) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleColorButtonClick = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
    setShowColorPicker(true);
  };

  const handleCloseColorPicker = () => {
    setIsColorPickerOpen(false);
    setShowColorPicker(false);
  };

  return (
    <div className="relative inline-block">
      {/* Color Button */}
      <button
        onClick={handleColorButtonClick}
        className={`
          flex items-center 
          justify-center
          w-10 
          h-10 
          rounded-md 
          transition-all 
          duration-200 
          ease-in-out
          ${textColor ? "bg-opacity-20" : "bg-gray-100"}
          hover:bg-opacity-30
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-300
          relative
        `}
        style={{
          backgroundColor: textColor || "transparent",
          borderColor: textColor || "#e5e7eb",
        }}
        title="Text Color"
      >
        <Droplet
          size={16}
          className={`
            ${textColor ? "text-white" : "text-gray-600"}
            absolute
          `}
          strokeWidth={textColor ? 2.5 : 1.5}
        />
      </button>

      {/* Color Picker Overlay */}
      {isColorPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-4 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseColorPicker}
              className="
                absolute 
                top-2 
                right-2 
                text-gray-500 
                hover:text-gray-700 
                focus:outline-none
                rounded-full
                p-1
                hover:bg-gray-100
              "
            >
              <X size={20} />
            </button>

            {/* Color Picker Component */}
            <ColorPicker
              color={textColor}
              onChange={changeTextColor}
              showColorPicker={showColorPicker}
              setShowColorPicker={setShowColorPicker}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorControlsGroup;
