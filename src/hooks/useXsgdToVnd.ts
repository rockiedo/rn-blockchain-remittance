import { getBankQuote } from "@/services/bankService";
import { swapXsgdToUsdt } from "@/services/liquidityPoolService";
import { getUsdtToVndQuote } from "@/services/p2pService";
import { useCallback, useState } from "react";

export interface XsgdToVndState {
    vndAmount: number;
    usdtAmount: number;
    xsgdToVndQuote: number;
    xsgdToUsdtQuote: number;
    usdtToVndQuote: number;
    bankQuote: number;
    isLoading: boolean;
    error: string | null;
}

export function useXsgdToVndQuote() {
    const [state, setState] = useState<XsgdToVndState>({
        vndAmount: 0,
        usdtAmount: 0,
        xsgdToVndQuote: 0,
        usdtToVndQuote: 0,
        xsgdToUsdtQuote: 0,
        bankQuote: 0,
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
            const bankQuote = await getBankQuote(xsgdAmount);
            
            const vndAmount = usdtAmount * usdtToVndQuote;

            setState({
                vndAmount: vndAmount,
                usdtAmount: usdtAmount,
                xsgdToVndQuote: vndAmount / xsgdAmount,
                xsgdToUsdtQuote: usdtAmount / xsgdAmount,
                usdtToVndQuote: usdtToVndQuote,
                bankQuote: bankQuote,
                isLoading: false,
                error: null,
            });
        } catch (err) {
            setState({
                vndAmount: 0,
                usdtAmount: 0,
                xsgdToVndQuote: 0,
                xsgdToUsdtQuote: 0,
                usdtToVndQuote: 0,
                bankQuote: 0,
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