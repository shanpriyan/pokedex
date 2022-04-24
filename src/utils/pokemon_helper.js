const POKEMONS_PER_BATCH = 6;
const baseURL = "https://pokeapi.co/";
export const initialURL = `${baseURL}api/v2/pokemon?limit=${POKEMONS_PER_BATCH}`;

export const fetchSpeciesData = async (id) => {
  const resp = await fetch(`${baseURL}api/v2/pokemon-species/${id}/`);
  return await resp.json();
};

export const fetchPokemonData = async (id) => {
  const resp = await fetch(`${baseURL}api/v2/pokemon/${id}/`);
  return await resp.json();
};
