import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import {
  getAllPokemons,
  getGenderData,
  getPokemonDescription,
  getPokemonDisabilities,
  getPokemonGender,
  getAbilityDetails,
  getPokemonEvolutionChain,
} from "../services/pokemonService";

// =======================
// Async thunks
// =======================
export const fetchAllPokemons = createAsyncThunk(
  "pokemon/fetchAllPokemons",
  async () => getAllPokemons(),
);

export const fetchPokemonDetails = createAsyncThunk(
  "pokemon/fetchPokemonDetails",
  async ({ id, name }) => {
    const [gender, disabilities, description] = await Promise.all([
      getPokemonGender(name),
      getPokemonDisabilities(id),
      getPokemonDescription(id),
    ]);
    return { gender, disabilities, description };
  },
);

export const fetchGenderData = createAsyncThunk(
  "pokemon/fetchGenderData",
  async () => getGenderData(),
);

export const fetchAbilityDetails = createAsyncThunk(
  "pokemon/fetchAbilityDetails",
  async (abilityName) => getAbilityDetails(abilityName),
);

export const fetchPokemonEvolution = createAsyncThunk(
  "pokemon/fetchPokemonEvolution",
  async (id) => getPokemonEvolutionChain(id),
);

// =======================
// Initial State with localStorage support
// =======================
const getInitialComparisonPokemons = () => {
  try {
    const data = localStorage.getItem("comparisonPokemons");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  allPokemons: [],
  genderData: [],
  selectedPokemon: null,
  pokemonDetails: {
    gender: null,
    disabilities: null,
    description: null,
  },
  abilityDetails: null,
  evolutionChain: null,
  comparisonPokemons: getInitialComparisonPokemons(),
  filters: {
    search: "",
    types: [],
    genders: [],
  },
  loading: {
    pokemons: false,
    details: false,
    genderData: false,
    ability: false,
    evolution: false,
  },
};

// =======================
// Slice
// =======================
const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedPokemon: (state, { payload }) => {
      state.selectedPokemon =
        state.allPokemons.find((p) => p.id === payload) || null;
    },
    setSearchFilter: (state, { payload }) => {
      state.filters.search = payload;
    },
    setTypeFilters: (state, { payload }) => {
      state.filters.types = payload;
    },
    setGenderFilters: (state, { payload }) => {
      state.filters.genders = payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    addComparisonPokemon: (state, { payload }) => {
      const exists = state.comparisonPokemons.some((p) => p.id === payload.id);
      if (!exists && state.comparisonPokemons.length < 3) {
        state.comparisonPokemons.push(payload);
        localStorage.setItem(
          "comparisonPokemons",
          JSON.stringify(state.comparisonPokemons),
        );
      }
    },
    removeComparisonPokemon: (state, { payload }) => {
      state.comparisonPokemons = state.comparisonPokemons.filter(
        (p) => p.id !== payload,
      );
      localStorage.setItem(
        "comparisonPokemons",
        JSON.stringify(state.comparisonPokemons),
      );
    },
    clearComparison: (state) => {
      state.comparisonPokemons = [];
      localStorage.setItem("comparisonPokemons", JSON.stringify([]));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemons.pending, (state) => {
        state.loading.pokemons = true;
      })
      .addCase(fetchAllPokemons.fulfilled, (state, { payload }) => {
        state.allPokemons = payload;
        state.loading.pokemons = false;
      })
      .addCase(fetchAllPokemons.rejected, (state) => {
        state.loading.pokemons = false;
      })
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.loading.details = true;
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, { payload }) => {
        state.pokemonDetails = payload;
        state.loading.details = false;
      })
      .addCase(fetchPokemonDetails.rejected, (state) => {
        state.loading.details = false;
      })
      .addCase(fetchGenderData.pending, (state) => {
        state.loading.genderData = true;
      })
      .addCase(fetchGenderData.fulfilled, (state, { payload }) => {
        state.genderData = payload;
        state.loading.genderData = false;
      })
      .addCase(fetchGenderData.rejected, (state) => {
        state.loading.genderData = false;
      })
      .addCase(fetchAbilityDetails.pending, (state) => {
        state.loading.ability = true;
      })
      .addCase(fetchAbilityDetails.fulfilled, (state, { payload }) => {
        state.abilityDetails = payload;
        state.loading.ability = false;
      })
      .addCase(fetchAbilityDetails.rejected, (state) => {
        state.loading.ability = false;
      })
      .addCase(fetchPokemonEvolution.pending, (state) => {
        state.loading.evolution = true;
      })
      .addCase(fetchPokemonEvolution.fulfilled, (state, { payload }) => {
        state.evolutionChain = payload;
        state.loading.evolution = false;
      })
      .addCase(fetchPokemonEvolution.rejected, (state) => {
        state.loading.evolution = false;
      });
  },
});

export const {
  setSelectedPokemon,
  setSearchFilter,
  setTypeFilters,
  setGenderFilters,
  clearFilters,
  addComparisonPokemon,
  removeComparisonPokemon,
  clearComparison,
} = pokemonSlice.actions;

// =======================
// Base Selectors
// =======================
export const selectAllPokemons = (state) => state.pokemon.allPokemons;
export const selectGenderData = (state) => state.pokemon.genderData;
export const selectSelectedPokemon = (state) => state.pokemon.selectedPokemon;
export const selectPokemonDetails = (state) => state.pokemon.pokemonDetails;
export const selectFilters = (state) => state.pokemon.filters;
export const selectLoading = (state) => state.pokemon.loading;
export const selectAbilityDetails = (state) => state.pokemon.abilityDetails;
export const selectEvolutionChain = (state) => state.pokemon.evolutionChain;
export const selectComparisonPokemons = (state) =>
  state.pokemon.comparisonPokemons;

// =======================
// ✅ FINAL MEMOIZED SELECTOR
// =======================
export const selectFilteredPokemons = createSelector(
  [selectAllPokemons, selectGenderData, selectFilters],
  (allPokemons = [], genderData = [], filters = {}) => {
    let filtered = allPokemons;

    // Search
    if (filters.search?.trim()) {
      const term = filters.search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.id?.toString().includes(term) ||
          p.name?.toLowerCase().includes(term),
      );
    }

    // Types
    if (filters.types?.length) {
      filtered = filtered.filter((p) =>
        p.types?.some((t) => filters.types.includes(t.type.name)),
      );
    }

    // Genders
    if (filters.genders?.length) {
      filtered = filtered.filter((p) => {
        if (p.genders?.length) {
          return p.genders.some((g) =>
            filters.genders.includes(g.toLowerCase()),
          );
        }

        if (genderData?.length) {
          const genders = genderData
            .filter((g) =>
              g.pokemon_species_details?.some(
                (d) => d.pokemon_species.name === p.name,
              ),
            )
            .map((g) => g.name.toLowerCase());

          return (
            genders.some((g) => filters.genders.includes(g)) ||
            filters.genders.includes("genderless")
          );
        }

        return filters.genders.includes("genderless");
      });
    }

    return filtered;
  },
);

export default pokemonSlice.reducer;
