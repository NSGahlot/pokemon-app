import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchFilter,
  setTypeFilters,
  setGenderFilters,
  clearFilters,
  selectFilters,
} from "../../store/pokemonSlice";
import TypeFilter from "../dropdowns/TypeFilter";
import GenderFilter from "../dropdowns/GenderFilter";
import SearchBar from "./SearchBar";

export default function Home({ typeOptions, genderOptions }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  // Local state for managing filter options UI
  const [localTypeOptions, setLocalTypeOptions] = useState(typeOptions);
  const [localGenderOptions, setLocalGenderOptions] = useState(genderOptions);

  // Sync URL params with state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const types = params.get("types");
    const genders = params.get("genders");
    if (search) dispatch(setSearchFilter(search));
    if (types) dispatch(setTypeFilters(types.split(",")));
    if (genders) dispatch(setGenderFilters(genders.split(",")));
  }, [dispatch]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (filters.search) {
      params.set("search", filters.search);
    } else {
      params.delete("search");
    }

    if (filters.types?.length) {
      params.set("types", filters.types.join(","));
    } else {
      params.delete("types");
    }

    if (filters.genders?.length) {
      params.set("genders", filters.genders.join(","));
    } else {
      params.delete("genders");
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [filters]);

  const handleSearchChange = (value) => {
    dispatch(setSearchFilter(value));
  };

  const handleFilterChange = (target, filterType) => {
    const isChecked = target.checked;
    const value = target.value;

    if (filterType === "types") {
      const updatedTypes = localTypeOptions.map((type) =>
        type.value === value ? { ...type, ischecked: isChecked } : type,
      );
      setLocalTypeOptions(updatedTypes);

      const selectedTypes = updatedTypes
        .filter((type) => type.ischecked)
        .map((type) => type.value);
      dispatch(setTypeFilters(selectedTypes));
    } else if (filterType === "gender") {
      const updatedGenders = localGenderOptions.map((gender) =>
        gender.value === value ? { ...gender, ischecked: isChecked } : gender,
      );
      setLocalGenderOptions(updatedGenders);

      const selectedGenders = updatedGenders
        .filter((gender) => gender.ischecked)
        .map((gender) => gender.value);
      dispatch(setGenderFilters(selectedGenders));
    }
  };

  const handleReset = () => {
    // Reset local state
    setLocalTypeOptions(
      typeOptions.map((type) => ({ ...type, ischecked: false })),
    );
    setLocalGenderOptions(
      genderOptions.map((gender) => ({ ...gender, ischecked: false })),
    );

    // Reset Redux state
    dispatch(clearFilters());
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl border-2 border-yellow-400/50 backdrop-blur">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SearchBar value={filters.search} onChange={handleSearchChange} />
          <TypeFilter
            options={localTypeOptions}
            handleChange={handleFilterChange}
          />
          <GenderFilter
            options={localGenderOptions}
            handleChange={handleFilterChange}
          />
        </div>

        {/* Reset Button */}
        <div className="flex justify-end">
          <button
            onClick={handleReset}
            className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 uppercase tracking-wider border-2 border-red-400 hover:border-red-300"
          >
            ✕ Clear Filters
          </button>
        </div>
      </div>
    </section>
  );
}
