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
import { GithubIcon } from "../../icons";
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
      <Header>
        <p>Pokédex</p>
        <a
          href="https://github.com/shanpriyan/pokedex"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
        </a>
      </Header>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ul className="card-list">{renderPokemonsList}</ul>
          {isLoadingNextBatch && <Spinner />}
          <div className="hidden-load-more" ref={ref} />
        </>
      )}
    </main>
  );
};

export default LandingPage;
