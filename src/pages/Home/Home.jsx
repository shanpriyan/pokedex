import { useMemo } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Header from "../../components/Header/Header";
import ExternalLink from "../../components/ExternalLink/ExternalLink";
import Loader from "../Loader/Loader";
import {
  usePokemonState,
  usePokemonSetter,
  useIntersectionObserver,
} from "../../hooks";
import Spinner from "../../components/Spinner/Spinner";
import { GithubIcon } from "../../icons";
import { scrollToTop } from "../../utils/utils";
import "./Home.scss";

const LandingPage = () => {
  const { pokemonsList, isLoading, isLoadingNextBatch } = usePokemonState();
  const { loadPokemons } = usePokemonSetter();
  const ref = useIntersectionObserver(loadPokemons, [
    isLoading,
    isLoadingNextBatch,
  ]);

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
        <button type="button" onClick={() => scrollToTop(true)}>
          Pokédex
        </button>
        <ExternalLink href="https://github.com/shanpriyan/pokedex">
          <GithubIcon />
        </ExternalLink>
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
