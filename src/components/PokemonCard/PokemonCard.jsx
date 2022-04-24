import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routepaths";
import {
  capitalize,
  formatId,
  COLOR,
  getPokemonImage,
} from "../../utils/utils";
import "./PokemonCard.scss";
import { Fragment } from "react";

export default function PokemonCard({ pokemonData, disableClick }) {
  const { id, name, types } = pokemonData;
  const navigate = useNavigate();

  const launchDetailsPage = () => {
    if (!disableClick) {
      navigate(`${ROUTES.DETAILS}/${id}`);
    }
  };

  return (
    <li
      className="card"
      onClick={launchDetailsPage}
      style={{ borderColor: COLOR.TYPE(types[0].type.name) }}
    >
      <div
        className="pokemon-image-container"
        style={{ background: COLOR.LINEAR_GRAD(types[0].type.name) }}
      >
        <b>#{formatId(id)}</b>
        <img src={getPokemonImage(pokemonData)} alt="" />
      </div>
      <div className="types">
        {types.map(({ type }, index) => (
          <Fragment key={type.name}>
            <small
              style={{
                color: COLOR.TYPE(type.name),
              }}
            >
              {type.name}
            </small>
            {index !== types.length - 1 && (
              <span style={{ color: "#000" }} key={`separator-${type.name}`}>
                {" | "}
              </span>
            )}
          </Fragment>
        ))}
      </div>
      <strong>{capitalize(name)}</strong>
    </li>
  );
}
