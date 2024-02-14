import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './index';

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal();

    return {
        ...mod,
        useNavigate: () => mockNavigate
    }
});

describe('SearchBar Component', () => {
    it('Shoudl render the SearchBar', async () => {
        await act(() => render(<SearchBar />));

        const search = screen.getByTestId('search');
        const button = screen.getByText('Search');
        expect(search).toBeInTheDocument();
        fireEvent.change(search, { target: { value: 'test' } });
        fireEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith('/pokemon/test');
    })
})