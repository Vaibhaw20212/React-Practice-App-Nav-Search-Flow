import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";

export default function PokemonList({ pokemonList, selected, toggleSelected }) {
  const location = useLocation();
  const isPlayground = location.pathname === "/playground";

  return (
    <>
      {pokemonList.map((pokemon) => {
        const displayName =
          pokemon.name.charAt(0).toUpperCase() +
          pokemon.name.slice(1).toLowerCase();
        return (
          <Accordion
            key={pokemon.name}
            draggable={isPlayground}
            onDragStart={(e) => {
              if (!isPlayground) return;

              // Set transfer data to be used by React Flow
              e.dataTransfer.setData(
                "application/reactflow",
                JSON.stringify({
                  name: pokemon.name,
                  image: pokemon.sprites.front_default,
                  height: pokemon.height,
                  weight: pokemon.weight,
                  types: pokemon.types.map((t) => t.type.name),
                })
              );
              e.dataTransfer.effectAllowed = "move";
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography>{displayName}</Typography>
                <Checkbox
                  icon={<CloseIcon />}
                  checkedIcon={<CloseIcon />}
                  checked={selected.has(pokemon.name)}
                  onChange={() => toggleSelected(pokemon.name)}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width="100"
              />
              <Typography>
                <strong>Height:</strong> {pokemon.height}
              </Typography>
              <Typography>
                <strong>Weight:</strong> {pokemon.weight}
              </Typography>
              <Typography>
                <strong>Types:</strong>{" "}
                {pokemon.types.map((t) => t.type.name).join(", ")}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
