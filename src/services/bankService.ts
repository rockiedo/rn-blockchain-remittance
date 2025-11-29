const WISE_QUOTE_URL = 'https://wise.com/gateway/v1/guest-send-sessions/6b3c9d9a-0f66-425f-611a-b4845d70b221/calculator/action';

export async function getBankQuote(amount: number): Promise<number> {
    const response = await fetch(WISE_QUOTE_URL, {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            action: 'UPDATE_SOURCE_AMOUNT',
            value: {
                amount: amount,
            },
            version: 1,
        }),
    });
    const data = await response.json();
    return data.rate.graph.rate;
};