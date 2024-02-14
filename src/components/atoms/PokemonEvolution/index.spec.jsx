import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonEvolution from './index';

describe('PokemonEvolution Component', () => {
    it('Shoudl render a PokemonEvolution with name', () => {
        render(<PokemonEvolution name="Ivysaur" />);

        expect(screen.getByText('Ivysaur')).toBeInTheDocument();
    })
})