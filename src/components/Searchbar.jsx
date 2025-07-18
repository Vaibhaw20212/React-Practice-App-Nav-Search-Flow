import React, { useState, useEffect } from "react";

import PokemonList from "./PokemonList"; // adjust path if needed
import { POKEMON_NAMES } from "./pokemonNames";

import {
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Box,
  Checkbox,
  IconButton,
  Autocomplete
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { addPokemon, removeSelected } from "../features/pokemonSlice";

export default function PokemonSearch() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemon.list); // get from Redux

  // Fetch from API when query updates
  useEffect(() => {
    if (!query) return;

    const fetchPokemon = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        if (!res.ok) throw new Error("Pokémon not found");

        const data = await res.json();

        // Dispatch to Redux
        dispatch(addPokemon(data));
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
        setQuery("");
      }
    };

    fetchPokemon();
  }, [query, dispatch]);

  const handleSearch = () => {
    if (!input) return;
    setQuery(input);
    setInput("");
  };

  const toggleSelected = (name) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      copy.has(name) ? copy.delete(name) : copy.add(name);
      return copy;
    });
  };

  // ✅ This is the Redux-connected version of your remove function
  const handleRemoveSelected = () => {
    dispatch(removeSelected([...selected])); // send array of names
    setSelected(new Set()); // clear local selection state
    console.log("Removed selected Pokémon:", [...selected]);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* Search Input */}
      <Box display="flex" gap={2} mb={3}>
        <Autocomplete
          freeSolo
          options={POKEMON_NAMES}
          inputValue={input}
          onInputChange={(_, newInput) => setInput(newInput)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Pokémon"
              variant="outlined"
            />
          )}
          sx={{ width: 250, mr: 2 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

        <PokemonList
            pokemonList={pokemonList}
            selected={selected}
            toggleSelected={toggleSelected}
        />


      {selected.size > 0 && (
        <Box mt={2}>
          <Button variant="outlined" color="error" onClick={handleRemoveSelected}>
            Remove Selected
          </Button>
        </Box>
      )}
    </Box>
  );
}
