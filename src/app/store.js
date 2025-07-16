// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../features/pokemonSlice"; // ✅ Adjust path if needed
import flowReducer from "../features/flowSlice";

export default configureStore({
  reducer: {
    pokemon: pokemonReducer, // ✅ key must match: state.pokemon.list
    flow: flowReducer,
  },
});
