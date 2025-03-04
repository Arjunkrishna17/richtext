import React from "react";
import { Plus, Minus } from "lucide-react";

const TableControls = ({ table }) => {
  const tableRect = table.getBoundingClientRect();

  const addRow = () => {
    const row = document.createElement("tr");
    for (let i = 0; i < table.rows[0].cells.length; i++) {
      const cell = document.createElement("td");
      cell.innerHTML = "&nbsp;";
      row.appendChild(cell);
    }
    table.appendChild(row);
  };

  const deleteRow = () => {
    if (table.rows.length > 1) {
      table.deleteRow(table.rows.length - 1);
    }
  };

  const addColumn = () => {
    for (let i = 0; i < table.rows.length; i++) {
      const cell = document.createElement("td");
      cell.innerHTML = "&nbsp;";
      table.rows[i].appendChild(cell);
    }
  };

  const deleteColumn = () => {
    if (table.rows[0].cells.length > 1) {
      for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].deleteCell(table.rows[i].cells.length - 1);
      }
    }
  };

  return (
    <div
      className="table-controls"
      style={{
        position: "absolute",
        top: tableRect.top + window.scrollY,
        left: tableRect.right + window.scrollX - 120,
        display: "flex",
        gap: "4px",
        backgroundColor: "white",
        padding: "4px",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <button onClick={addRow} className="toolbar-btn" title="Add Row">
        <Plus size={16} />
      </button>
      <button onClick={deleteRow} className="toolbar-btn" title="Delete Row">
        <Minus size={16} />
      </button>
      <button onClick={addColumn} className="toolbar-btn" title="Add Column">
        <Plus size={16} />
      </button>
      <button
        onClick={deleteColumn}
        className="toolbar-btn"
        title="Delete Column"
      >
        <Minus size={16} />
      </button>
    </div>
  );
};

export default TableControls;
