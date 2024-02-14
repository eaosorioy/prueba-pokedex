import PropTypes from 'prop-types';
import PokemonType from '../../atoms/PokemonType';

function PokemonTypes({ types }) {
    return (
        <div>
            <h2>Types</h2>
            <div className="pokemon-details__types">
                {
                    types.map(({ type }, idx) => {
                        return (
                            <PokemonType key={`${type}-${idx}`} name={type.name} />
                        );
                    })
                }
            </div>
        </div>
    );
}

PokemonTypes.propTypes = {
    types: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    })).isRequired
};

export default PokemonTypes;
