// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../features/pokemonSlice"; // ✅ Adjust path if needed

export default configureStore({
  reducer: {
    pokemon: pokemonReducer, // ✅ key must match: state.pokemon.list
  },
});
