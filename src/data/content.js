import {
  RiUserAddLine, RiWallet3Line, RiStackLine, RiRobot2Line, RiLineChartLine, RiHandCoinLine,
  RiKey2Line, RiSnowflakeLine, RiLockPasswordLine, RiEyeLine, RiStopCircleLine, RiPulseLine,
} from "react-icons/ri";

export const stats = [
  { value: 14, suffix: "+", label: "Years of AI development" },
  { value: 22.4, prefix: "$", suffix: "M", decimals: 1, label: "Total trading volume" },
  { value: 200, suffix: "+", label: "Global market experts" },
  { value: 94.5, suffix: "%", decimals: 1, label: "Model signal accuracy" },
];

export const steps = [
  { icon: RiUserAddLine, title: "Create your account", text: "Register in minutes, verify your email and lock the account down with two-factor authentication.",
    meta: ["2 min setup", "2FA ready"] },
  { icon: RiWallet3Line, title: "Deposit USDT", text: "Fund your deposit wallet with USDT on BNB Smart Chain (BEP20). Balances appear as soon as the network confirms.",
    meta: ["USDT · BEP20", "From $50"] },
  { icon: RiStackLine, title: "Choose a pool", text: "Pick one of four crypto tiers or a weekly / monthly forex cycle that matches your amount and horizon.",
    meta: ["6 plans", "Crypto & FX"] },
  { icon: RiRobot2Line, title: "The AI goes to work", text: "The engine scans markets 24/7 and executes trades with fund-manager oversight, inside daily risk limits.",
    meta: ["24/7 engine", "Stop-loss on"] },
  { icon: RiLineChartLine, title: "Track every dollar", text: "Distributions land in your profit wallet daily, weekly or monthly, with full reports for every movement.",
    meta: ["Live dashboard", "Exportable reports"] },
  { icon: RiHandCoinLine, title: "Withdraw", text: "Request payouts from $10 straight to your wallet. Requests are processed within 96 hours.",
    meta: ["Min $10", "≤ 96 hours"] },
];

export const security = [
  { icon: RiKey2Line, title: "Multi-signature wallets", text: "No single key can move funds." },
  { icon: RiSnowflakeLine, title: "Cold storage", text: "Reserves are kept offline." },
  { icon: RiLockPasswordLine, title: "Two-factor auth", text: "An extra check on every login." },
  { icon: RiEyeLine, title: "24/7 monitoring", text: "Systems watched around the clock." },
  { icon: RiStopCircleLine, title: "Stop-loss controls", text: "Automatic exits on every position." },
  { icon: RiPulseLine, title: "Daily risk limits", text: "Exposure capped per session." },
];

export const faqs = [
  { q: "What is the minimum investment?", a: "Crypto pools start at $50 (Essential). Forex pools start at $100 and include a $30 trading-bot fee." },
  { q: "How do I deposit funds?", a: "Deposits are made in USDT on BNB Smart Chain (BEP20). Always double-check the network, transfers on the wrong chain may be unrecoverable." },
  { q: "How and when can I withdraw?", a: "Profit withdrawals start from $10 and are processed within 96 hours. Withdrawing your principal carries a 15% fee." },
  { q: "What is the earnings cap?", a: "Passive investors are capped at 4X their investment. Active affiliates who refer at least two people per month can earn up to 10X through affiliate bonuses." },
  { q: "Are returns guaranteed?", a: "No. Plan rates are targets. Markets are volatile and results vary, you may lose some or all of your deposit. Only invest what you can afford to lose." },
  { q: "Who can use the platform?", a: "The platform is not available to residents of the United States, Canada or the United Arab Emirates. Check your local regulations before signing up." },
];
