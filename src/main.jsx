import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PokemonList from "./pokeVerse.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PokemonList />
  </StrictMode>
);
