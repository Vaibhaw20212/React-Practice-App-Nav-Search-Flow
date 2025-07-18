// src/features/pokemonSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // ✅ Make sure `list` exists in the initial state
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addPokemon: (state, action) => {
      const alreadyExists = state.list.some((p) => p.name === action.payload.name);
      if (!alreadyExists) {
        state.list.push(action.payload);
        console.log("Added Pokémon:", action.payload.name);
      }
    },
    removeSelected: (state, action) => {
      const namesToRemove = action.payload;
      state.list = state.list.filter((p) => !namesToRemove.includes(p.name));
    },
  },
});

export const { addPokemon, removeSelected } = pokemonSlice.actions;
export default pokemonSlice.reducer;
