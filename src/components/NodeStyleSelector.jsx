// src/components/NodeStyleSelector.jsx
import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Box, Typography } from "@mui/material";

export default function NodeStyleSelector({ shape, setShape }) {
  const handleChange = (event) => {
    setShape(event.target.value);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Choose Node Shape
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="shape-select-label">Shape</InputLabel>
        <Select
          labelId="shape-select-label"
          id="shape-select"
          value={shape}
          label="Shape"
          onChange={handleChange}
        >
          <MenuItem value="rectangle">Rectangle</MenuItem>
          <MenuItem value="ellipse">Ellipse</MenuItem>
          <MenuItem value="diamond">Diamond</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
