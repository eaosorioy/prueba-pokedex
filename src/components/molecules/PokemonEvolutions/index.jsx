/* eslint-disable react/prop-types */
function PokemonEvolutions({ evolutions }) {
    return (
        <div className="pokemon-details__evolutions">
            {
                evolutions && evolutions.map(({ name, next }, idx) => {
                    return (
                        <div key={`${name}-${idx}`}>
                            <span className="pokemon-details__evolution">
                                {name}
                            </span>
                            <PokemonEvolutions evolutions={next} />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default PokemonEvolutions;
