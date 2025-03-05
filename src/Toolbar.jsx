import React, { useEffect, useState } from "react";
import katex from "katex";

import TextFormattingGroup from "./Tools/TextFormattingGroup";
import FontControlsGroup from "./Tools/FontControlsGroup";
import ColorControlsGroup from "./Tools/ColorControlsGroup";
import MoreTools from "./Tools/ParagraphFormattingGroup";
import HeadingsGroup from "./Tools/HeadingGroup";
import ContentInsertionGroup from "./Tools/ContentInsertGroup";
import "prismjs";
import "prismjs/themes/prism.css";

// ✅ Required for languages like Java, C, and PHP
import "prismjs/components/prism-clike";

// ✅ Import languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-java"; // Clike required
import "prismjs/components/prism-c"; // Clike required
import "prismjs/components/prism-cpp"; // Clike required
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-lua";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-matlab";

import Prism from "prismjs";
import ListTools from "./Tools/MostUsedTools";

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

  const insertImage = () => {
    const url = prompt("Enter the image URL:", "");
    if (url) {
      const img = document.createElement("img");
      img.src = url;
      img.style.maxWidth = "100%";
      execCommand("insertHTML", img.outerHTML);
    }
  };
  const insertCodeBlock = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.marginBottom = "10px";

    const select = document.createElement("select");
    const languages = [
      "javascript",
      "python",
      "css",
      "html",
      "java",
      "c",
      "cpp",
    ];
    select.style.marginBottom = "5px";
    select.style.padding = "5px";
    select.style.borderRadius = "4px";
    select.style.border = "1px solid #ccc";
    select.style.cursor = "pointer";
    select.style.fontSize = "14px";

    languages.forEach((lang) => {
      const option = document.createElement("option");
      option.value = lang;
      option.textContent = lang.toUpperCase();
      select.appendChild(option);
    });

    const pre = document.createElement("pre");
    pre.style.backgroundColor = "#f5f5f5";
    pre.style.padding = "10px";
    pre.style.borderRadius = "5px";
    pre.style.overflowX = "auto"; // Enable horizontal scrolling if needed
    pre.style.display = "block";
    pre.style.whiteSpace = "pre-wrap"; // Ensure text wrapping
    pre.style.wordBreak = "break-word"; // Prevent long words from overflowing

    const code = document.createElement("code");
    code.contentEditable = "true";
    code.style.display = "block";
    code.style.outline = "none";
    code.style.border = "none";
    code.style.padding = "8px";
    code.style.width = "100%";
    code.style.whiteSpace = "pre-wrap"; // Reapply wrapping after highlight
    code.style.wordBreak = "break-word"; // Prevent overflow

    let currentLanguage = "javascript";
    pre.className = `language-${currentLanguage}`;
    code.className = `language-${currentLanguage}`;
    code.textContent = "console.log('Hello, World!');";

    pre.appendChild(code);

    select.addEventListener("change", (event) => {
      const newLang = event.target.value;
      pre.className = `language-${newLang}`;
      code.className = `language-${newLang}`;
      Prism.highlightElement(code);

      // Reapply wrapping after highlighting
      setTimeout(() => {
        pre.style.whiteSpace = "pre-wrap";
        pre.style.wordBreak = "break-word";
        code.style.whiteSpace = "pre-wrap";
        code.style.wordBreak = "break-word";
      }, 0); // Timeout ensures styles apply after Prism modifies the code
    });

    wrapper.appendChild(select);
    wrapper.appendChild(pre);

    range.deleteContents();
    range.insertNode(wrapper);

    Prism.highlightElement(code);

    // Ensure wrapping after first highlight
    setTimeout(() => {
      pre.style.whiteSpace = "pre-wrap";
      pre.style.wordBreak = "break-word";
      code.style.whiteSpace = "pre-wrap";
      code.style.wordBreak = "break-word";
    }, 0);

    const p = document.createElement("p");
    p.innerHTML = "<br>";
    wrapper.insertAdjacentElement("afterend", p);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(code);
    newRange.collapse(false);
    selection.addRange(newRange);
  };

  const insertLink = () => {
    const url = prompt("Enter the link URL:", "https://");
    if (!url) return;

    const text = prompt("Enter the display text:", "Click here");
    if (!text) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.textContent = text;
    anchor.target = "_blank";
    anchor.style.color = "#007bff";
    anchor.style.textDecoration = "underline";

    range.deleteContents();
    range.insertNode(anchor);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(anchor);
    newRange.collapse(false);
    selection.addRange(newRange);
  };

  const insertDivider = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const hr = document.createElement("hr");
    hr.style.border = "none";
    hr.style.height = "1px";
    hr.style.backgroundColor = "#ccc";
    hr.style.margin = "10px 0";

    range.deleteContents();
    range.insertNode(hr);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(hr);
    selection.addRange(newRange);
  };

  const insertQuote = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const blockquote = document.createElement("blockquote");
    blockquote.contentEditable = "true";
    blockquote.style.borderLeft = "4px solid #007bff";
    blockquote.style.margin = "10px 0";
    blockquote.style.padding = "5px 10px";
    blockquote.style.color = "#555";
    blockquote.innerHTML = selection.toString() || "Enter quote here...";

    range.deleteContents();
    range.insertNode(blockquote);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(blockquote);
    newRange.collapse(false);
    selection.addRange(newRange);
  };

  const insertFormula = () => {
    const formula = prompt("Enter LaTeX formula:", "\\frac{a}{b}");
    if (!formula) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontFamily = "monospace";
    span.style.backgroundColor = "#f5f5f5";
    span.style.padding = "5px";
    span.style.borderRadius = "5px";

    // Render the LaTeX formula with KaTeX
    try {
      katex.render(formula, span, {
        throwOnError: false, // Prevent breaking on syntax errors
      });
    } catch (error) {
      console.error("KaTeX rendering error:", error);
      span.textContent = `Error rendering formula: ${formula}`;
    }

    range.deleteContents();
    range.insertNode(span);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    newRange.collapse(false);
    selection.addRange(newRange);
  };

  const insertAttachment = async (files) => {
    if (!files || files.length === 0) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);

    const attachmentContainer = document.createElement("div");
    Object.assign(attachmentContainer.style, {
      display: "flex",
      flexDirection: "column",
      margin: "10px 0",
      border: "1px solid #ddd",
      padding: "10px",
      borderRadius: "5px",
      background: "#f9f9f9",
      position: "relative",
    });

    for (const file of files) {
      const fileType = file.type.split("/")[0];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const fileURL = URL.createObjectURL(file);
      let element;

      if (fileType === "image") {
        // Handle image files
        element = document.createElement("img");
        Object.assign(element, {
          src: fileURL,
          style: "max-width: 100%; border-radius: 5px; margin-bottom: 10px;",
        });
      } else if (fileType === "video") {
        // Handle video files
        element = document.createElement("video");
        Object.assign(element, {
          src: fileURL,
          controls: true,
          style: "max-width: 100%; margin-bottom: 10px;",
        });
      } else if (fileType === "audio") {
        // Handle audio files
        element = document.createElement("audio");
        Object.assign(element, {
          src: fileURL,
          controls: true,
          style: "margin-bottom: 10px;",
        });
      } else {
        // Handle DOC, DOCX, XLS, XLSX, and other file types
        element = document.createElement("div");
        Object.assign(element.style, {
          display: "flex",
          alignItems: "center",
          marginBottom: "5px",
        });

        const link = document.createElement("a");
        Object.assign(link, {
          href: fileURL,
          target: "_blank",
          download: file.name,
          style:
            "color: #007bff; text-decoration: none; margin-left: 5px; cursor: pointer;",
        });

        // Set appropriate icons for file types
        if (["doc", "docx"].includes(fileExtension)) {
          link.innerHTML = `📄 Word Document: ${file.name}`;
        } else if (["xls", "xlsx"].includes(fileExtension)) {
          link.innerHTML = `📊 Excel Spreadsheet: ${file.name}`;
        } else {
          link.innerHTML = `📎 ${file.name}`;
        }

        element.appendChild(link);
      }

      // Add a "Remove" button
      const removeButton = document.createElement("button");
      removeButton.textContent = "❌";
      Object.assign(removeButton.style, {
        position: "absolute",
        top: "5px",
        right: "5px",
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        padding: "2px 6px",
      });

      removeButton.onclick = () => {
        attachmentContainer.remove();
      };

      attachmentContainer.appendChild(element);
      attachmentContainer.appendChild(removeButton);
    }

    // Add an empty paragraph (to move the cursor below the attachment)
    const emptyParagraph = document.createElement("p");
    emptyParagraph.innerHTML = "<br>"; // Ensures there is space to move cursor down

    // Insert elements into the editor
    range.collapse(false); // Move cursor to the end
    range.insertNode(emptyParagraph);
    range.insertNode(attachmentContainer);

    // Move the cursor **after** the attachment
    range.setStartAfter(emptyParagraph);
    range.setEndAfter(emptyParagraph);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <div className="toolbar flex flex-wrap gap-2 p-2 bg-gray-50 rounded-t-lg border border-gray-200">
      <TextFormattingGroup
        isBold={isBold}
        toggleBold={toggleBold}
        isItalic={isItalic}
        toggleItalic={toggleItalic}
        isUnderline={isUnderline}
        toggleUnderline={toggleUnderline}
        isHighlighted={isHighlighted}
        toggleHighlight={toggleHighlight}
      />

      <FontControlsGroup
        fontFamily={fontFamily}
        changeFontFamily={changeFontFamily}
        fontSize={fontSize}
        changeFontSize={changeFontSize}
      />

      <ListTools insertList={insertList} />
      <ColorControlsGroup
        textColor={textColor}
        changeTextColor={changeTextColor}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
        highlightColor={highlightColor}
        setHighlightColor={setHighlightColor}
      />

      <ContentInsertionGroup
        insertList={insertList}
        insertCheckboxList={insertCheckboxList}
        editorRef={editorRef}
        insertImage={insertImage}
        insertCodeBlock={insertCodeBlock}
        insertAttachment={insertAttachment}
        insertLink={insertLink}
        insertDivider={insertDivider}
        insertQuote={insertQuote}
        insertFormula={insertFormula}
      />

      <MoreTools
        alignText={alignText}
        indentText={indentText}
        outdentText={outdentText}
      />
    </div>
  );
};

export default Toolbar;
