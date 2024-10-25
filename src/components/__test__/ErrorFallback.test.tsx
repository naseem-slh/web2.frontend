import { act, render, screen } from '@testing-library/react';
import Bomb from './Bomb';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../ErrorFallback';


test('Catch error and show in ErrorFallback', async () => {
    const orgError = console.error;
    try {
        console.error = () => { }
        await act(() => {
            render(
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Bomb />
                </ErrorBoundary>
            )
        })
    } finally {
        console.error = orgError;
    }
    // Eigentliche Tests:
    const res = screen.getAllByText(`💥 CABOOM 💥`)
    expect(res[0]).toBeInTheDocument()
});