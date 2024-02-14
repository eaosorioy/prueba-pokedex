import PropTypes from 'prop-types';
import PokemonStat from '../../atoms/PokemonStat';

function PokemonStats({ stats }) {
    return (
        <div>
            <h2>Stats</h2>
            <div className="pokemon-details__stats">
                {
                    stats.map(({ base_stat, stat }) => {
                        return (
                            <PokemonStat key={`${stat.name}-${base_stat}`} name={stat.name} value={base_stat} />
                        );
                    })
                }
            </div>
        </div>
    );
}

PokemonStats.propTypes = {
    stats: PropTypes.arrayOf(PropTypes.shape({
        base_stat: PropTypes.number.isRequired,
        stat: PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    })).isRequired
};

export default PokemonStats;
