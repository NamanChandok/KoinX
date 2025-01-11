interface CoinInfo {
    name: string;
    symbol: string;
    market_data: {
        market_cap: {usd: number;};
        market_cap_rank: number;
        total_volume: {usd: number;};
        high_24h: {usd: number;};
        low_24h: {usd: number;};
        current_price: {usd: number;};
        atl: {usd: number;};
        ath: {usd: number;};
        fully_diluted_valuation: {usd: number;};

    };
    image: {
        thumb: string;
        small: string;
        large: string;
    };
}

export default CoinInfo;