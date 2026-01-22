import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  selectPokemonDetails,
  selectSelectedPokemon,
  addComparisonPokemon,
  selectComparisonPokemons,
} from "../../store/pokemonSlice";
import { getPokemonColor, typeColors } from "../../utils/pokemonColors";
import toUpperCase from "../../utils/upperCaseName";
import {
  convertHeight,
  descriptionList,
  flattenList,
  simplifyLabels,
} from "../../utils/utils";
import AbilitiesInfo from "./AbilitiesInfo";
import EvolutionInfo from "./EvolutionInfo";

export default function PokemonPreview({ close }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedPokemon = useSelector(selectSelectedPokemon);
  const pokemonDetails = useSelector(selectPokemonDetails);
  const loading = useSelector(selectLoading);
  const comparisonPokemons = useSelector(selectComparisonPokemons);

  const handleAddToComparison = () => {
    dispatch(addComparisonPokemon(selectedPokemon));
  };

  const isInComparison = comparisonPokemons.some(
    (p) => p.id === selectedPokemon?.id,
  );

  if (!selectedPokemon) {
    return null;
  }

  if (loading.details) {
    return (
      <div className="flex items-center justify-center min-h-screen md:min-h-[400px] p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const abilities = (data = []) =>
    data.map((item) => toUpperCase(item.ability.name));

  const handleReadMore = () => setIsModalOpen((prev) => !prev);

  return (
    <section className="p-4 sm:p-6 text-gray-800 w-full bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen md:min-h-0 md:rounded-2xl">
      <div className="relative mb-6 flex flex-col md:flex-row md:gap-8">
        <div className="flex justify-center md:justify-start mb-4 md:mb-0">
          <div
            className={`w-48 h-48 md:w-56 md:h-64 p-4 bg-cover rounded-2xl border-4 border-white shadow-xl flex items-center justify-center transform transition-transform hover:scale-105 ${
              selectedPokemon?.types?.length > 1
                ? "bg-gradient-to-b from-blue-100 to-purple-100"
                : ""
            }`}
            style={{
              backgroundColor: getPokemonColor(selectedPokemon),
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            }}
          >
            <img
              src={selectedPokemon?.sprites?.other?.dream_world?.front_default}
              alt={selectedPokemon.name}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-6 pb-6 border-b-3 border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {selectedPokemon?.name?.toUpperCase()}
                </h2>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  {selectedPokemon.id.toString().padStart(3, "0")}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddToComparison}
                  disabled={isInComparison || comparisonPokemons.length >= 3}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all transform hover:scale-105 border-2 ${
                    isInComparison
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-500 shadow-lg shadow-green-500/50"
                      : comparisonPokemons.length >= 3
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400"
                        : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-400 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70"
                  }`}
                >
                  {isInComparison ? "✓ In Comparison" : "🔄 Compare"}
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full hover:from-gray-200 hover:to-gray-300 transition-all transform hover:scale-110 border-2 border-gray-300"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="mb-6 bg-white rounded-xl p-4 border-2 border-gray-200 shadow-md">
            <div className="text-sm md:text-base leading-relaxed text-gray-700">
              {descriptionList(
                pokemonDetails.description?.flavor_text_entries,
              )?.substring(0, 300) || "No description available."}
              ...
              <span
                className="font-bold text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors"
                role="button"
                tabIndex={0}
                onClick={handleReadMore}
              >
                {" "}
                read more
              </span>
              {isModalOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-black bg-opacity-70 z-40 backdrop-blur-sm"
                    onClick={handleReadMore}
                  />
                  <div
                    className="fixed inset-2 sm:inset-4 md:absolute md:inset-auto md:left-0 md:right-0 md:top-full md:mt-2 p-5 sm:p-6 pt-10 rounded-2xl z-50 shadow-2xl border-3 border-blue-500 max-h-[80vh] overflow-y-auto"
                    style={{
                      background:
                        "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                      color: "white",
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleReadMore}
                      className="absolute top-3 right-3 p-1 hover:bg-slate-600 rounded-full transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <p className="text-sm sm:text-base leading-relaxed">
                      {descriptionList(
                        pokemonDetails.description?.flavor_text_entries,
                      )}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-5 shadow-lg border-2 border-blue-300 hover:shadow-xl transition-shadow duration-300">
          <h3 className="font-bold text-blue-700 text-[13px] leading-[18px] uppercase tracking-widest mb-2">
            📋 Height
          </h3>
          <p className="text-2xl font-black text-blue-900">
            {convertHeight(selectedPokemon.height)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl p-5 shadow-lg border-2 border-orange-300 hover:shadow-xl transition-shadow duration-300">
          <h3 className="font-bold text-orange-700 text-[13px] leading-[18px] uppercase tracking-widest mb-2">
            ⚖️ Weight
          </h3>
          <p className="text-2xl font-black text-orange-900">
            {selectedPokemon.weight / 10} kg
          </p>
        </div>
        <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl p-5 shadow-lg border-2 border-pink-300 hover:shadow-xl transition-shadow duration-300">
          <h3 className="font-bold text-pink-700 text-[13px] leading-[18px] uppercase tracking-widest mb-2">
            ⚧ Gender
          </h3>
          <p className="text-2xl font-black text-pink-900">
            {pokemonDetails.gender?.gender?.join(", ") || "Unknown"}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-5 shadow-lg border-2 border-green-300 hover:shadow-xl transition-shadow duration-300">
          <h3 className="font-bold text-green-700 text-[13px] leading-[18px] uppercase tracking-widest mb-2">
            🥚 Egg Groups
          </h3>
          <p className="text-xl font-black text-green-900 leading-tight">
            {flattenList(pokemonDetails.description?.egg_groups).join(", ") ||
              "Unknown"}
          </p>
        </div>
      </div>
      <div className="mt-8 mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-6 shadow-lg border-2 border-purple-300 hover:shadow-xl transition-shadow duration-300">
          <h3 className="font-extrabold text-purple-700 text-[14px] leading-[20px] uppercase tracking-widest mb-3">
            ⚡ Abilities
          </h3>
          <div className="flex flex-wrap gap-2">
            {abilities(selectedPokemon.abilities).map((ability, idx) => (
              <span
                key={`${ability} ${idx}`}
                className="bg-gradient-to-r from-purple-400 to-purple-500 text-white font-bold px-3 py-1.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105"
              >
                {ability}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 shadow-lg border-2 border-blue-300 hover:shadow-xl transition-shadow duration-300">
          <h3 className="font-extrabold text-blue-700 text-[14px] leading-[20px] uppercase tracking-widest mb-3">
            🎨 Types
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedPokemon?.types?.map(({ type }, idx) => (
              <span
                key={`${type.name}-${idx}`}
                className="font-bold px-4 py-2 rounded-full text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-white border-2 border-opacity-70"
                style={{
                  background: typeColors[type.name] || "#68A090",
                  borderColor: typeColors[type.name] || "#68A090",
                }}
              >
                {toUpperCase(type.name)}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-100 to-red-50 rounded-xl p-6 shadow-lg border-2 border-red-300 hover:shadow-xl transition-shadow duration-300">
          <h3 className="font-extrabold text-red-700 text-[14px] leading-[20px] uppercase tracking-widest mb-3">
            ⚠️ Weak Against
          </h3>
          <div className="flex flex-wrap gap-2">
            {pokemonDetails.disabilities?.damage_relations?.double_damage_from?.map(
              ({ name }) => (
                <span
                  key={name}
                  className="font-bold px-4 py-2 rounded-full text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-white border-2 border-opacity-70"
                  style={{
                    background: typeColors[name] || "#68A090",
                    borderColor: typeColors[name] || "#68A090",
                  }}
                >
                  {toUpperCase(name)}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 bg-gradient-to-br from-[#E8F5F5] to-[#B0D2D2] rounded-lg pb-6 pt-5 pl-6 pr-6 sm:pl-4 sm:pr-4 shadow-lg border-2 border-[#7FA9A9]">
        <div className="font-bold mb-5">
          <h2 className="text-[22px] leading-[28px] text-[#2C5282] font-extrabold tracking-wide">
            📊 Base Stats
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {selectedPokemon?.stats?.map((item, idx) => (
            <div
              key={`${item.stat.name}-${idx}`}
              className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="stat"
                  className="text-sm font-bold text-[#1A365D] w-[70px]"
                >
                  {toUpperCase(simplifyLabels(item.stat.name))}
                </label>
                <span className="font-extrabold text-lg text-[#2D7D7D] bg-[#D0E8E8] px-2 py-1 rounded">
                  {item.base_stat}
                </span>
              </div>
              <div className="relative w-full h-6 bg-[#E2E8F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#48BB78] to-[#38A169] rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${(item.base_stat / 100) * 100}%` }}
                >
                  {item.base_stat > 30 && (
                    <span className="text-[10px] font-bold text-white drop-shadow-md">
                      {item.base_stat}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Abilities Section */}
      <AbilitiesInfo abilities={selectedPokemon?.abilities || []} />

      {/* Evolution Chain Section */}
      <EvolutionInfo pokemonId={selectedPokemon?.id} />
    </section>
  );
}
