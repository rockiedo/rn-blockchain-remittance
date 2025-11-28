import type { QuoteItem } from "@/types/quote";

const BASE_URL = "https://zenquotes.io/api";

export async function getQuoteOfTheDay(): Promise<QuoteItem> {
    const response = await fetch(`${BASE_URL}/today`);
    const data = await response.json();
    return data[0];
}