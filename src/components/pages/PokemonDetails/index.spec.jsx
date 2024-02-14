import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import PokemonList from './index';

const mockNavigate = vi.fn();

vi.mock("../../../api/http", () => ({
    default: vi.fn()
        .mockReturnValueOnce(
            Promise.resolve({
                "name": "bulbasaur",
                "sprites": {
                    "other": {
                        "official-artwork": {
                            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                        }
                    }
                },
                "stats": [
                    {
                        "stat": {
                            "name": "hp"
                        },
                        "base_stat": 75
                    },
                    {
                        "stat": {
                            "name": "Attack"
                        },
                        "base_stat": 72
                    }
                ],
                "types": [
                    {
                        "type": {
                            "name": "grass"
                        }
                    },
                    {
                        "type": {
                            "name": "poison"
                        }
                    }
                ]
            })
        )
        .mockReturnValueOnce(
            Promise.resolve({
                "evolution_chain": {
                    "url": "https://pokeapi.co/api/v2/evolution-chain/1"
                }
            })
        )
        .mockReturnValueOnce(
            Promise.resolve({
                "chain": {
                    "evolves_to": [
                        {
                            "evolves_to": [
                                {
                                    "evolves_to": [],
                                    "species": {
                                        "name": "venusaur"
                                    }
                                }
                            ],
                            "species": {
                                "name": "ivysaur"
                            }
                        }
                    ],
                    "species": {
                        "name": "bulbasaur"
                    }
                }
            })
        )
}));

vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal();

    return {
        ...mod,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: '1' }),
    }
});

describe('PokemonList Component', () => {
    it('Shoudl render the PokemonList', async () => {
        await act(() => render(<PokemonList />));

        expect(screen.getByTestId('bulbasaur-image')).toBeInTheDocument();
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
        const backButton = screen.getByText('< Back to Home');
        expect(backButton).toBeInTheDocument();
        expect(screen.getByText('Stats')).toBeInTheDocument();
        expect(screen.getByText('Types')).toBeInTheDocument();
        expect(screen.getByText('Evolutions')).toBeInTheDocument();
        await act(() => fireEvent.click(backButton));
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    })
})