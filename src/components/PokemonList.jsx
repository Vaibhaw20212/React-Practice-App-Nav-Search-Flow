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

export default function PokemonList({ pokemonList, selected, toggleSelected }) {
  return (
    <>
      {pokemonList.map((pokemon) => (
        <Accordion key={pokemon.name}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography>{pokemon.name.toUpperCase()}</Typography>
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
      ))}
    </>
  );
}
