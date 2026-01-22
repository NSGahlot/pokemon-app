/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */

import extractGender from "../utils/extractGender";

export const getAllPokemons = async () => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
    const data = await res.json();
    const response = await Promise.all(
      data.results.map((pokemon) => fetch(pokemon.url)),
    );
    const allPokemons = await Promise.all(response.map((r) => r.json()));
    return allPokemons;
  } catch (err) {
    console.log(err.message);
  }
};

export const getGenderData = async () => {
  try {
    const res = await Promise.all([
      fetch("https://pokeapi.co/api/v2/gender/1"),
      fetch("https://pokeapi.co/api/v2/gender/2"),
      fetch("https://pokeapi.co/api/v2/gender/3"),
    ]);
    const data = await Promise.all(res.map((r) => r.json()));
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getPokemonGender = async (pokemon) => {
  try {
    const res = await Promise.all([
      fetch("https://pokeapi.co/api/v2/gender/1"),
      fetch("https://pokeapi.co/api/v2/gender/2"),
      fetch("https://pokeapi.co/api/v2/gender/3"),
    ]);
    const data = await Promise.all(res.map((r) => r.json()));
    // console.log("data", data)
    return extractGender(pokemon, data);
  } catch (err) {
    console.log(err.message);
  }
};
export const getPokemonDisabilities = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getPokemonDescription = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getAbilityDetails = async (abilityName) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getPokemonEvolutionChain = async (id) => {
  try {
    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    const speciesData = await speciesRes.json();
    const evolutionChainUrl = speciesData.evolution_chain.url;
    const chainRes = await fetch(evolutionChainUrl);
    const chainData = await chainRes.json();
    return chainData;
  } catch (err) {
    console.log(err.message);
  }
};
