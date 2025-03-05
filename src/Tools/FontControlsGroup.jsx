import React from "react";
import { Type, ChevronDown, Heading1, Heading2, Heading3 } from "lucide-react";

const FontControlsGroup = ({
  fontFamily,
  changeFontFamily,
  fontSize,
  changeFontSize,
  changeHeading,
}) => {
  // Font configuration
  const fontFamilies = [
    { value: "Arial", label: "Arial", sample: "Aa" },
    { value: "Times New Roman", label: "Times", sample: "Aa" },
    { value: "Courier New", label: "Courier", sample: "Aa" },
    { value: "Verdana", label: "Verdana", sample: "Aa" },
    { value: "Georgia", label: "Georgia", sample: "Aa" },
  ];

  const fontSizes = [
    { value: "12px", label: "12" },
    { value: "14px", label: "14" },
    { value: "16px", label: "16" },
    { value: "18px", label: "18" },
    { value: "20px", label: "20" },
    { value: "24px", label: "24" },
  ];

  // Headings configuration
  const headingOptions = [
    {
      value: "",
      label: "Normal",
      icon: Type,
      className: "text-gray-600",
    },
    {
      value: "1",
      label: "Heading 1",
      icon: Heading1,
      className: "text-blue-600 font-bold",
    },
    {
      value: "2",
      label: "Heading 2",
      icon: Heading2,
      className: "text-green-600 font-semibold",
    },
    {
      value: "3",
      label: "Heading 3",
      icon: Heading3,
      className: "text-purple-600 font-medium",
    },
  ];

  return (
    <div className="flex items-center space-x-2 bg-gray-50 p-1 rounded-lg border border-gray-200 shadow-sm">
      {/* Font Family Dropdown */}
      <div className="relative">
        <select
          value={fontFamily}
          onChange={(e) => changeFontFamily(e.target.value)}
          className="
            appearance-none
            bg-white
            border 
            border-gray-300 
            rounded-md 
            pl-3 
            pr-8 
            py-1.5 
            text-sm 
            text-gray-700 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-300 
            cursor-pointer
            w-28
          "
          title="Font Family"
        >
          {fontFamilies.map((font) => (
            <option
              key={font.value}
              value={font.value}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Font Size Dropdown */}
      <div className="relative">
        <select
          value={fontSize}
          onChange={(e) => changeFontSize(e.target.value)}
          className="
            appearance-none
            bg-white
            border 
            border-gray-300 
            rounded-md 
            pl-3 
            pr-8 
            py-1.5 
            text-sm 
            text-gray-700 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-300 
            cursor-pointer
            w-20
          "
          title="Font Size"
        >
          {fontSizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}px
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Headings Dropdown */}
      <div className="relative">
        <select
          onChange={(e) => changeHeading(e.target.value)}
          className="
            appearance-none
            bg-white
            border 
            border-gray-300 
            rounded-md 
            pl-3 
            pr-8 
            py-1.5 
            text-sm 
            text-gray-700 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-300 
            cursor-pointer
            w-28
          "
          title="Headings"
        >
          {headingOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={option.className}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default FontControlsGroup;
