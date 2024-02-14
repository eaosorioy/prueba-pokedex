import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonType from './index';

describe('PokemonType Component', () => {
    it('Shoudl render a PokemonType with name', () => {
        render(<PokemonType name="grass" />);

        expect(screen.getByText('grass')).toBeInTheDocument();
    })
})