import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPokemonEvolution,
  selectEvolutionChain,
  selectLoading,
} from "../../store/pokemonSlice";
import toUpperCase from "../../utils/upperCaseName";

/* 🔧 Recursive helper — function declaration (NO useCallback) */
function buildChain(chainLink, level = 1) {
  const species = chainLink.species;
  const evoDetails = chainLink.evolution_details[0];

  return {
    name: species.name,
    url: species.url,
    level,
    method: evoDetails
      ? {
          trigger: evoDetails.trigger.name,
          minLevel: evoDetails.min_level,
          item: evoDetails.item?.name,
          trade: evoDetails.trade,
        }
      : null,
    children: chainLink.evolves_to.map((child) => buildChain(child, level + 1)),
  };
}

function EvolutionChain({ evolutionData }) {
  const chain = useMemo(() => {
    if (!evolutionData?.chain) return [];
    return [buildChain(evolutionData.chain)];
  }, [evolutionData]);

  const renderEvolutionNode = (node, index) => (
    <div key={`${node.name}-${index}`} className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="px-4 py-2 bg-gradient-to-r from-slate-400 to-slate-500 text-white rounded-lg font-semibold text-base shadow-md">
          {toUpperCase(node.name)}
        </div>

        {node.level > 1 && node.method && (
          <span className="text-xs font-bold bg-slate-300 text-slate-700 px-2.5 py-1.5 rounded-md shadow-sm">
            {node.method.trigger === "level-up" &&
              node.method.minLevel &&
              `Lvl ${node.method.minLevel}`}
            {node.method.trigger === "trade" && "Trade"}
            {node.method.trigger === "use-item" &&
              `Item: ${toUpperCase(node.method.item)}`}
            {node.method.trigger === "shed" && "Shed"}
          </span>
        )}
      </div>

      {node.children.length > 0 && (
        <div className="ml-4 border-l-3 border-slate-300 pl-4">
          {node.children.map((child, idx) => renderEvolutionNode(child, idx))}
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-7">
      <h3 className="text-lg font-bold text-slate-700 mb-3 tracking-normal">
        Evolution Chain
      </h3>

      <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 shadow-sm">
        {chain.length > 0 ? (
          chain.map((rootNode, idx) => renderEvolutionNode(rootNode, idx))
        ) : (
          <p className="text-slate-600 text-sm">No evolution data available.</p>
        )}
      </div>
    </div>
  );
}

export default function EvolutionInfo({ pokemonId }) {
  const dispatch = useDispatch();
  const evolutionChain = useSelector(selectEvolutionChain);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (pokemonId) {
      dispatch(fetchPokemonEvolution(pokemonId));
    }
  }, [pokemonId, dispatch]);

  if (loading.evolution) {
    return (
      <div className="mt-6 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (!evolutionChain?.chain) return null;

  return <EvolutionChain evolutionData={evolutionChain} />;
}
