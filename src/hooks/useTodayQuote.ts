import { getQuoteOfTheDay } from "@/services/quoteApi";
import type { QuoteItem } from "@/types/quote";
import { useCallback, useState } from "react";

interface QuoteState {
    quote: QuoteItem | null;
    isLoading: boolean;
    error: string | null;
}

export function useTodayQuote() {
    const [state, setState] = useState<QuoteState>({
        quote: null,
        isLoading: false,
        error: null,
    });

    const loadQuote = useCallback(async () => {
        setState(prev => ({
            ...prev,
            loading: true,
            error: null,
        }));

        try {
            const quote = await getQuoteOfTheDay();
            setState({
                isLoading: false,
                quote,
                error: null,
            });
        } catch (err) {
            setState({
                isLoading: false,
                quote: null,
                error: err instanceof Error ? err.message : "Unknown error",
            });
        }
    }, []);

    return {
        ...state,
        loadQuote,
    };
}