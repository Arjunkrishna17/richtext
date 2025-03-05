import React, { useRef, useState } from "react";
import {
  List,
  ListOrdered,
  CheckSquare,
  Image,
  Code,
  Paperclip,
  Link,
  Minus,
  Quote,
  Sigma,
  Plus,
} from "lucide-react";

const ContentInsertionGroup = ({
  insertList,
  insertCheckboxList,
  editorRef,
  insertImage,
  insertCodeBlock,
  insertAttachment,
  insertLink,
  insertDivider,
  insertQuote,
  insertFormula,
}) => {
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileSelect = (event) => {
    insertAttachment(event.target.files);
  };

  // Dropdown item configuration with colors and descriptions
  const dropdownItems = [
    {
      icon: CheckSquare,
      color: "text-green-500",
      label: "Checkbox List",
      onClick: insertCheckboxList,
      description: "Create a list with checkboxes",
    },
    {
      icon: Image,
      color: "text-blue-500",
      label: "Insert Image",
      onClick: insertImage,
      description: "Upload or embed an image",
    },
    {
      icon: Code,
      color: "text-purple-500",
      label: "Insert Code Block",
      onClick: insertCodeBlock,
      description: "Add a code snippet",
    },
    {
      icon: Paperclip,
      color: "text-orange-500",
      label: "Attach File",
      onClick: () => fileInputRef.current.click(),
      description: "Attach files to your document",
    },
    {
      icon: Link,
      color: "text-indigo-500",
      label: "Insert Link",
      onClick: insertLink,
      description: "Add a hyperlink",
    },
    {
      icon: Minus,
      color: "text-gray-500",
      label: "Insert Divider",
      onClick: insertDivider,
      description: "Add a horizontal line",
    },
    {
      icon: Quote,
      color: "text-teal-500",
      label: "Insert Quote",
      onClick: insertQuote,
      description: "Add a quotation",
    },
    {
      icon: Sigma,
      color: "text-red-500",
      label: "Insert Formula",
      onClick: insertFormula,
      description: "Add a mathematical formula",
    },
  ];

  return (
    <div className="relative inline-block">
      {/* Dropdown Button with subtle hover effect */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        <span className="font-medium text-gray-700">Block </span>
      </button>

      {/* Dropdown Menu with improved styling */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
          {dropdownItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center p-3 hover:bg-gray-50 transition-colors duration-150 group"
            >
              <item.icon
                size={20}
                className={`${item.color} mr-3 group-hover:scale-110 transition-transform`}
              />
              <div className="text-left">
                <div className="font-semibold text-gray-800">{item.label}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        multiple
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ContentInsertionGroup;
