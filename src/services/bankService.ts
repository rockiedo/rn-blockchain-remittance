const WISE_QUOTE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/sgd.json';

export async function getBankQuote(amount: number): Promise<number> {
    const response = await fetch(WISE_QUOTE_URL, {
        method: 'GET',
        headers: {
            'accept': '*/*',
            'content-type': 'application/json',
        },
    });
    const data = await response.json();
    return data.sgd.vnd;
};