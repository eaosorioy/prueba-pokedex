import PropTypes from 'prop-types';

function PokemonEvolution({ name }) {
    return (
        <span className="pokemon-details__evolution">
            {name}
        </span>
    );
}

PokemonEvolution.propTypes = {
    name: PropTypes.string.isRequired
};

export default PokemonEvolution;
