import PokemonEvolution from "../../atoms/PokemonEvolution";

/* eslint-disable react/prop-types */
function PokemonEvolutions({ evolutions }) {
    return (
        <div className="pokemon-details__evolutions">
            {
                evolutions && evolutions.map((evolution, idx) => {
                    if (!evolution) {return null;}

                    const { name, next } = evolution;

                    return (
                        <div key={`${name}-${idx}`}>
                            <PokemonEvolution name={name} />
                            <PokemonEvolutions evolutions={next} />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default PokemonEvolutions;
