import {
  RiDashboardLine, RiPieChart2Line, RiCoinsLine, RiShakeHandsLine, RiWallet3Line, RiFileChartLine,
  RiStackLine, RiTicket2Line, RiVipCrownLine, RiCalendarEventLine, RiFolderChartLine,
  RiCustomerService2Line, RiPaletteLine, RiSettings3Line,
} from "react-icons/ri";

/* Sidebar structure. `badge` is a count chip, `tag` a highlighted pill (e.g. time left). */
export const BASE = "/dashboard";

export const sidebar = [
  {
    items: [{ label: "Dashboard", to: "", icon: RiDashboardLine }],
  },
  {
    title: "Centers",
    items: [
      { label: "Investment Center", to: "investments", icon: RiPieChart2Line },
      { label: "Earnings Center", to: "earnings", icon: RiCoinsLine },
      { label: "Affiliate Center", to: "affiliate", icon: RiShakeHandsLine },
      { label: "Wallet Center", to: "wallet", icon: RiWallet3Line },
      { label: "Report Center", to: "report-center", icon: RiFileChartLine },
    ],
  },
  {
    title: "Invest & earn",
    items: [
      {
        label: "Investment Plans", to: "plans", icon: RiStackLine,
        children: [["Crypto plans", "crypto"], ["Forex plans", "forex"], ["Staking plans", "staking"]],
      },
      {
        label: "Monthly Draw", to: "draw", icon: RiTicket2Line, tag: "3d",
        children: [["Buy tickets", "buy"], ["My tickets", "tickets"], ["Draw results", "results"]],
      },
      {
        label: "Prestige Club", to: "club", icon: RiVipCrownLine,
        children: [["Cash rewards", "cash"], ["Global travel", "travel"], ["Premium gifts", "gifts"]],
      },
    ],
  },
  {
    title: "Records & help",
    items: [
      { label: "Events & Meetings", to: "events", icon: RiCalendarEventLine },
      {
        label: "Reports", to: "reports", icon: RiFolderChartLine,
        children: [
          ["My investments", "investments"], ["My staking", "staking"], ["Daily profit", "profit"],
          ["Affiliate bonus", "affiliate"], ["Level bonus", "level"], ["Weekly bonus", "weekly"],
          ["Withdraw bonus", "withdraw"], ["Rank rewards", "rank"], ["All income", "all"],
        ],
      },
      {
        label: "Support", to: "support", icon: RiCustomerService2Line,
        children: [["Support center", "center"], ["Help center", "help"], ["Reward schedule", "schedule"]],
      },
      { label: "Brand Kit", to: "brand-kit", icon: RiPaletteLine },
      { label: "Settings", to: "settings", icon: RiSettings3Line },
    ],
  },
];

/* Pages reached from inside other pages (hub tabs, checkout, forms), not listed in the sidebar */
const inner = [
  ["wallet/deposit", "Deposit USDT", "wallet", "Wallet Center"],
  ["wallet/withdraw", "Withdraw funds", "wallet", "Wallet Center"],
  ["wallet/transfer", "Make a transfer", "wallet", "Wallet Center"],
  ["wallet/transactions", "Wallet history", "wallet", "Wallet Center"],
  ["affiliate/directs", "Direct members", "affiliate", "Affiliate Center"],
  ["affiliate/downline", "Downline members", "affiliate", "Affiliate Center"],
  ["affiliate/tree", "Affiliate tree", "affiliate", "Affiliate Center"],
  ["affiliate/status", "Affiliate status", "affiliate", "Affiliate Center"],
  ["events/request", "Request a meeting", "events", "Events & Meetings"],
];

/* Flat lookup: path -> { label, parent, parentTo } for page titles and breadcrumbs */
export const routes = [
  ...sidebar.flatMap((g) =>
    g.items.flatMap((it) => [
      ...(it.children ? [] : [{ path: it.to, label: it.label, section: g.title }]),
      ...(it.children || []).map(([label, slug]) => ({ path: `${it.to}/${slug}`, label, parent: it.label, section: g.title })),
    ])
  ),
  ...inner.map(([path, label, parentTo, parent]) => ({ path, label, parent, parentTo })),
];
