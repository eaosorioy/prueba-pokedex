import './PokemonCard.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import httpGet from '../../../api/http';

function PokemonCard({ url }) {
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        httpGet(url)
            .then(({ name, sprites, id }) => {
                const uri = sprites?.other['official-artwork']?.front_default;

                setPokemon({ name, uri, id });
            })
    }, []);

    function onClick(id) {
        navigate(`/pokemon/${id}`);
    }

    if (!pokemon) return null;

    return (
        <li
            className="pokemon-card"
            onClick={() => onClick(pokemon.id)}
            data-testid={`${pokemon.name}-card`}
        >
            <img
                data-testid={`${pokemon.name}-image`}
                className="pokemon-card__pic"
                src={pokemon.uri}
                alt={`${pokemon.name}-image`}
            />
            <h2 className="pokemon-card__title">{pokemon.name}</h2>
        </li>
    );
}

PokemonCard.propTypes = {
    url: PropTypes.string.isRequired
};

export default PokemonCard;
