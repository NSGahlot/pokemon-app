import { useSelector, useDispatch } from "react-redux";
import {
  selectComparisonPokemons,
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 z-50 bg-white rounded-xl shadow-lg border border-gray-200 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-purple-600 px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">
            Pokemon Comparison{" "}
            <span className="opacity-80">({pokemons.length}/3)</span>
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => dispatch(clearComparison())}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white text-purple-600 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
          {pokemons.map((pokemon, idx) => (
            <div
              key={pokemon.id || idx}
              className="bg-white rounded-2xl shadow-xl border-2 border-purple-200 flex flex-col items-center transition-transform duration-150 hover:scale-105 hover:shadow-2xl"
              style={{
                borderColor: getPokemonColor(pokemon.types?.[0]?.type?.name),
              }}
            >
              <div className="pt-4 flex justify-center">
                <img
                  src={
                    pokemon.sprites?.other?.dream_world?.front_default ||
                    pokemon.sprites?.front_default
                  }
                  alt={pokemon.name}
                  className="w-32 h-32 object-contain drop-shadow-2xl -mt-12 z-10"
                  style={{ marginBottom: "-1.5rem" }}
                />
              </div>
              <div className="p-6 space-y-6 w-full">
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2 tracking-wide">
                    ABILITIES
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {pokemon.abilities?.map((a, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 text-xs font-semibold rounded-full border bg-blue-50 text-blue-700 border-blue-200 shadow ${a.is_hidden ? "italic opacity-70" : ""}`}
                      >
                        {toUpperCase(a.ability.name)}
                        {a.is_hidden ? " (Hidden)" : ""}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2 tracking-wide">
                    TYPES
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {pokemon.types?.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-semibold bg-gray-100 rounded-full border shadow"
                      >
                        {toUpperCase(t.type.name)}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Removed Weak Against and Strong Against sections as requested */}
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2 tracking-wide">
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
                <div className="flex items-center justify-end gap-2 pt-2 border-t text-base font-bold">
                  <span className="text-gray-700">Total</span>
                  <span className="text-xl font-extrabold tabular-nums text-right min-w-[32px] text-purple-700">
                    {pokemon.stats?.reduce((sum, s) => sum + s.base_stat, 0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
