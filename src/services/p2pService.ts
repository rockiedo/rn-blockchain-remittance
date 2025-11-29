const BASE_P2P_URL = 'https://www.okx.com/v3/c2c/tradingOrders/getMarketplaceAdsPrelogin';

export async function getUsdtToVndQuote(): Promise<number> {
    const params = new URLSearchParams({
        paymentMethod: 'bank',
        paymentTimeoutMinutes: '10,15',
        side: 'buy',
        userType: 'all',
        sortType: 'price_desc',
        limit: '100',
        cryptoCurrency: 'USDT',
        fiatCurrency: 'VND',
        currentPage: '2',
        numberPerPage: '5',
    });
    const url = new URL(BASE_P2P_URL);
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url.toString());
    const data = await response.json();
    return parseFloat(data.data.buy[0].price);
}