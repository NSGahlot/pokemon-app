import { useState } from 'react'
import Pokemon from './components/common/Pokemon'
import Home from './components/home/Home'
import { gender as filterGenders, types as filterTypes } from './utils/types'

function App() {
  const [typeOptions] = useState(filterTypes)
  const [genderOptions] = useState(filterGenders)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-500 to-transparent rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-500 to-transparent rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 right-20 w-64 h-64 bg-gradient-to-bl from-pink-500 to-transparent rounded-full blur-3xl opacity-15 animate-pulse" />
      </div>

      <main className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="mb-6">
              <h1 className="text-7xl sm:text-8xl font-black mb-4 tracking-tighter">
                <span className="bg-gradient-to-r from-yellow-300 via-red-500 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
                  Pokédex
                </span>
              </h1>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-yellow-300 to-pink-600 rounded-full" />
            </div>
            <p className="text-xl text-gray-300 font-semibold mt-6">Discover and explore the Pokémon world</p>
            <div className="mt-6 flex justify-center gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: "0s"}} />
              <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: "0.2s"}} />
              <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{animationDelay: "0.4s"}} />
            </div>
          </header>

          <Home
            typeOptions={typeOptions}
            genderOptions={genderOptions}
          />
          <Pokemon />
        </div>
      </main>
    </div>
  )
}

export default App

