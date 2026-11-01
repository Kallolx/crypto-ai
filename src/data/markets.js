/* Static placeholder quotes, swap for a live feed (e.g. Binance WebSocket) later. */
export const markets = [
  { symbol: "BTC", pair: "BTC/USDT", price: 68420.15, change: 2.41 },
  { symbol: "ETH", pair: "ETH/USDT", price: 3512.8, change: 1.86 },
  { symbol: "BNB", pair: "BNB/USDT", price: 604.32, change: -0.42 },
  { symbol: "SOL", pair: "SOL/USDT", price: 171.09, change: 3.12 },
  { symbol: "XRP", pair: "XRP/USDT", price: 0.5231, change: -1.07 },
  { symbol: "ADA", pair: "ADA/USDT", price: 0.4612, change: 0.88 },
  { symbol: "LINK", pair: "LINK/USDT", price: 14.37, change: 2.04 },
  { symbol: "EUR", pair: "EUR/USD", price: 1.0842, change: 0.12 },
  { symbol: "GBP", pair: "GBP/USD", price: 1.2716, change: -0.08 },
  { symbol: "JPY", pair: "USD/JPY", price: 151.37, change: 0.21 },
];

export const formatPrice = (p) =>
  p.toLocaleString("en-US", { minimumFractionDigits: p < 10 ? 4 : 2, maximumFractionDigits: p < 10 ? 4 : 2 });
