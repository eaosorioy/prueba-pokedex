import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from './index';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal();

    return {
        ...mod,
        useParams: () => ({ id: '2hjkdsagvhjsd' }),
        useNavigate: () => mockNavigate
    }
});

describe('NotFound Component', () => {
    it('Shoudl render the NotFound message and call navigation', () => {
        render(
            <MemoryRouter initialEntries={['/pokemon/2hjkdsagvhjsd']}>
                <NotFound />
            </MemoryRouter>
        );

        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Pokemon not found')).toBeInTheDocument();
        expect(screen.getByText('No Pokemon was found by "2hjkdsagvhjsd". Try using another name or id')).toBeInTheDocument();
        const button = screen.getByText('Back to Home');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    })
})