/* eslint-disable no-restricted-syntax */
/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/prefer-default-export */
import upperCaseName from "./upperCaseName"

export const flattenList = (data = []) =>
  data.map((item) => upperCaseName(item.name))

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()]
}
// This function extracts a Pokemon description, removes duplicates and special chars
export const descriptionList = (data = []) => {
  const response = data.filter((item) => item.language.name === "en")
  const filteredData = response.map((item) => item.flavor_text)
  return [...new Set(filteredData)]
    .join(" ")
    .replace(/[&\/\\# +()$~%'":*?<>{}]/g, " ")
}

export const simplifyLabels = (str) => {
  if (str === "special-attack") {
    return "Sp. Attack"
  }
  if (str === "special-defense") {
    return "Sp. Def."
  }
  return str
}

export const convertHeight = (height) => {
  if (height && !Number.isNaN(height) && height > 0) {
    const heightInMeter = height / 10
    const feet = heightInMeter * 3.281
    const result = feet.toFixed(2).toString().split(".")
    return `${result[0]}'${result[1]}"`
  }
}

export function findValues(values, value) {
  const x = values.find((a) => a.type.name === value.toLowerCase())
  if (x) {
    return x?.type?.name
  }
}

export function findValueByGenderData(values, name, gender) {
  for (const item of values) {
    if (item.name === gender) {
      for (const poke of item.pokemon_species_details) {
        if (poke.pokemon_species.name === name) {
          console.log(gender)
          return gender
        }
      }
    }
  }
}

export function filterPokemons(allPokemons = [], typesData = []) {
  let obj = {}
  let result = []
  typesData?.forEach((item) => {
    item.pokemon_species_details?.forEach((it) => {
      obj = {
        gender: item.name,
        name: it.pokemon_species.name,
      }
      result = [...result, obj]
    })
  })

  let state = {}
  let data = []
  allPokemons?.forEach((item) => {
    item.types?.forEach((type) => {
      result?.forEach((it) => {
        if (item.name === it.name) {
          state = {
            id: item.id,
            name: item.name,
            gender: it.gender,
            type: type.type.name,
            sprites: item.sprites,
            types: item.types,
          }
          data = [...data, state]
        }
      })
    })
  })

  return getUniqueListBy(data, "id")
}
