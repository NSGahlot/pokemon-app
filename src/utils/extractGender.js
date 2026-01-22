/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import toUpperCase from "./upperCaseName"

function extractGender(name, data = []) {
  return data.reduce(
    (acc, curr) => {
      const { name: gender, pokemon_species_details } = curr
      for (const it of pokemon_species_details) {
        if (it.pokemon_species.name === name) {
          acc.name = name
          acc.gender.push(toUpperCase(gender))
        }
      }
      return acc
    },
    { name: "", gender: [] }
  )
}

export default extractGender
