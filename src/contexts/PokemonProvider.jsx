import { createContext, useReducer, useRef, useEffect } from "react";
import { reducer, initialState } from "./reducer";
import * as ACTIONS from "./actionTypes";
import {
  initialURL,
  fetchSpeciesData,
  fetchPokemonData,
} from "../utils/pokemon_helper";

export const PokemonContext = createContext(initialState);

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const batchURL = useRef(initialURL);

  useEffect(() => {
    loadPokemons().then(() => state.isLoading && setLoading(false));
  }, []);

  const loadPokemons = async () => {
    if (!batchURL.current || state.isLoadingNextBatch) return;
    setLoadingNextBatch(true);
    const resp = await fetch(batchURL.current);
    const { next, results } = await resp.json();

    batchURL.current = next;

    const _pokemonsList = await Promise.all(
      results.map(async (pokemon) => {
        const resp = await fetch(pokemon.url);
        return await resp.json();
      })
    );

    setPokemonsList(_pokemonsList);
    setLoadingNextBatch(false);
  };

  const setPokemonsList = (pokemons) => {
    dispatch({
      type: ACTIONS.SET_POKEMONS_LIST,
      payload: pokemons,
    });
  };

  const setPokemonData = (pokemon) => {
    dispatch({
      type: ACTIONS.SET_POKEMON_DATA,
      payload: pokemon,
    });
  };

  const setPokemonSpeciesData = (pokemon) => {
    dispatch({
      type: ACTIONS.SET_POKEMON_SPECIES_DATA,
      payload: pokemon,
    });
  };

  const setPokemonId = (id) => {
    dispatch({
      type: ACTIONS.SET_POKEMON_ID,
      payload: id,
    });
  };

  const setLoading = (loading) => {
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: loading,
    });
  };

  const setLoadingNextBatch = (loading) => {
    dispatch({
      type: ACTIONS.SET_LOADING_NEXT_BATCH,
      payload: loading,
    });
  };

  useEffect(() => {
    if (!state.id) return;
    (async function () {
      const _pokemonData = await fetchPokemonData(state.id);
      setPokemonData(_pokemonData);
      const _pokemonSpeciesData = await fetchSpeciesData(state.id);
      setPokemonSpeciesData(_pokemonSpeciesData);
    })();
  }, [state.id]);

  return (
    <PokemonContext.Provider
      value={{
        state,
        dispatch,
        setPokemonId,
        loadPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
