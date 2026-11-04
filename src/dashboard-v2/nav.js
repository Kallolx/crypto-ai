import {
  RiHome5Fill, RiLineChartFill, RiPieChart2Fill, RiStackFill, RiWallet3Fill, RiDownload2Fill, RiUpload2Fill,
  RiArrowLeftRightFill, RiGift2Fill, RiTimeFill, RiUser3Fill,
} from "react-icons/ri";

export const BRAND = ["Crypto-", "AI"];

const B = "/dashboard-v2";
const home = { to: B, label: "Home", Icon: RiHome5Fill, end: true };
const markets = { to: `${B}/markets`, label: "Markets", Icon: RiLineChartFill };
const portfolio = { to: `${B}/portfolio`, label: "Portfolio", Icon: RiPieChart2Fill };
const invest = { to: `${B}/investments`, label: "Invest", Icon: RiStackFill };
const wallets = { to: `${B}/wallets`, label: "Wallets", Icon: RiWallet3Fill };
const deposit = { to: `${B}/deposit`, label: "Deposit", Icon: RiDownload2Fill };
const withdraw = { to: `${B}/withdraw`, label: "Withdraw", Icon: RiUpload2Fill };
const transactions = { to: `${B}/transactions`, label: "Transactions", Icon: RiArrowLeftRightFill };
const referral = { to: `${B}/referral`, label: "Referral", Icon: RiGift2Fill };
const activity = { to: `${B}/activity`, label: "Activity", Icon: RiTimeFill };
const profile = { to: `${B}/profile`, label: "Profile", Icon: RiUser3Fill };

export const groups = [
  { title: "Overview", items: [home, markets, portfolio, invest] },
  { title: "Money", items: [wallets, deposit, withdraw, transactions] },
  { title: "Grow", items: [referral] },
  { title: "Account", items: [activity, profile] },
];

export const all = groups.flatMap((g) => g.items);

/* Bottom bar: five main destinations, Invest raised in the centre */
export const tabs = [home, wallets, { ...invest, center: true }, referral, profile];
