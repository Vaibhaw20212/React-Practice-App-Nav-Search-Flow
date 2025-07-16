import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import FlowCanvas from "../components/FlowCanvas";
import { DnDProvider } from "../context/DnDContext";
import { ReactFlowProvider } from "@xyflow/react";

export default function Playground() {
  return (
    <DnDProvider>
      <ReactFlowProvider>
        <Box display="flex" height="100vh">
          <Box sx={{ width: 250, p: 2, borderRight: "1px solid #ccc" }}>
            <Sidebar />
          </Box>
          <Box flex={1}>
            <FlowCanvas />
          </Box>
        </Box>
      </ReactFlowProvider>
    </DnDProvider>
  );
}
