import React from "react";
import { Handle } from "react-flow-renderer";
import { Box, Typography } from "@mui/material";

export default function FlowPokemonNode({ data }) {
  return (
    <Box
      sx={{
        padding: 1,
        borderRadius: 2,
        border: "1px solid #ccc",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        minWidth: 100,
      }}
    >
      <img src={data.image} alt={data.name} width={50} />
      <Typography variant="body2">{data.name}</Typography>
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
    </Box>
  );
}
