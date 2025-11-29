const ONE_INCH_BASE_URL = 'https://proxy-app.1inch.io/v2.0/fusion/quoter/v2.0/137/quote/receive';
// Public API key for 1inch
const ONE_INCH_AUTH_TOKEN = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjZhYmE2YmVlLTk2OGMtNDM2YS1iZWFhLTNhOGM5NjkzZDI4MiIsImV4cCI6MTc2NDQxODA2MywiZGV2aWNlIjoiYnJvd3NlciIsImlhdCI6MTc2NDQxNDQ2M30.HCjnKsjqwWHit0eyLBaDB3J-O5RTKJPudzkX7Y1gmPmRcb_8Sazk7IkAs3CSTQilRnzIrE4To7yz2dDYLZxIsA';

const BASE_UNIT = 10 ** 6;

export async function swapXsgdToUsdt(amount: number): Promise<number> {
    const params = new URLSearchParams({
        walletAddress: '0x0000000000000000000000000000000000000000',
        fromTokenAddress: '0xdc3326e71d45186f113a2f448984ca0e8d201995',
        toTokenAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        amount: (amount * BASE_UNIT).toString(),
    });
    const url = new URL(ONE_INCH_BASE_URL);
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(
        url.toString(),
        {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'content-type': 'application/json',
                'authorization': `Bearer ${ONE_INCH_AUTH_TOKEN}`,
            },
        }
    );
    const data = await response.json();
    const rawAmount = parseFloat(data.toTokenAmount);
    const readableAmount = rawAmount / BASE_UNIT;

    return readableAmount;
}