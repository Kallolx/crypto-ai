/* Sample data for the demo dashboard. Nothing here is real. */
export const user = { name: "Alex Morgan", initials: "AM", email: "alex@example.com" };

export const portfolio = { value: 20214.0, change: 2.84 };

export const holdings = [
  { symbol: "BTC", name: "Bitcoin", amount: "0.1420 BTC", value: 9716.0, change: 2.41 },
  { symbol: "ETH", name: "Ethereum", amount: "1.8500 ETH", value: 6498.68, change: 1.86 },
  { symbol: "SOL", name: "Solana", amount: "14.20 SOL", value: 2429.48, change: 3.12 },
  { symbol: "BNB", name: "BNB", amount: "2.60 BNB", value: 1571.23, change: -0.42 },
];

export const trend = [18.6, 18.8, 18.7, 19.1, 19.0, 19.4, 19.3, 19.6, 19.9, 19.8, 20.0, 20.2].map((v, i) => ({ i, v }));

export const activity = [
  { id: 1, type: "alert", symbol: "BTC", title: "BTC crossed $68,000", time: "Today, 09:12" },
  { id: 2, type: "account", symbol: "ETH", title: "ETH added to watchlist", time: "Today, 08:40" },
  { id: 3, type: "alert", symbol: "SOL", title: "SOL up 3% in 24 hours", time: "Yesterday, 18:05" },
  { id: 4, type: "account", symbol: "BNB", title: "BNB price alert created", time: "Yesterday, 11:30" },
  { id: 5, type: "alert", symbol: "XRP", title: "XRP down 1% in 24 hours", time: "Oct 31, 16:22" },
];
