export default function PokemonLoader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-spin border-t-transparent"></div>
          <div className="absolute inset-2 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-800"></div>
          </div>
        </div>
        <p className="text-lg font-semibold text-gray-800 animate-pulse">
          Catching Pokémon...
        </p>
      </div>
    </div>
  )
}