import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from './index';

describe('Loading Component', () => {
    it('Shoudl render a Loading message', () => {
        render(<Loading />);

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
});
