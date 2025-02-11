import { useState, useEffect } from "react";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setPokemon(data.results));
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <header className="bg-blue-600 text-white text-center py-6 text-3xl font-extrabold tracking-wide shadow-md">
        Pokédex | Original 151
      </header>

      <div className="max-w-xl mx-auto my-6">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full px-4 py-3 border rounded-lg shadow-sm text-lg focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {filteredPokemon.map((p, index) => (
          <div
            key={p.name}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
              alt={p.name}
              className="w-28 h-28 mx-auto"
            />
            <h2 className="text-xl font-bold mt-4 capitalize text-gray-900 tracking-wide">
              {p.name}
            </h2>
            <p className="text-gray-500 text-md font-medium"># {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
