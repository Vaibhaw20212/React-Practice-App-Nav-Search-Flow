import React from "react";
import { useDnD } from "../context/DnDContext";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@mui/material";


export default function Sidebar() {
  const [_, setType] = useDnD();
  const pokemonList = useSelector((state) => state.pokemon.list);

  const onDragStart = (event, pokemon) => {
    setType("pokemon");
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({
        name: pokemon.name,
        image: pokemon.sprites?.front_default,
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.types?.map((t) => t.type.name),
      })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{ padding: 10 }}>
      <div>Drag a Pokémon:</div>
      {pokemonList && pokemonList.length > 0 ? (
        pokemonList.map((pokemon) => (
          <Paper
            key={pokemon.name}
            className="dndnode"
            draggable
            elevation={3}
            onDragStart={(event) => onDragStart(event, pokemon)}
            sx={{
              mb: 1,
              p: 1.5,
              cursor: "grab",
              display: "flex",
              alignItems: "center",
              bgcolor: "#f5f5f5",
              '&:hover': { bgcolor: '#e0e0e0' },
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} sx={{ flex: 1 }}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Typography>
          </Paper>
        ))
      ) : (
        <div style={{ color: '#888', fontStyle: 'italic' }}>No Pokémon available. Use the search to add some!</div>
      )}
    </aside>
  );
}
