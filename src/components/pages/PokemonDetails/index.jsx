import './PokemonDetails.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE, POKEMON_SPECIES_API } from '../../../common/constants/api';
import httpGet from '../../../api/http';
import NotFound from '../NotFound';
import PokemonStats from '../../molecules/PokemonStats';
import PokemonTypes from '../../molecules/PokemonTypes';
import PokemonEvolutions from '../../molecules/PokemonEvolutions';
import Loading from '../../atoms/Loading';

// chain.evolves_to[n].species.name
// chain.evolves_to[n].evolves_to[m].species.name

function getEvolutions(chain, name) {
    return chain.evolves_to.map(({ species, ...rest }) => {
        const speciesName = species.name;
        const next = rest?.evolves_to.length ? getEvolutions(rest): null;

        if (name === speciesName) {
            return next;
        }

        return {
            name: speciesName,
            next
        };
    })
}

function PokemonDetails() {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        Promise.all([
            httpGet(`${API_BASE}/${id}`),
            httpGet(`${POKEMON_SPECIES_API}/${id}`)
        ])
            .then(([
                { name, sprites, stats, types },
                { evolution_chain }
            ]) => {
                const uri = sprites?.other['official-artwork']?.front_default;

                httpGet(evolution_chain.url)
                    .then(({ chain }) => {
                        const evolutions = getEvolutions(chain, name);

                        setPokemon({ name, uri, stats, types, evolutions });
                        setError(false);
                    })
                    .catch(() => {
                        setPokemon({ name, uri, stats, types });
                        setError(false);
                    });
            })
            .catch(() => {
                setPokemon(null);
                setError(true);
            })

        return () => {
            setPokemon(null);
        };
    }, []);

    if (!pokemon && !error) {
        return <Loading />;
    }

    if (!pokemon && error) {
        return <NotFound />;
    }

    return (
        <main className="pokemon-details">
            <div className="pokemon-details__graph">
                <img
                    className="pokemon-details__pic"
                    data-testid={`${pokemon.name}-image`}
                    src={pokemon.uri}
                    alt={`${pokemon.name}-image`}
                />
            </div>
            <div className="pokemon-details__info">
                <div className="pokemon-details__info-heading">
                    <h1 className="pokemon-details__title">{pokemon.name}</h1>
                    <button
                        className="pokemon-details__back"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        {'< Back to Home'}
                    </button>
                </div>
                <PokemonStats stats={pokemon.stats} />
                <PokemonTypes types={pokemon.types} />
                <div>
                    <h2>Evolutions</h2>
                    <PokemonEvolutions evolutions={pokemon.evolutions} />
                </div>
            </div>
        </main>
    );
}

export default PokemonDetails;
