import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routepaths";
import Home from "../pages/Home/Home";
import { PokemonProvider } from "../contexts/PokemonProvider";
import Loader from "../pages/Loader/Loader";

const PokemonDetails = lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/PokemonDetails/PokemonDetails")
);

const Router = () => (
  <PokemonProvider>
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={`${ROUTES.DETAILS}/:id`} element={<PokemonDetails />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </PokemonProvider>
);

export default Router;
