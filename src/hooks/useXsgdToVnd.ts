import { getUsdtToVndQuote } from "@/services/getP2pService";
import { swapXsgdToUsdt } from "@/services/liquidityPoolService";
import { useCallback, useState } from "react";

export interface XsgdToVndState {
    vndAmount: number;
    usdtAmount: number;
    xsgdToUsdtQuote: number;
    usdtToVndQuote: number;
    isLoading: boolean;
    error: string | null;
}

export function useXsgdToVndQuote() {
    const [state, setState] = useState<XsgdToVndState>({
        vndAmount: 0,
        usdtAmount: 0,
        usdtToVndQuote: 0,
        xsgdToUsdtQuote: 0,
        isLoading: false,
        error: null,
    });

    const loadQuote = useCallback(async (xsgdAmount: number) => {
        setState(prev => ({
            ...prev,
            isLoading: true,
            error: null,
        }));

        try {
            const usdtAmount = await swapXsgdToUsdt(xsgdAmount);
            const usdtToVndQuote = await getUsdtToVndQuote();

            setState({
                vndAmount: usdtAmount * usdtToVndQuote,
                usdtAmount: usdtAmount,
                xsgdToUsdtQuote: xsgdAmount / usdtAmount,
                usdtToVndQuote: usdtToVndQuote,
                isLoading: false,
                error: null,
            });
        } catch (err) {
            setState({
                vndAmount: 0,
                usdtAmount: 0,
                xsgdToUsdtQuote: 0,
                usdtToVndQuote: 0,
                isLoading: false,
                error: err instanceof Error ? err.message : "Unknown error",
            });
        }
    }, []);

    return {
        state,
        loadQuote,
    };
}