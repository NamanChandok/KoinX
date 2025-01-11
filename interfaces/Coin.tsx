interface Coin {
    item: {
        name: string;
        symbol: string;
        thumb: string;
        data: {
            price_change_percentage_24h: {usd: number;};
            price: number;
            sparkline: string;
        }
    }
}

export default Coin;