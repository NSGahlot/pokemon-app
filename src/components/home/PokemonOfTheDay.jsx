import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllPokemons } from "../../store/pokemonSlice";

function getTodayKey() {
  const today = new Date();
  return today.toISOString().slice(0, 10); // YYYY-MM-DD
}

function getRandomPokemon(pokemons) {
  if (!pokemons.length) return null;
  const idx = Math.floor(Math.random() * pokemons.length);
  return pokemons[idx];
}

export default function PokemonOfTheDay() {
  const allPokemons = useSelector(selectAllPokemons);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const key = "pokemonOfTheDay-" + getTodayKey();
    const cached = localStorage.getItem(key);
    if (cached) {
      setPokemon(JSON.parse(cached));
    } else if (allPokemons.length) {
      const random = getRandomPokemon(allPokemons);
      setPokemon(random);
      localStorage.setItem(key, JSON.stringify(random));
    }
  }, [allPokemons]);

  if (!pokemon) return null;

  return (
    <div className="mb-8 p-6 bg-gradient-to-br from-yellow-200 via-yellow-100 to-white rounded-2xl shadow-lg border-2 border-yellow-400/50">
      <div className="flex items-center gap-6">
        <img
          src={
            pokemon.sprites?.other?.["official-artwork"]?.front_default ||
            pokemon.sprites?.front_default
          }
          alt={pokemon.name}
          className="w-28 h-28 object-contain drop-shadow-lg bg-white rounded-full border-2 border-yellow-300"
        />
        <div>
          <h2 className="text-2xl font-bold text-yellow-700 mb-1">
            Pokémon of the Day
          </h2>
          <h3 className="text-xl font-semibold capitalize text-gray-800 mb-2">
            {pokemon.name}
          </h3>
          <div className="text-sm text-gray-700 mb-1">
            <b>ID:</b> {pokemon.id} | <b>Type:</b>{" "}
            {pokemon.types?.map((t) => t.type.name).join(", ")}
          </div>
          <div className="text-sm text-gray-700 mb-1">
            <b>Base Stats:</b>{" "}
            {pokemon.stats
              ?.map((s) => `${s.stat.name}: ${s.base_stat}`)
              .join(", ")}
          </div>
          <div className="text-sm text-gray-700">
            <b>Fun Fact:</b> This Pokémon was randomly selected for{" "}
            {getTodayKey()}!
          </div>
        </div>
      </div>
    </div>
  );
}
