import React, { useEffect, useState } from "react";

import * as pdfjsLib from "pdfjs-dist";
// Explicitly set the worker source using a relative path
import pdfWorker from "pdfjs-dist/build/pdf.worker?worker";

import TextFormattingGroup from "./Tools/TextFormattingGroup";
import FontControlsGroup from "./Tools/FontControlsGroup";
import ColorControlsGroup from "./Tools/ColorControlsGroup";
import ParagraphFormattingGroup from "./Tools/ParagraphFormattingGroup";
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

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

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

  const renderPDFPreview = async (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const pdfData = new Uint8Array(reader.result);
          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
          const canvas = document.createElement("canvas");

          const page = await pdf.getPage(1); // Render only the first page
          const viewport = page.getViewport({ scale: 1.5 });
          const context = canvas.getContext("2d");

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;

          resolve(canvas);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const insertAttachment = async (files) => {
    if (!files || files.length === 0) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);

    const attachmentContainer = document.createElement("div");
    attachmentContainer.style.display = "flex";
    attachmentContainer.style.flexDirection = "column";
    attachmentContainer.style.margin = "10px 0";
    attachmentContainer.style.border = "1px solid #ddd";
    attachmentContainer.style.padding = "10px";
    attachmentContainer.style.borderRadius = "5px";
    attachmentContainer.style.background = "#f9f9f9";

    for (const file of files) {
      const fileType = file.type.split("/")[0];
      let element;

      if (fileType === "image") {
        element = document.createElement("img");
        element.src = URL.createObjectURL(file);
        element.style.maxWidth = "100%";
        element.style.borderRadius = "5px";
        element.style.marginBottom = "10px";
      } else if (fileType === "video") {
        element = document.createElement("video");
        element.src = URL.createObjectURL(file);
        element.controls = true;
        element.style.maxWidth = "100%";
        element.style.marginBottom = "10px";
      } else if (fileType === "audio") {
        element = document.createElement("audio");
        element.src = URL.createObjectURL(file);
        element.controls = true;
        element.style.marginBottom = "10px";
      } else if (file.type === "application/pdf") {
        element = await renderPDFPreview(file);
      } else {
        element = document.createElement("div");
        element.style.display = "flex";
        element.style.alignItems = "center";
        element.style.marginBottom = "5px";

        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.textContent = `📎 ${file.name}`;
        link.target = "_blank";
        link.style.color = "#007bff";
        link.style.textDecoration = "none";
        link.style.marginLeft = "5px";

        element.appendChild(link);
      }

      attachmentContainer.appendChild(element);
    }

    range.insertNode(attachmentContainer);
    range.insertNode(document.createElement("br"));

    selection.removeAllRanges();
  };

  return (
    <div className="toolbar flex flex-wrap gap-1 p-2 bg-gray-50 rounded-t-lg border border-gray-200">
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
      <ColorControlsGroup
        textColor={textColor}
        changeTextColor={changeTextColor}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
        highlightColor={highlightColor}
        setHighlightColor={setHighlightColor}
      />
      <ParagraphFormattingGroup
        alignText={alignText}
        indentText={indentText}
        outdentText={outdentText}
      />
      <HeadingsGroup changeHeading={changeHeading} />
      <ContentInsertionGroup
        insertList={insertList}
        insertCheckboxList={insertCheckboxList}
        editorRef={editorRef}
        insertImage={insertImage}
        insertCodeBlock={insertCodeBlock}
        insertAttachment={insertAttachment}
      />
    </div>
  );
};

export default Toolbar;
