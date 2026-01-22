import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAbilityDetails,
  selectAbilityDetails,
  selectLoading,
} from "../../store/pokemonSlice";
import toUpperCase from "../../utils/upperCaseName";

export default function AbilitiesInfo({ abilities = [] }) {
  const [activeAbility, setActiveAbility] = useState(null);
  const dispatch = useDispatch();
  const abilityDetails = useSelector(selectAbilityDetails);
  const loading = useSelector(selectLoading);

  const handleAbilityClick = (abilityName) => {
    if (activeAbility === abilityName) {
      setActiveAbility(null);
    } else {
      setActiveAbility(abilityName);
      dispatch(fetchAbilityDetails(abilityName));
    }
  };

  const getAbilityDescription = () => {
    if (!abilityDetails?.effect_entries) return "No description available.";

    const englishEntry = abilityDetails.effect_entries.find(
      (entry) => entry.language.name === "en",
    );

    return englishEntry?.effect || "No description available.";
  };

  return (
    <div className="mt-8">
      <div className="mb-5">
        <h3 className="text-2xl font-extrabold text-[#2C5282] tracking-wide">
          ⚡ Abilities
        </h3>
      </div>
      <div className="space-y-3">
        {abilities && abilities.length > 0 ? (
          abilities.map((ability, index) => (
            <div key={index} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleAbilityClick(ability.ability.name)}
                className={`flex-1 px-4 py-3 rounded-lg text-left transition-all duration-300 transform font-bold border-2 ${
                  activeAbility === ability.ability.name
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 border-blue-400 scale-105"
                    : "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-800 hover:bg-gray-200 border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">
                    {toUpperCase(ability.ability.name)}
                  </span>
                  {ability.is_hidden && (
                    <span className="text-xs font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-400 text-yellow-900 px-3 py-1 rounded-full shadow-md">
                      ✨ Hidden
                    </span>
                  )}
                </div>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No abilities available.</p>
        )}
      </div>

      {activeAbility && (
        <div className="mt-5 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-300 shadow-lg">
          {loading.ability ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <h4 className="font-extrabold text-blue-800 mb-3 text-lg border-b-2 border-blue-300 pb-2">
                🔍 {toUpperCase(activeAbility)}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                {getAbilityDescription()}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
