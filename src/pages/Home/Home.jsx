import { useMemo } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Header from "../../components/Header/Header";
import Loader from "../Loader/Loader";
import {
  usePokemonState,
  usePokemonSetter,
  useIntersectionObserver,
} from "../../hooks";
import Spinner from "../../components/Spinner/Spinner";
import "./Home.scss";

const LandingPage = () => {
  const { pokemonsList, isLoading, isLoadingNextBatch } = usePokemonState();
  const { loadPokemons } = usePokemonSetter();
  const ref = useIntersectionObserver(loadPokemons, [isLoading]);

  const renderPokemonsList = useMemo(
    () =>
      pokemonsList?.map((data) => (
        <PokemonCard key={data.id} pokemonData={data} />
      )),
    [pokemonsList]
  );

  return (
    <main className="app-root">
      <Header>Pokédex</Header>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ul className="card-list">
            {renderPokemonsList}
            <li className="hidden-load-more" ref={ref} />
          </ul>
          {isLoadingNextBatch && <Spinner />}
        </>
      )}
    </main>
  );
};

export default LandingPage;
