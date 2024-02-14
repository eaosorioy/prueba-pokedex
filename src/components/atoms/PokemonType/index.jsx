import PropTypes from 'prop-types';

function PokemonType({ name }) {
    return (
        <span className="pokemon-details__type">
            {name}
        </span>
    );
}

PokemonType.propTypes = {
    name: PropTypes.string.isRequired
};

export default PokemonType;
