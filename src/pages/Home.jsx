import React from "react";
import { Container, Typography } from "@mui/material";
import PokemonSearch from "../components/Searchbar";

export default function Home1() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pokémon Search
      </Typography>
      <PokemonSearch />
    </Container>
  );
}
