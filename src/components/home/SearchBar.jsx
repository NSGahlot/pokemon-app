import React from "react"

export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full">
      <label htmlFor="search" className="block text-sm font-bold text-yellow-300 mb-3 uppercase tracking-widest drop-shadow-lg">
        🔍 Search Pokémon
      </label>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300 -z-10" />
        <input
          type="search"
          id="search"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name or number..."
          className="relative w-full px-5 py-3 pl-12 bg-gray-900 border-2 border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 shadow-xl text-white placeholder-gray-400 font-semibold"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  )
}

