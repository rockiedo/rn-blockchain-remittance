const UNISWAP_BASE_URL = 'https://trading-api-labs.interface.gateway.uniswap.org';

// Public API key for Uniswap
const UNISWAP_API_KEY = 'JoyCGj29tT4pymvhaGciK4r1aIPvqW6W53xT1fwo';

const BASE_UNIT = 10 ** 6;

export async function swapXsgdToUsdt(amount: number): Promise<number> {
    const response = await fetch(`${UNISWAP_BASE_URL}/v1/quote`, {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
            'content-type': 'application/json',
            'dnt': '1',
            'origin': 'https://app.uniswap.org',
            'priority': 'u=1, i',
            'referer': 'https://app.uniswap.org/',
            'sec-ch-ua': '"Not_A Brand";v="99", "Chromium";v="142"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
            'x-api-key': UNISWAP_API_KEY,
            'x-request-source': 'uniswap-web',
            'x-uniquote-enabled': 'true',
            'x-universal-router-version': '2.0',
        },
        body: JSON.stringify(
            {
                "type": "EXACT_INPUT",
                "amount": (amount * BASE_UNIT).toString(),
                "tokenInChainId": 137,
                "tokenOutChainId": 137,
                "tokenIn": "0xdc3326e71d45186f113a2f448984ca0e8d201995",
                "tokenOut": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
                "swapper": "0xAAAA44272dc658575Ba38f43C438447dDED45358",
                "routingPreference": "FASTEST"
            }
        ),
    });

    const data = await response.json();
    const rawAmount = parseFloat(data.quote.output.amount);
    return rawAmount / BASE_UNIT;
};