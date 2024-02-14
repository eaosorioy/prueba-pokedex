/* eslint-disable react/prop-types */
function PokemonEvolutions({ evolutions }) {
    return (
        <div className="pokemon-details__evolutions">
            {
                evolutions && evolutions.map(({ name, next }, idx) => {
                    return (
                        <>
                            <span
                                key={`${name}-${idx}`}
                                className="pokemon-details__evolution"
                            >
                                {name}
                            </span>
                            <PokemonEvolutions key={`${name}-${idx}-${idx}`} evolutions={next} />
                        </>
                    );
                })
            }
        </div>
    );
}

export default PokemonEvolutions;
