import React from "react";
import { useDnD } from "../context/DnDContext";

export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{ padding: 10 }}>
      <div>Drag a node:</div>
      <div
        className="dndnode input"
        draggable
        onDragStart={(event) => onDragStart(event, "input")}
      >
        Input Node
      </div>
      <div
        className="dndnode"
        draggable
        onDragStart={(event) => onDragStart(event, "default")}
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        draggable
        onDragStart={(event) => onDragStart(event, "output")}
      >
        Output Node
      </div>
    </aside>
  );
}
