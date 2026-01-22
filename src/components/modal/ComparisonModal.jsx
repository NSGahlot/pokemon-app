import { useSelector, useDispatch } from "react-redux";
import {
  selectComparisonPokemons,
  removeComparisonPokemon,
  clearComparison,
  selectAllPokemons,
} from "../../store/pokemonSlice";
import { getPokemonColor } from "../../utils/pokemonColors";
import toUpperCase from "../../utils/upperCaseName";

export default function ComparisonModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const comparisonPokemons = useSelector(selectComparisonPokemons);
  const allPokemons = useSelector(selectAllPokemons);

  if (!isOpen || comparisonPokemons.length === 0) return null;

  const pokemons = comparisonPokemons
    .map((p) => (p.sprites ? p : allPokemons.find((x) => x.id === p.id)))
    .filter(Boolean);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 z-50 bg-white rounded-2xl shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-5 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            Pokemon Comparison ({pokemons.length}/3)
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(clearComparison())}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white text-purple-600 rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="rounded-xl overflow-hidden border border-gray-200 shadow hover:shadow-xl transition"
              >
                {/* Card Header */}
                <div
                  className="p-4 text-white flex justify-between items-center"
                  style={{ backgroundColor: getPokemonColor(pokemon) }}
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {toUpperCase(pokemon.name)}
                    </h3>
                    <p className="text-sm opacity-90">
                      #{pokemon.id.toString().padStart(3, "0")}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(removeComparisonPokemon(pokemon.id))
                    }
                    className="bg-red-500 hover:bg-red-600 p-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                {/* ✅ IMAGE — FINAL FIX */}
                <div className="flex justify-center py-6 bg-gray-50">
                  <img
                    src={
                      pokemon.sprites?.other?.["official-artwork"]
                        ?.front_default ||
                      pokemon.sprites?.other?.dream_world?.front_default ||
                      pokemon.sprites?.front_default
                    }
                    alt={pokemon.name}
                    className="w-40 h-40 object-contain drop-shadow-xl"
                  />
                </div>

                {/* Details */}
                <div className="p-4 space-y-4">
                  {/* Types */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                      TYPES
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {pokemon.types?.map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-semibold bg-gray-100 rounded-full border"
                        >
                          {toUpperCase(t.type.name)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Base Stats */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                      BASE STATS
                    </p>
                    <div className="space-y-2">
                      {pokemon.stats?.map((stat, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs">
                            <span className="capitalize">
                              {stat.stat.name.replace("-", " ")}
                            </span>
                            <span className="font-semibold">
                              {stat.base_stat}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded">
                            <div
                              className="h-2 rounded bg-purple-500"
                              style={{
                                width: `${Math.min(stat.base_stat, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between pt-2 border-t text-sm font-semibold">
                    <span>Total</span>
                    <span>
                      {pokemon.stats?.reduce((sum, s) => sum + s.base_stat, 0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
