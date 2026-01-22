import React, { Suspense } from "react"
import PokemonLoader from "./PokemonLoader"

export default function SuspenseLayout({ children, fallback }) {
  return <Suspense fallback={fallback || <PokemonLoader />}>{children}</Suspense>
}
