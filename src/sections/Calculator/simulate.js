import { plans } from "@/data/plans";

export const ALL_PLANS = [...plans.crypto, ...plans.forex];
export const isForex = (plan) => plans.forex.some((p) => p.id === plan.id);
export const MAX_DAYS = 365;
export const BOT_FEE = 30; // forex plans
export const PRINCIPAL_FEE = 0.15;
export const CAP_MULTIPLE = 4; // crypto plans: total earnings stop at 4X the investment

/* Day-by-day profit for one rate. Crypto plans credit daily; forex plans credit at the end of each
   7- or 30-day cycle. `compound` reinvests earnings into the next period's base. */
export function simulate({ plan, amount, rate, compound, cap }) {
  const capAmt = cap && !isForex(plan) ? amount * CAP_MULTIPLE : Infinity;
  const series = [0];
  let profit = 0;
  let capDay = null;

  for (let d = 1; d <= MAX_DAYS; d++) {
    if (d % plan.periodDays === 0 && profit < capAmt) {
      const base = compound ? amount + profit : amount;
      profit = Math.min(profit + base * (rate / 100), capAmt);
      if (profit >= capAmt && capDay === null) capDay = d;
    }
    series.push(profit);
  }
  return { series, capDay };
}

export const scenarioRates = (plan) => ({
  low: plan.rateMin,
  mid: +((plan.rateMin + plan.rateMax) / 2).toFixed(3),
  high: plan.rateMax,
});
