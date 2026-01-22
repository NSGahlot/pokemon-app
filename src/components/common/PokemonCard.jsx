import toUpperCase from "../../utils/upperCaseName";
import { getPokemonColor } from "../../utils/pokemonColors";

export default function PokemonCard({ pokemons, showModal }) {
  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-3xl mb-4">🔍</p>
        <p className="text-gray-300 text-xl font-semibold">
          No Pokémon found matching your criteria.
        </p>
        <p className="text-gray-500 mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          className="group relative rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-110 hover:-translate-y-2 border-3 border-yellow-400/30 hover:border-yellow-400 overflow-hidden backdrop-blur-sm"
          style={{ backgroundColor: getPokemonColor(pokemon) }}
          onClick={() => showModal(pokemon.id, pokemon.name)}
        >
          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-t from-yellow-400 to-transparent" />

          {/* Image */}
          <div className="relative p-4 flex items-center justify-center min-h-[140px] bg-gradient-to-b from-white/10 to-black/20">
            {pokemon?.sprites?.other?.dream_world?.front_default ||
            pokemon?.sprites?.front_default ? (
              <img
                src={
                  pokemon.sprites.other?.dream_world?.front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                className="object-contain w-24 h-24 sm:w-28 sm:h-28 group-hover:scale-125 transition-transform duration-300 drop-shadow-lg"
              />
            ) : (
              <div className="text-gray-400">No Image</div>
            )}
          </div>

          {/* Name + ID */}
          <div className="relative px-4 pb-3 text-center bg-gradient-to-t from-black/60 to-transparent">
            <h3 className="text-base font-bold text-yellow-300 mb-2 truncate">
              {toUpperCase(pokemon.name)}
            </h3>
            <span className="text-sm font-bold text-yellow-400 bg-black/50 px-3 py-1 rounded-full inline-block border border-yellow-400/50">
              {pokemon.id.toString().padStart(3, "0")}
            </span>
          </div>

          {/* Types – contrast safe */}
          {pokemon.types?.length > 0 && (
            <div className="relative px-4 pt-3 pb-4 flex flex-col gap-2 items-center">
              {pokemon.types.slice(0, 2).map((typeInfo, index) => (
                <span
                  key={index}
                  className="px-4 py-1 text-sm font-semibold 
                  bg-white/80 text-gray-900 
                  rounded-full 
                  border border-white/60 
                  backdrop-blur-sm 
                  shadow-sm"
                >
                  {toUpperCase(typeInfo.type.name)}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
