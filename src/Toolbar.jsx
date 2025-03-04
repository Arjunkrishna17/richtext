import React, { useEffect, useState } from "react";
import ToolbarGroup from "./ToolBarGroup";
import ColorPicker from "./ColorPicker";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  CheckSquare,
  Table,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronRight,
  ChevronLeft,
  Type,
  Palette,
  Droplet,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

const Toolbar = ({ editorRef }) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [highlightColor, setHighlightColor] = useState("#ffff00");
  const [textColor, setTextColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const toggleBold = () => {
    execCommand("bold");
    setIsBold(!isBold);
  };

  const toggleItalic = () => {
    execCommand("italic");
    setIsItalic(!isItalic);
  };

  const toggleUnderline = () => {
    execCommand("underline");
    setIsUnderline(!isUnderline);
  };

  const toggleHighlight = () => {
    if (isHighlighted) {
      execCommand("hiliteColor", "transparent");
    } else {
      execCommand("hiliteColor", highlightColor);
    }
    setIsHighlighted(!isHighlighted);
  };

  const changeFontSize = (size) => {
    document.execCommand("removeFormat"); // Remove existing font size formats

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement("span");
    span.style.fontSize = size;

    // Extract selected text and apply styling
    span.appendChild(range.extractContents());
    range.insertNode(span);

    // Move selection back inside the new span
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.addRange(newRange);

    setFontSize(size);
  };

  const changeFontFamily = (family) => {
    execCommand("fontName", family);
    setFontFamily(family);
  };

  const changeTextColor = (color) => {
    setTextColor(color.hex);
    execCommand("foreColor", color.hex);
    setShowColorPicker(false);
  };

  const changeHeading = (level) => {
    execCommand("formatBlock", `<h${level}>`);
  };

  const alignText = (alignment) => {
    execCommand("justify" + alignment);
  };

  const indentText = () => {
    execCommand("indent");
  };

  const outdentText = () => {
    execCommand("outdent");
  };

  const insertList = (type) => {
    execCommand(
      "insert" + (type === "ordered" ? "OrderedList" : "UnorderedList")
    );
  };
  const insertCheckboxList = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const list = document.createElement("ul");
    list.classList.add("checkbox-list");

    const listItem = document.createElement("li");
    listItem.contentEditable = "true";
    listItem.classList.add("checkbox-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginRight = "8px";

    const textNode = document.createElement("span");
    textNode.contentEditable = "true";
    textNode.style.flex = "1";
    textNode.innerHTML = "&nbsp;";

    listItem.appendChild(checkbox);
    listItem.appendChild(textNode);
    list.appendChild(listItem);

    range.deleteContents();
    range.insertNode(list);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(textNode);
    newRange.collapse(false);
    selection.addRange(newRange);
  };

  useEffect(() => {
    const handleEnterPress = (event) => {
      if (event.key === "Enter") {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        let node = selection.anchorNode;
        if (!node) return;

        if (node.nodeType === Node.TEXT_NODE) {
          node = node.parentElement;
        }

        const listItem = node.closest("li");
        if (!listItem) return;

        const parentList = listItem.closest("ul");

        event.preventDefault(); // Prevent default Enter behavior

        const newListItem = document.createElement("li");
        newListItem.contentEditable = "true";

        // Check if the current list is a checklist (contains checkboxes)
        const isChecklist = parentList?.querySelector("input[type='checkbox']");

        if (isChecklist) {
          newListItem.classList.add("checkbox-item");

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.style.marginRight = "8px";

          const textNode = document.createElement("span");
          textNode.contentEditable = "true";
          textNode.style.flex = "1";
          textNode.innerHTML = "&nbsp;"; // Empty space for user to type

          newListItem.appendChild(checkbox);
          newListItem.appendChild(textNode);
        } else {
          newListItem.innerHTML = "&nbsp;"; // Standard list item
        }

        listItem.parentNode.insertBefore(newListItem, listItem.nextSibling);

        // Move cursor inside the new list item
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(newListItem);
        newRange.collapse(false);
        selection.addRange(newRange);
      }
    };

    document.addEventListener("keydown", handleEnterPress);

    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, []);

  useEffect(() => {
    const handlePaste = (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const items = clipboardData.items;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          event.preventDefault(); // Prevent default paste behavior

          const file = items[i].getAsFile();
          const reader = new FileReader();

          reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.maxWidth = "100%"; // Prevent overflow
            img.style.margin = "10px 0";

            // Insert the image at the cursor position
            insertNodeAtCursor(img);
          };

          reader.readAsDataURL(file);
        }
      }
    };

    const insertNodeAtCursor = (node) => {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      range.deleteContents(); // Remove any existing selection
      range.insertNode(node);

      // Move cursor after the image
      range.setStartAfter(node);
      range.setEndAfter(node);
      selection.removeAllRanges();
      selection.addRange(range);
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  const insertTable = () => {
    const table = document.createElement("table");
    table.setAttribute("border", "1");
    table.classList.add("editor-table");
    for (let i = 0; i < 2; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 2; j++) {
        const cell = document.createElement("td");
        cell.innerHTML = "&nbsp;";
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    execCommand("insertHTML", table.outerHTML);
  };

  const insertImage = () => {
    const url = prompt("Enter the image URL:", "");
    if (url) {
      const img = document.createElement("img");
      img.src = url;
      img.style.maxWidth = "100%";
      execCommand("insertHTML", img.outerHTML);
    }
  };

  return (
    <div className="toolbar flex flex-wrap gap-1 p-2 bg-gray-50 rounded-t-lg border border-gray-200">
      {/* Text Formatting Group */}
      <ToolbarGroup>
        <button
          onClick={toggleBold}
          className={`toolbar-btn ${isBold ? "bg-blue-100 text-blue-600" : ""}`}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={toggleItalic}
          className={`toolbar-btn ${
            isItalic ? "bg-blue-100 text-blue-600" : ""
          }`}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          onClick={toggleUnderline}
          className={`toolbar-btn ${
            isUnderline ? "bg-blue-100 text-blue-600" : ""
          }`}
          title="Underline"
        >
          <Underline size={16} />
        </button>
        <button
          onClick={toggleHighlight}
          className={`toolbar-btn ${
            isHighlighted ? "bg-blue-100 text-blue-600" : ""
          }`}
          title="Highlight"
        >
          <Droplet size={16} />
        </button>
      </ToolbarGroup>

      {/* Font Controls Group */}
      <ToolbarGroup>
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
      </ToolbarGroup>

      {/* Color Controls Group */}
      <ToolbarGroup>
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
      </ToolbarGroup>

      {/* Paragraph Formatting Group */}
      <ToolbarGroup>
        <button
          onClick={() => alignText("Left")}
          className="toolbar-btn"
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => alignText("Center")}
          className="toolbar-btn"
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => alignText("Right")}
          className="toolbar-btn"
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
        <button onClick={indentText} className="toolbar-btn" title="Indent">
          <ChevronRight size={16} />
        </button>
        <button onClick={outdentText} className="toolbar-btn" title="Outdent">
          <ChevronLeft size={16} />
        </button>
      </ToolbarGroup>

      {/* Headings Group */}
      <ToolbarGroup>
        <select
          onChange={(e) => changeHeading(e.target.value)}
          className="toolbar-select"
          title="Headings"
        >
          <option value="">Normal Text</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>
      </ToolbarGroup>

      {/* Content Insertion Group */}
      <ToolbarGroup>
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
        <button
          onClick={insertTable}
          className="toolbar-btn"
          title="Insert Table"
        >
          <Table size={16} />
        </button>
        <button
          onClick={insertImage}
          className="toolbar-btn"
          title="Insert Image"
        >
          <Image size={16} />
        </button>
      </ToolbarGroup>
    </div>
  );
};

export default Toolbar;
