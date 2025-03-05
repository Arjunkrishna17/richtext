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
  Code,
} from "lucide-react";
import TableToolbar from "./Table";
import "prismjs";
import "prismjs/themes/prism.css"; // You can use "prism-tomorrow.css" for dark mode
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
// Add other languages as needed
import Prism from "prismjs";

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

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const insertCodeBlock = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const container = document.createElement("div");
    container.contentEditable = false; // Make the container non-editable

    // Create a new instance of the CodeEditor component
    const codeEditor = document.createElement("div");
    codeEditor.innerHTML = `
    <div
      contentEditable="true"
      spellCheck="false"
      style="
        font-family: monospace;
        background: #1e1e1e;
        color: #d4d4d4;
        padding: 10px;
        min-height: 200px;
        border-radius: 5px;
        outline: none;
        white-space: pre-wrap;
        overflow-wrap: break-word;
      "
    ></div>
  `;

    container.appendChild(codeEditor);
    range.deleteContents();
    range.insertNode(container);

    // Move the cursor inside the new CodeEditor
    const newRange = document.createRange();
    const sel = window.getSelection();
    newRange.setStart(codeEditor, 0);
    newRange.setEnd(codeEditor, 0);
    sel.removeAllRanges();
    sel.addRange(newRange);
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

        // Check if the current selection is inside a code block
        const codeBlock = node.closest("code");
        if (
          codeBlock &&
          codeBlock.parentElement.tagName.toLowerCase() === "pre"
        ) {
          event.preventDefault();
          // Insert a newline in the current code block instead of creating a new block
          document.execCommand("insertText", false, "\n");
          // Re-highlight the code block if needed
          Prism.highlightElement(codeBlock);
          return;
        }

        // Existing behavior for list items
        const listItem = node.closest("li");
        if (!listItem) return;

        event.preventDefault();

        const newListItem = document.createElement("li");
        newListItem.contentEditable = "true";
        const parentList = listItem.closest("ul");
        const isChecklist = parentList?.querySelector("input[type='checkbox']");

        if (isChecklist) {
          newListItem.classList.add("checkbox-item");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.style.marginRight = "8px";
          const textNode = document.createElement("span");
          textNode.contentEditable = "true";
          textNode.style.flex = "1";
          textNode.innerHTML = "&nbsp;";
          newListItem.appendChild(checkbox);
          newListItem.appendChild(textNode);
        } else {
          newListItem.innerHTML = "&nbsp;";
        }

        listItem.parentNode.insertBefore(newListItem, listItem.nextSibling);
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
            const wrapper = document.createElement("div");
            wrapper.contentEditable = false;
            wrapper.style.position = "relative";
            wrapper.style.display = "inline-block";
            wrapper.style.border = "1px solid #ccc";
            wrapper.style.resize = "both";
            wrapper.style.overflow = "hidden";
            wrapper.style.maxWidth = "100%";

            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "100%"; // Allow resizing
            img.style.height = "auto";

            const resizer = document.createElement("div");
            resizer.style.width = "10px";
            resizer.style.height = "10px";
            resizer.style.background = "blue";
            resizer.style.position = "absolute";
            resizer.style.right = "0";
            resizer.style.bottom = "0";
            resizer.style.cursor = "se-resize";

            resizer.addEventListener("mousedown", (e) => {
              e.preventDefault();
              document.addEventListener("mousemove", resizeImage);
              document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", resizeImage);
              });
            });

            function resizeImage(e) {
              const rect = wrapper.getBoundingClientRect();
              wrapper.style.width = e.clientX - rect.left + "px";
              wrapper.style.height = e.clientY - rect.top + "px";
            }

            wrapper.appendChild(img);
            wrapper.appendChild(resizer);

            // Insert the wrapper at the cursor position
            insertNodeAtCursor(wrapper);
          };

          reader.readAsDataURL(file);
        }
      }
    };

    const insertNodeAtCursor = (node) => {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(node);

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
        <TableToolbar editorRef={editorRef} />
        <button
          onClick={insertImage}
          className="toolbar-btn"
          title="Insert Image"
        >
          <Image size={16} />
        </button>
        <button onClick={insertCodeBlock} title="Insert Code Block">
          <Code size={16} /> {/* Import from Lucide */}
        </button>
      </ToolbarGroup>
    </div>
  );
};

export default Toolbar;
