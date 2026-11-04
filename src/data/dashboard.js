/* Dummy data for the dashboard preview */
export const wallets = [
  { label: "Deposit wallet", value: 18450, change: 0 },
  { label: "Profit wallet", value: 4286.72, change: 6.4 },
  { label: "Affiliate wallet", value: 1124.5, change: 12.1 },
  { label: "Token balance", value: 214000, change: 3.2, unit: "CAI" },
];

export const allocation = [
  { label: "Crypto Pool · Premium", value: 55, color: "#3b82f6" },
  { label: "FX Monthly", value: 25, color: "#22d3ee" },
  { label: "CAI Staking", value: 12, color: "#a5b4fc" },
  { label: "Cash (USDT)", value: 8, color: "#334e8f" },
];

export const transactions = [
  { type: "Daily distribution", asset: "USDT", amount: 92.4, status: "Credited", date: "Just now", isNew: true },
  { type: "Team bonus", asset: "USDT", amount: 38.15, status: "Credited", date: "18 min ago", isNew: true },
  { type: "Withdrawal", asset: "USDT", amount: -250, status: "Processing", date: "Today, 11:20" },
  { type: "Token purchase", asset: "CAI", amount: 21200, status: "Completed", date: "Yesterday, 15:03" },
  { type: "Deposit", asset: "USDT", amount: 5000, status: "Confirmed", date: "Yesterday, 10:47" },
  { type: "Staking reward", asset: "CAI", amount: 840, status: "Credited", date: "Oct 28, 09:30" },
  { type: "Affiliate reward", asset: "USDT", amount: 64.8, status: "Credited", date: "Oct 27, 16:12" },
  { type: "Pool allocation", asset: "USDT", amount: 1200, status: "Completed", date: "Oct 26, 13:06" },
];

export const dashNav = ["Dashboard", "Investment", "Deposit", "Withdraw", "Team", "Transfer", "Reports", "Staking"];

export const dailyEarnings = [62, 71, 58, 84, 77, 93, 88, 71, 96, 104, 89, 112, 98, 92.4];

export const bot = [
  ["Trades today", "148"],
  ["Open pairs", "7"],
  ["Win rate", "94.5%"],
  ["Uptime", "99.98%"],
];

export const team = [
  { level: "L1", members: 12, pct: 78, bonus: "612.40" },
  { level: "L2", members: 31, pct: 55, bonus: "338.15" },
  { level: "L3", members: 64, pct: 32, bonus: "173.95" },
];

// 12-point trend lines for wallet cards
export const sparks = {
  "Deposit wallet": [10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13, 14],
  "Profit wallet": [8, 9, 8, 10, 11, 10, 12, 13, 12, 14, 15, 17],
  "Affiliate wallet": [5, 6, 6, 8, 7, 9, 10, 9, 12, 13, 15, 16],
  "Token balance": [9, 10, 10, 12, 11, 12, 13, 12, 14, 14, 15, 15],
};

/* Portfolio value by range. Deterministic so the preview looks the same on every load. */
const END = new Date("2026-11-01");
const fmtDay = (d) => d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
const fmtMonth = (d) => d.toLocaleDateString("en-US", { month: "short" });

function makeSeries(points, stepDays, endValue, growth, seed) {
  let s = seed;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const raw = [];
  let v = 1;
  for (let i = 0; i < points; i++) {
    v *= 1 + growth + (r() - 0.45) * growth * 2.2;
    raw.push(v);
  }
  const k = endValue / raw[raw.length - 1];
  return raw.map((x, i) => {
    const d = new Date(END.getTime() - (points - 1 - i) * stepDays * 86400000);
    const value = Math.round(x * k);
    return { label: stepDays >= 28 ? fmtMonth(d) : fmtDay(d), value, deposits: Math.round(value * 0.9 - 400 + i * 4) };
  });
}

export const portfolioRanges = {
  "1W": makeSeries(7, 1, 20214, 0.004, 11),
  "1M": makeSeries(30, 1, 20214, 0.0035, 23),
  "3M": makeSeries(13, 7, 20214, 0.018, 37),
  "1Y": makeSeries(12, 30, 20214, 0.06, 51),
};

export const earningsDaily = dailyEarnings.map((v, i) => {
  const d = new Date(END.getTime() - (dailyEarnings.length - 1 - i) * 86400000);
  return { label: fmtDay(d), value: v };
});
