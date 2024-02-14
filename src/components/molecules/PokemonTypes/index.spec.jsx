import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonTypes from './index';

const MOCK_TYPES = [
    {
        type: {
            name: 'grass'
        }
    },
    {
        type: {
            name: 'poison'
        }
    }
];

describe('PokemonTypes Component', () => {
    it('Shoudl render a PokemonTypes with name', () => {
        render(<PokemonTypes types={MOCK_TYPES} />);

        expect(screen.getByText('Types')).toBeInTheDocument();
        expect(screen.getByText('grass')).toBeInTheDocument();
        expect(screen.getByText('poison')).toBeInTheDocument();
    })
})