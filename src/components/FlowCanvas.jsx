import React, { useRef, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import { setNodes as setNodesRedux, setEdges as setEdgesRedux } from "../features/flowSlice";

import { useDnD } from "../context/DnDContext";

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function FlowCanvas() {
  const dispatch = useDispatch();
  const savedNodes = useSelector((state) => state.flow.nodes);
  const savedEdges = useSelector((state) => state.flow.edges);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(savedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let newNode;

      if (type === "pokemon") {
        const pokemonData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );

        newNode = {
          id: getId(),
          type: "default", // You can customize later to custom type
          position,
          data: {
            label: (
              <div style={{ textAlign: "center" }}>
                <img
                  src={pokemonData.image || pokemonData.sprites?.front_default}
                  alt={pokemonData.name}
                  width={40}
                />
                <div>{pokemonData.name}</div>
              </div>
            ),
          },
        };
      } else {
        // fallback for other types like input/output/default
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  // Persist nodes/edges to Redux on change
  React.useEffect(() => {
    dispatch(setNodesRedux(nodes));
  }, [nodes, dispatch]);
  React.useEffect(() => {
    dispatch(setEdgesRedux(edges));
  }, [edges, dispatch]);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
