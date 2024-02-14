import PropTypes from 'prop-types';

function PokemonStat({ name, value }) {
    return (
        <div className="pokemon-details__stat" >
            <span className="pokemon-details__stat-title">{name}</span>
            <span className="pokemon-details__stat-value">{value}</span>
        </div>
    );
}

PokemonStat.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

export default PokemonStat;
