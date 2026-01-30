import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPokemons,
  fetchGenderData,
  fetchPokemonDetails,
  selectFilteredPokemons,
  selectLoading,
  setSelectedPokemon,
  selectComparisonPokemons,
} from "../../store/pokemonSlice";
import Modal from "../modal/Modal";
import PokemonCard from "./PokemonCard";
import PokemonPreview from "./PokemonPreview";
import ComparisonModal from "../modal/ComparisonModal";

export default function Pokemon() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(18);
  const [pageLoading, setPageLoading] = useState(false);
  const [cachedPages, setCachedPages] = useState({});
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  // Sync page from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (page && !isNaN(page)) {
      setCurrentPage(parseInt(page, 10));
    }
  }, []);

  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [currentPage]);

  const filteredPokemons = useSelector(selectFilteredPokemons);
  const loading = useSelector(selectLoading);
  const comparisonPokemons = useSelector(selectComparisonPokemons);

  // Pagination logic
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons =
    cachedPages[currentPage] ||
    filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  // Reset to page 1 when filters change and clear cache
  useEffect(() => {
    setCurrentPage(1);
    setCachedPages({});
  }, [filteredPokemons.length]);

  // Cache current page
  useEffect(() => {
    if (!cachedPages[currentPage] && filteredPokemons.length > 0) {
      const pageData = filteredPokemons.slice(
        indexOfFirstPokemon,
        indexOfLastPokemon,
      );
      setCachedPages((prev) => ({ ...prev, [currentPage]: pageData }));
    }
  }, [
    currentPage,
    filteredPokemons,
    indexOfFirstPokemon,
    indexOfLastPokemon,
    cachedPages,
  ]);
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  useEffect(() => {
    dispatch(fetchAllPokemons());
    dispatch(fetchGenderData());
  }, []);

  const handlePageChange = (newPage) => {
    setPageLoading(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setPageLoading(false);
    }, 300);
  };

  const showPokemonModal = (id, name = "bulbasaur") => {
    setIsComparisonOpen(false); // Ensure comparison modal closes
    document.body.style.overflow = "hidden";
    dispatch(setSelectedPokemon(id));
    modalRef.current.showModal();
    dispatch(fetchPokemonDetails({ id, name }));
  };

  const closePokemonPreviewModal = () => {
    document.body.style.overflow = "unset";
    modalRef.current.close();
  };

  if (loading.pokemons) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Modal ref={modalRef}>
        <PokemonPreview close={closePokemonPreviewModal} />
      </Modal>

      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-lg border-2 border-yellow-400/50">
        <p className="text-sm sm:text-base font-bold text-yellow-300 text-center sm:text-left">
          📊 Showing{" "}
          <span className="text-yellow-400">
            {indexOfFirstPokemon + 1}-
            {Math.min(indexOfLastPokemon, filteredPokemons.length)}
          </span>{" "}
          of <span className="text-yellow-400">{filteredPokemons.length}</span>{" "}
          Pokémon
        </p>
        <div className="flex gap-3 items-center flex-wrap justify-center">
          {comparisonPokemons.length > 0 && (
            <button
              type="button"
              onClick={() => setIsComparisonOpen(true)}
              className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded hover:shadow-lg hover:shadow-purple-600/50 transition-all uppercase tracking-wider border-2 border-purple-400"
            >
              🔄 Compare ({comparisonPokemons.length}/3)
            </button>
          )}
          <button
            type="button"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded hover:shadow-lg hover:shadow-blue-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider border-2 border-blue-400"
          >
            ← Prev
          </button>
          <span className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-yellow-400 to-red-500 text-black rounded shadow-lg min-w-[80px] text-center border-2 border-yellow-300">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded hover:shadow-lg hover:shadow-red-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider border-2 border-red-400"
          >
            Next →
          </button>
        </div>
      </div>

      {pageLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-yellow-400 border-r-red-500 border-b-pink-500" />
          </div>
        </div>
      ) : (
        <PokemonCard pokemons={currentPokemons} showModal={showPokemonModal} />
      )}
    </section>
  );
}
