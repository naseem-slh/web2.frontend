import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import mockFetch from './mockFetch';

import { ErrorBoundary, withErrorBoundary } from 'react-error-boundary';


//1000 is the default anyway
const MAX_TIMEOUT_FOR_FETCH_TESTS = Number.parseInt(process.env.MAX_TIMEOUT_FOR_FETCH_TESTS || "1000");

function waitForLonger(callback: () => void | Promise<void>) {
    return waitFor(callback, { timeout: MAX_TIMEOUT_FOR_FETCH_TESTS });
}

const AppWithErrorBoundary = withErrorBoundary(App, {
    onError: (err, info) => { throw err; },
    fallback: <div />
});

test('Shopper', async () => {
    const orgError = console.error;
    mockFetch();
    try {
        console.error = () => { }

        render(<MemoryRouter initialEntries={["/"]}>
            <AppWithErrorBoundary />
        </MemoryRouter>);


    } finally {
        console.error = orgError;
    }

    await waitForLonger(() => {
        const title = screen.getAllByText(/Store/i);
        expect(title.length).toBeGreaterThanOrEqual(2);
    });

});

test('ShopList, expecting only one shopitemcount', async () => {
    const orgError = console.error;
    mockFetch();
    try {
        console.error = () => { }

        render(<MemoryRouter initialEntries={["/shoplist/123456"]}>
            <AppWithErrorBoundary />
        </MemoryRouter>);


    } finally {
        console.error = orgError;
    }

    await waitForLonger(() => {
        const title = screen.getAllByText(/ShopItemCount:/i);
        expect(title.length).toBe(1)
        const quantity = screen.getAllByText(/Quantity:/i);
        expect(quantity.length).toBe(2);
    });
});

test('ShopItem, checking if only Item 1 present', async () => {
    const orgError = console.error;
    mockFetch();
    try {
        console.error = () => { }

        render(<MemoryRouter initialEntries={["/shopitem/51"]}>
            <AppWithErrorBoundary />
        </MemoryRouter>);


    } finally {
        console.error = orgError;
    }

    await waitForLonger(() => {
        const title = screen.getAllByText(/Item:/i);
        expect(title.length).toBe(1)
        const item = screen.getByText(/Item 1/i);
        expect(item).toBeInTheDocument()
        });
});

test('Prefs', async () => {
    const orgError = console.error;
    mockFetch();
    try {
        console.error = () => { }

        render(<MemoryRouter initialEntries={["/prefs"]}>
            <AppWithErrorBoundary />
        </MemoryRouter>);


    } finally {
        console.error = orgError;
    }

    await waitForLonger(() => {
        const prefs = screen.getByText(/PagePrefs/i);
        expect(prefs).toBeInTheDocument();
        });
});

test('Admin', async () => {
    const orgError = console.error;
    mockFetch();
    try {
        console.error = () => { }

        render(<MemoryRouter initialEntries={["/admin"]}>
            <AppWithErrorBoundary />
        </MemoryRouter>);


    } finally {
        console.error = orgError;
    }

    await waitForLonger(() => {
        const res = screen.getByText(/PageAdmin/i);
        expect(res).toBeInTheDocument();
        });
});

test('ErrorFallback', async () => {
    const orgError = console.error;
    mockFetch();
    try {
        console.error = () => { }

        render(<MemoryRouter initialEntries={["/shopitem/abc"]}>
            <AppWithErrorBoundary />
        </MemoryRouter>);


    } catch(error) {
        console.error = orgError;
        if(error instanceof Error)
        expect(error.message).toBe('Validation error (params someID, value someValue)');
    }

});

// Testen Sie mal folgende Routen (in initialEntries):
// /shoplist/123456"
// /shopitem/51"
// /shopitem/91"
// /shopitem/abc"

