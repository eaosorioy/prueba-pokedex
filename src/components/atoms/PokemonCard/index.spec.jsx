import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import PokemonCard from './index';

const mockNavigate = vi.fn();

vi.mock("../../../api/http", () => ({
    default: vi.fn().mockReturnValue(
        Promise.resolve(
            {
                "name": "bulbasaur",
                "sprites": {
                    "other": {
                        "official-artwork": {
                            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                        }
                    }
                },
                "id": 1
            }
        )
    )
}));

vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal();

    return {
        ...mod,
        useNavigate: () => mockNavigate
    }
});

describe('PokemonCard Component', () => {
    it('Shoudl render the PokemonCard', async () => {
        await act(() => render(<PokemonCard url="https://pokeapi.co/api/v2/pokemon/1/" />));

        const card = screen.getByTestId('bulbasaur-card');
        expect(card).toBeInTheDocument();
        expect(screen.getByTestId('bulbasaur-image')).toBeInTheDocument();
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
        await act(() => fireEvent.click(card));
        expect(mockNavigate).toHaveBeenCalledWith('/pokemon/1');
    })
})