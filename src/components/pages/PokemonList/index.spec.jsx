import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import PokemonList from './index';

const mockNavigate = vi.fn();

vi.mock("../../../api/http", () => ({
    default: vi.fn().mockReturnValue(
        Promise.resolve(
            {
                results: [
                    {
                        "name": "bulbasaur",
                        "url": "https://pokeapi.co/api/v2/pokemon/1/"
                    },
                    {
                        "name": "ivysaur",
                        "url": "https://pokeapi.co/api/v2/pokemon/2/"
                    },
                    {
                        "name": "venusaur",
                        "url": "https://pokeapi.co/api/v2/pokemon/3/"
                    },
                    {
                        "name": "charmander",
                        "url": "https://pokeapi.co/api/v2/pokemon/4/"
                    },
                    {
                        "name": "charmeleon",
                        "url": "https://pokeapi.co/api/v2/pokemon/5/"
                    },
                    {
                        "name": "charizard",
                        "url": "https://pokeapi.co/api/v2/pokemon/6/"
                    },
                    {
                        "name": "squirtle",
                        "url": "https://pokeapi.co/api/v2/pokemon/7/"
                    },
                    {
                        "name": "wartortle",
                        "url": "https://pokeapi.co/api/v2/pokemon/8/"
                    },
                    {
                        "name": "blastoise",
                        "url": "https://pokeapi.co/api/v2/pokemon/9/"
                    },
                    {
                        "name": "caterpie",
                        "url": "https://pokeapi.co/api/v2/pokemon/10/"
                    }
                ]
            }
        )
    )
}));

vi.mock("../../atoms/PokemonCard", () => ({
    default: () => <li data-testid="mock-card"></li>
}));

vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal();

    return {
        ...mod,
        useNavigate: () => mockNavigate
    }
});

describe('PokemonList Component', () => {
    it('Shoudl render the PokemonList', async () => {
        await act(() => render(<PokemonList />));

        expect(screen.getByText('150 Pokemon List')).toBeInTheDocument();
        expect(screen.getAllByTestId('mock-card').length).toEqual(10);
        expect(screen.getByText('Total 150')).toBeInTheDocument();
        expect(screen.getByText('1 / 15')).toBeInTheDocument();
        const goToStart = screen.getByText('<<');
        const goToEnd = screen.getByText('>>');
        const prev = screen.getByText('<');
        const next = screen.getByText('>');
        expect(goToStart).toBeInTheDocument();
        expect(goToEnd).toBeInTheDocument();
        expect(next).toBeInTheDocument();
        expect(prev).toBeInTheDocument();
        await act(() => fireEvent.click(goToEnd));
        expect(await screen.getByText('15 / 15')).toBeInTheDocument();
        await act(() => fireEvent.click(prev));
        expect(await screen.getByText('14 / 15')).toBeInTheDocument();
        await act(() => fireEvent.click(goToStart));
        expect(await screen.getByText('1 / 15')).toBeInTheDocument();
        await act(() => fireEvent.click(next));
        expect(await screen.getByText('2 / 15')).toBeInTheDocument();
    })
})