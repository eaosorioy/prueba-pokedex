import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonStat from './index';

describe('PokemonStat Component', () => {
    it('Shoudl render a PokemonStat with name and value', () => {
        render(<PokemonStat name="hp" value="75" />);

        expect(screen.getByText('hp')).toBeInTheDocument();
        expect(screen.getByText('75')).toBeInTheDocument();
    })
})