/* Plan sheet, rates are target ranges, not guarantees. Used by Pricing + Calculator. */
export const plans = {
  crypto: [
    { id: "essential", name: "Essential", min: 50, max: 1000, rateMin: 0.5, rateMax: 0.75, period: "day", periodDays: 1,
      features: ["Daily distribution", "4X earnings cap", "Crypto pool access", "Dashboard & reports"] },
    { id: "growth", name: "Growth", min: 1000, max: 5000, rateMin: 0.75, rateMax: 1.5, period: "day", periodDays: 1,
      features: ["Daily distribution", "4X earnings cap", "Crypto pool access", "Priority support"] },
    { id: "premium", name: "Premium", min: 5000, max: 10000, rateMin: 1, rateMax: 2, period: "day", periodDays: 1, featured: true,
      features: ["Daily distribution", "4X earnings cap", "Crypto pool access", "Dedicated manager"] },
    { id: "elite", name: "Elite", min: 10000, max: 50000, rateMin: 1, rateMax: 3, period: "day", periodDays: 1,
      features: ["Daily distribution", "4X earnings cap", "Crypto pool access", "VIP desk & reports"] },
  ],
  forex: [
    { id: "weekly", name: "FX Weekly", min: 100, max: 50000, rateMin: 2.5, rateMax: 3, period: "7 days", periodDays: 7,
      features: ["Weekly distribution", "Major & minor pairs", "$30 trading-bot fee", "Short-term strategies"] },
    { id: "monthly", name: "FX Monthly", min: 100, max: 50000, rateMin: 13, rateMax: 15, period: "30 days", periodDays: 30, featured: true,
      features: ["Monthly distribution", "Major & minor pairs", "$30 trading-bot fee", "Swing strategies"] },
  ],
};

export const terms = [
  ["Payment asset", "USDT (BEP20)"],
  ["Minimum crypto investment", "$50"],
  ["Minimum forex investment", "$100"],
  ["Forex trading-bot fee", "$30"],
  ["Minimum profit withdrawal", "$10"],
  ["Payout processing", "Within 96 hours"],
  ["Principal withdrawal fee", "15%"],
  ["Passive earnings cap", "4X"],
  ["Active affiliate earnings cap", "Up to 10X"],
];
