import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonStats from './index';

const MOCK_STATS = [
    {
        stat: {
            name: 'hp'
        },
        base_stat: 75
    },
    {
        stat: {
            name: 'Attack'
        },
        base_stat: 72
    }
];

describe('PokemonStats Component', () => {
    it('Shoudl render a PokemonStats with name and value', () => {
        render(<PokemonStats  stats={MOCK_STATS} />);

        expect(screen.getByText('Stats')).toBeInTheDocument();
        expect(screen.getByText('hp')).toBeInTheDocument();
        expect(screen.getByText('75')).toBeInTheDocument();
        expect(screen.getByText('Attack')).toBeInTheDocument();
        expect(screen.getByText('72')).toBeInTheDocument();
    })
})