import PropTypes from 'prop-types';

function PokemonEvolution({ name }) {
    if (!name) return null;

    return (
        <span className="pokemon-details__evolution">
            {name}
        </span>
    );
}

PokemonEvolution.propTypes = {
    name: PropTypes.string
};

export default PokemonEvolution;
