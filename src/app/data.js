import { site } from "@/config/site";
import { plans } from "@/data/plans";

/* Sample data for the investor area. Replace with API calls when the backend is ready. */
const T = site.token.symbol;
export const TOKEN = T;
export const TOKEN_PRICE = site.token.price;

export const user = {
  name: "Alex Morgan",
  initials: "AM",
  email: "alex@mail.com",
  username: "CAI48213",
  tier: "Gold",
  sponsorId: "CAI48213",
  inviteLink: `${site.domain}/signup?ref=CAI48213`,
  memberSince: "Aug 2026",
};

/* ---------- Wallets ---------- */
export const usdWallets = [
  { id: "deposit", label: "Deposit wallet", balance: 18450, credited: 27500, debited: 9050, use: "Pays for plans, the bot fee and draw tickets" },
  { id: "profit", label: "Profit wallet", balance: 4286.72, credited: 12420, debited: 8133.28, use: "Receives daily profit from your plans" },
  { id: "affiliate", label: "Affiliate wallet", balance: 1124.5, credited: 2248.5, debited: 1124, use: "Receives referral and team bonuses" },
  { id: "withdraw", label: "Withdraw wallet", balance: 640, credited: 4440, debited: 3800, use: "The only wallet you can withdraw from" },
];

export const tokenWallets = [
  { id: "staking", label: "Token staking", balance: 214000, credited: 240000, debited: 26000, use: "Tokens earned from staking plans" },
  { id: "token-withdraw", label: "Token withdrawal", balance: 26000, credited: 26000, debited: 0, use: "Released tokens ready to withdraw" },
];

export const totalUsd = usdWallets.reduce((a, w) => a + w.balance, 0);

export const ledger = [
  ["Nov 02, 09:00", "Daily profit", "Profit wallet", "+$92.40", "Credited~ok"],
  ["Nov 01, 18:42", "Team bonus · L1", "Affiliate wallet", "+$38.15", "Credited~ok"],
  ["Nov 01, 11:20", "Withdrawal", "Withdraw wallet", "−$250.00", "Processing~wait"],
  ["Oct 31, 16:05", "Transfer to withdraw", "Profit wallet", "−$400.00", "Completed~ok"],
  ["Oct 30, 15:03", `${T} staking`, "Deposit wallet", "−$1,000.00", "Completed~ok"],
  ["Oct 29, 10:47", "Deposit", "Deposit wallet", "+$5,000.00", "Confirmed~ok"],
  ["Oct 28, 09:00", "Daily profit", "Profit wallet", "+$104.20", "Credited~ok"],
  ["Oct 27, 21:14", "Draw tickets ×3", "Deposit wallet", "−$120.00", "Completed~ok"],
  ["Oct 26, 09:00", "Daily profit", "Profit wallet", "+$97.65", "Credited~ok"],
  ["Oct 24, 14:12", "Deposit", "Deposit wallet", "+$1,200.00", "Confirmed~ok"],
];

export const deposit = {
  address: "0x7a3F9c2B41d8E6f05A97c3b2De4417aC0f5c91E",
  network: "BNB Smart Chain (BEP20)",
  min: 10,
};

/* ---------- Investments ---------- */
export const activePlans = [
  { id: "INV-1042", name: "Premium", kind: "Crypto", amount: 8000, earned: 9420, rate: "1.4% / day", started: "Aug 12, 2026", next: "Today, 21:00" },
  { id: "INV-1187", name: "Growth", kind: "Crypto", amount: 2500, earned: 1610, rate: "1.1% / day", started: "Sep 30, 2026", next: "Today, 21:00" },
  { id: "INV-1203", name: "FX Monthly", kind: "Forex", amount: 5000, earned: 1390, rate: "13.9% / month", started: "Oct 01, 2026", next: "Nov 30, 21:00" },
];

export const stakes = [
  { id: "STK-311", name: "180 days", amount: 1000, tokens: 800000, released: 120000, unlock: "Apr 28, 2027", next: "Dec 01" },
];

export const bot = { active: true, paidUntil: "Oct 01, 2027", fee: 30 };

export const earningLimit = { max: 15500 * 4, earned: 12420 + 2248.5 };

export const profitLedger = [
  ["Nov 02", "Premium · INV-1042", "1.41%", "+$112.80"],
  ["Nov 02", "Growth · INV-1187", "1.08%", "+$27.00"],
  ["Nov 01", "Premium · INV-1042", "1.37%", "+$109.60"],
  ["Nov 01", "Growth · INV-1187", "1.12%", "+$28.00"],
  ["Oct 31", "Premium · INV-1042", "1.52%", "+$121.60"],
  ["Oct 30", "FX Monthly · INV-1203", "13.9%", "+$695.00"],
];

/* Plan catalogue: crypto + forex come from the shared plan sheet; staking is dashboard-only */
export const catalog = {
  crypto: plans.crypto.map((p) => ({ ...p, unit: "day" })),
  forex: plans.forex.map((p) => ({ ...p, unit: p.periodDays === 7 ? "week" : "month" })),
  staking: [
    { id: "s90", name: "90 days", min: 100, max: 50000, multiple: 2, release: "10% each month", lockDays: 90 },
    { id: "s180", name: "180 days", min: 100, max: 50000, multiple: 4, release: "15% each month", lockDays: 180 },
    { id: "s365", name: "365 days", min: 100, max: 50000, multiple: 6, release: "1% each day", lockDays: 365 },
  ],
};

/* ---------- Earnings ---------- */
export const income = [
  ["Daily profit", 12420],
  ["Affiliate bonus", 1124.5],
  ["Level bonus", 612.4],
  ["Weekly bonus", 284],
  ["Withdraw bonus", 77.6],
  ["Rank rewards", 150],
];

export const lifetime = income.reduce((a, [, v]) => a + v, 0);
export const withdrawn = 3800;

/* ---------- Affiliate ---------- */
export const team = {
  directs: 12,
  activeDirects: 10,
  downline: 107,
  volume: 177800,
  monthIncome: 386.4,
  levels: [
    ["Level 1", "12", "10", "$42,000.00", "8%", "$612.40"],
    ["Level 2", "31", "24", "$58,500.00", "3%", "$338.15"],
    ["Level 3", "64", "41", "$77,300.00", "1%", "$173.95"],
  ],
  recent: [
    ["Maria S.", "Level 1", "Oct 31", "$2,500.00", "Active~ok"],
    ["Daniel K.", "Level 2", "Oct 29", "$1,000.00", "Active~ok"],
    ["Priya R.", "Level 1", "Oct 26", "$0.00", "No plan yet~wait"],
    ["Tom W.", "Level 3", "Oct 22", "$500.00", "Active~ok"],
  ],
};

export const inviteKit = [
  ["Short", `Join me on ${site.name}: https://${user.inviteLink}`],
  ["Detailed", `I've been using ${site.name} for automated crypto and forex plans. Sign up with my link to join my team: https://${user.inviteLink} (code ${user.sponsorId})`],
  ["Chat", `*${site.name} invite*\nAutomated trading, crypto and staking plans in one place.\nJoin my team: https://${user.inviteLink}`],
];

/* ---------- Monthly draw ---------- */
export const draw = {
  date: "2026-11-05T18:00:00Z",
  dateLabel: "Nov 05, 2026",
  price: 40,
  packs: [1, 3, 5, 10],
  myTickets: 3,
  entrants: 1842,
  prizes: [
    ["Grand prize", 25000, 1], ["Second prize", 15000, 1], ["Third prize", 10000, 1],
    ["Fourth prize", 5000, 1], ["Fifth prize", 1000, 1], ["Lucky winners", 500, 5], ["Lucky winners", 100, 10],
  ],
};

export const myTickets = [
  ["NV-20481", "$40.00", "Standard", "Nov 05, 2026", "Oct 27, 21:14", "Entered~info"],
  ["NV-20482", "$40.00", "Standard", "Nov 05, 2026", "Oct 27, 21:14", "Entered~info"],
  ["NV-20483", "$40.00", "Standard", "Nov 05, 2026", "Oct 27, 21:14", "Entered~info"],
  ["OC-18027", "$40.00", "Standard", "Oct 05, 2026", "Sep 18, 10:02", "Won $100~ok"],
  ["OC-18028", "$40.00", "Standard", "Oct 05, 2026", "Sep 18, 10:02", "No prize~off"],
];

export const lastDraw = {
  month: "October 2026",
  date: "Oct 05, 2026",
  pool: 60000,
  winners: 18,
  top: [
    ["1st", "Grand prize", 25000, "CAI78638", "QMG061604"],
    ["2nd", "Second prize", 15000, "CAI16646", "JEV706008"],
    ["3rd", "Third prize", 10000, "CAI95320", "IQM726553"],
  ],
  others: [
    ["4th", "CAI91052", "TSF090914", "$5,000.00"],
    ["5th", "CAI53390", "PMW961018", "$1,000.00"],
    ["6th", "CAI18132", "XDH827149", "$500.00"],
    ["6th", "CAI46918", "OTD566342", "$500.00"],
    ["7th", "CAI48213 (you)", "OC-18027", "$100.00"],
    ["7th", "CAI13946", "RWX789248", "$100.00"],
  ],
};

/* ---------- Prestige club ---------- */
export const campaigns = {
  cash: {
    title: "Q4 cash bonus",
    reward: "$2,500 cash",
    ends: "Dec 31, 2026",
    text: "Build qualifying team volume before the end of the quarter to earn a cash reward paid to your Affiliate wallet.",
    goals: [["Team volume", 68400, 100000], ["Personal investment", 15500, 10000], ["Active directs", 10, 10]],
  },
  travel: {
    title: "Leaders retreat, Dubai",
    reward: "5-night trip for two",
    ends: "Feb 28, 2027",
    text: "Flights, hotel and the leaders summit for members who reach the target before the deadline.",
    goals: [["Team volume", 68400, 250000], ["Personal investment", 15500, 25000], ["Active directs", 10, 20]],
  },
  gifts: null,
};

/* ---------- Events ---------- */
export const events = [
  { id: 1, date: "Nov 06", time: "18:00 UTC", title: "Weekly market outlook", type: "Webinar", host: "Research desk", rsvp: true },
  { id: 2, date: "Nov 12", time: "16:00 UTC", title: "Forex pool Q&A with fund managers", type: "AMA", host: "FX team", rsvp: true },
  { id: 3, date: "Nov 20", time: "10:00 UTC", title: "Leaders summit, Vilnius", type: "In person", host: "Leadership", rsvp: false },
  { id: 4, date: "Nov 26", time: "17:00 UTC", title: "Getting started: plans and wallets", type: "Training", host: "Support team", rsvp: false },
];

export const pastEvents = [
  { id: 5, date: "Oct 30", title: "October market recap", type: "Webinar", recording: true },
  { id: 6, date: "Oct 16", title: `${T} staking explained`, type: "Training", recording: true },
];

/* ---------- Reports ---------- */
const day = (n) => `Oct ${String(32 - n).padStart(2, "0")}`;
export const reports = {
  investments: { title: "My investments", lead: "Every plan you hold, with capital and profit to date.", kind: "plans" },
  staking: { title: "My staking", lead: "Your stakes, token releases and unlock dates.", kind: "stakes" },
  profit: { title: "Daily profit", lead: "Profit credited from your crypto and forex plans.", source: "Daily profit",
    rows: profitLedger.map(([d, pkg, rate, amt]) => [d, pkg, rate, amt, "Credited~ok"]), cols: ["Date", "Plan", "Rate", "Amount", "Status"] },
  affiliate: { title: "Affiliate bonus", lead: "Sponsor bonus from members you invited directly.", source: "Affiliate bonus",
    rows: [[day(1), "Maria S.", "Level 1", "+$200.00", "Credited~ok"], [day(4), "Priya R.", "Level 1", "+$40.00", "Credited~ok"], [day(9), "Omar H.", "Level 1", "+$80.00", "Credited~ok"]], cols: ["Date", "From", "Level", "Amount", "Status"] },
  level: { title: "Level bonus", lead: "A share of daily profit earned by your team, by level.", source: "Level bonus",
    rows: [[day(1), "Level 1 · 10 members", "8%", "+$21.40", "Credited~ok"], [day(1), "Level 2 · 24 members", "3%", "+$11.20", "Credited~ok"], [day(1), "Level 3 · 41 members", "1%", "+$5.55", "Credited~ok"]], cols: ["Date", "Source", "Rate", "Amount", "Status"] },
  weekly: { title: "Weekly bonus", lead: "Paid every Monday for the previous week's team target.", source: "Weekly bonus",
    rows: [["Oct 26", "Week 43", "$12,000 target", "+$96.00", "Paid~ok"], ["Oct 19", "Week 42", "$12,000 target", "+$96.00", "Paid~ok"], ["Oct 12", "Week 41", "$10,000 target", "+$92.00", "Paid~ok"]], cols: ["Date", "Period", "Target", "Amount", "Status"] },
  withdraw: { title: "Withdraw bonus", lead: "A bonus when members in your team withdraw profit.", source: "Withdraw bonus",
    rows: [[day(3), "Daniel K.", "Level 2", "+$12.40", "Credited~ok"], [day(7), "Maria S.", "Level 1", "+$25.00", "Credited~ok"]], cols: ["Date", "From", "Level", "Amount", "Status"] },
  rank: { title: "Rank rewards", lead: "Weekly instalments for each rank you reach.", source: "Rank rewards",
    rows: [["Oct 26", "Gold · week 2 of 10", "Gold", "+$75.00", "Paid~ok"], ["Oct 19", "Gold · week 1 of 10", "Gold", "+$75.00", "Paid~ok"]], cols: ["Date", "Reward", "Rank", "Amount", "Status"] },
  all: { title: "All income", lead: "Every credit across profit, bonuses and rewards in one statement.", kind: "all" },
};

export const reportLibrary = [
  ["Wallet & funds", ["Transactions", "Deposits", "Withdrawals", "Transfers"]],
  ["Investments", ["My investments", "My staking", "Draw tickets"]],
  ["Income", ["All income", "Daily profit", "Affiliate bonus", "Level bonus", "Weekly bonus", "Withdraw bonus", "Rank rewards"]],
  ["Team", ["Direct members", "Downline members", "Affiliate tree"]],
];

export const statements = [
  ["October 2026", "$5,700.00", "$3,910.20", "$1,250.00"],
  ["September 2026", "$2,500.00", "$3,410.80", "$1,000.00"],
  ["August 2026", "$8,500.00", "$2,280.40", "$500.00"],
];

/* ---------- Support ---------- */
export const tickets = [
  { id: "T-3092", subject: "Withdrawal processing time", topic: "Withdrawal", updated: "2h ago", status: "In progress~wait" },
  { id: "T-2981", subject: "Change payout address", topic: "Account", updated: "Oct 22", status: "Resolved~ok" },
  { id: "T-2740", subject: "2FA reset after new phone", topic: "Security", updated: "Sep 30", status: "Resolved~ok" },
];

export const ticketTopics = [
  ["deposit", "Deposit", "Missing or delayed deposit"],
  ["withdrawal", "Withdrawal", "Pending or failed payout"],
  ["transfer", "Transfer", "Moving funds between wallets"],
  ["plans", "Plans & staking", "Plans, staking and capital"],
  ["account", "Account", "Profile, login and 2FA"],
  ["other", "Something else", "Anything not listed"],
];

export const help = [
  ["Getting started", "How do I get started?", "Deposit USDT (BEP20) to your Deposit wallet, choose a plan in the Investment Center, then follow daily profit on your dashboard. Share your referral link from the Affiliate Center to build a team."],
  ["Getting started", "What is each wallet for?", "Deposit receives deposits and pays for plans, the bot fee and tickets. Profit receives daily profit. Affiliate receives team bonuses. Withdraw is the only wallet you can withdraw from."],
  ["Deposits", "My deposit hasn't arrived", "Deposits credit after 12 network confirmations, usually within 5 minutes. Check you sent USDT on BNB Smart Chain (BEP20). If it's been over an hour, open a ticket with your transaction hash."],
  ["Withdrawals", "How long do withdrawals take?", "Withdrawals are processed within 96 hours. The minimum is $10. Move funds to your Withdraw wallet first, then request the payout."],
  ["Plans", "How does the 4X earning limit work?", "Each plan adds four times its amount to your earning limit. When total profit and bonuses reach the limit, earnings pause until you start a new plan."],
  ["Plans", "Can I withdraw my principal?", "Yes, with a 15% principal withdrawal fee. The plan stops earning from that day."],
  ["Staking", `How are ${T} staking rewards released?`, "Tokens stay locked for the plan term, then release on the plan's schedule into your Token withdrawal wallet."],
  ["Security", "How do I turn on 2FA?", "Go to Settings → Security and scan the QR code with an authenticator app. 2FA is required for withdrawals and transfers."],
];

export const schedule = [
  ["Daily profit", "Profit on active plans, paid on each plan's payout day.", "Every day, 21:00 UTC", "Today, 21:00 UTC"],
  ["Weekly bonus", "Paid each Monday for the previous Monday to Sunday.", "Mondays, 00:10 UTC", "Nov 09, 00:10 UTC"],
  ["Rank reward: new rank", "Checks for newly reached ranks and pays week 1.", "Every day, 08:00 UTC", "Nov 03, 08:00 UTC"],
  ["Rank reward: weekly", "Pays the next weekly instalment when due.", "Every day, 10:00 UTC", "Nov 03, 10:00 UTC"],
  [`${T} staking release`, "Releases unlocked tokens on each stake's schedule.", "Every day, 00:00 UTC", "Nov 03, 00:00 UTC"],
];

/* ---------- Brand kit ---------- */
export const brandColors = [["Navy", "#040A1E"], ["Blue", "#3B82F6"], ["Cyan", "#22D3EE"], ["Ice", "#E8EEFC"]];
export const assets = [
  { name: "Business presentation", cat: "Presentations", meta: "PDF · 12 pages · 6.4 MB", isNew: true },
  { name: "Logo pack", cat: "Logos", meta: "SVG, PNG · 2.4 MB" },
  { name: "Instagram posts", cat: "Social", meta: "PNG · 12 files · 8.1 MB", isNew: true },
  { name: "Story templates", cat: "Social", meta: "PNG · 6 files · 4.2 MB" },
  { name: "Product explainer", cat: "Videos", meta: "MP4 · 1:42 · 38 MB" },
  { name: "Email templates", cat: "Presentations", meta: "HTML · 0.4 MB" },
];

/* ---------- Settings ---------- */
export const sessions = [
  ["Chrome · Windows", "Vilnius, LT", "Now", "This device~ok"],
  ["Safari · iPhone", "Vilnius, LT", "Nov 01, 21:10", "Active~info"],
  ["Chrome · Windows", "Kaunas, LT", "Oct 28, 07:55", "Signed out~off"],
];

/* ---------- Checkout ---------- */
export const catalogAll = [
  ...catalog.crypto.map((p) => ({ ...p, kind: "crypto" })),
  ...catalog.forex.map((p) => ({ ...p, kind: "forex" })),
  ...catalog.staking.map((p) => ({ ...p, kind: "staking" })),
];

/* ---------- Money movement ---------- */
export const withdrawFees = [["System fee", 5], ["Affiliate distribution", 5], ["Charity fund", 10]];
export const withdrawRules = [
  ["First investment made", true],
  ["Two-factor authentication on", true],
  ["Payout address verified", true],
  ["No withdrawal pending", false],
];

export const depositHistory = [
  ["Oct 29, 10:47", "0x91c4…a3E2", "$5,000.00", "0x8f2a…41bc", "Confirmed~ok"],
  ["Oct 24, 14:12", "0x91c4…a3E2", "$1,200.00", "0x77de…09f1", "Confirmed~ok"],
  ["Oct 18, 10:31", "0x2b7d…c104", "$800.00", "0xa1c3…7e22", "Confirmed~ok"],
  ["Oct 03, 19:45", "0x91c4…a3E2", "$2,500.00", "0x5e90…b3d8", "Confirmed~ok"],
];

export const withdrawHistory = [
  ["Nov 01, 11:20", "0x7a3F…c91E", "$250.00", "$200.00", "Processing~wait"],
  ["Oct 20, 09:12", "0x7a3F…c91E", "$1,000.00", "$800.00", "Paid~ok"],
  ["Oct 06, 16:40", "0x7a3F…c91E", "$750.00", "$600.00", "Paid~ok"],
];

export const transferHistory = [
  ["Oct 31, 16:05", "Profit wallet", "Withdraw wallet", "$400.00", "Completed~ok"],
  ["Oct 19, 08:30", "Affiliate wallet", "Withdraw wallet", "$600.00", "Completed~ok"],
  ["Oct 02, 12:15", "Profit wallet", "Deposit wallet", "$1,000.00", "Completed~ok"],
];

/* ---------- Team ---------- */
export const directMembers = [
  ["Maria S.", "CAI51028", "Oct 31", "$2,500.00", "$2,500.00", "Active~ok"],
  ["Omar H.", "CAI50317", "Oct 14", "$1,000.00", "$4,000.00", "Active~ok"],
  ["Priya R.", "CAI49980", "Oct 26", "—", "$0.00", "No plan yet~wait"],
  ["Lena V.", "CAI49211", "Sep 30", "$5,000.00", "$12,000.00", "Active~ok"],
  ["Jonas P.", "CAI48877", "Sep 12", "$500.00", "$1,500.00", "Active~ok"],
];

export const downline = [
  ["Daniel K.", "Level 2", "Maria S.", "$1,000.00", "Active~ok"],
  ["Tom W.", "Level 3", "Daniel K.", "$500.00", "Active~ok"],
  ["Sara L.", "Level 2", "Lena V.", "$2,500.00", "Active~ok"],
  ["Ahmed N.", "Level 2", "Omar H.", "—", "No plan yet~wait"],
  ["Ines G.", "Level 3", "Sara L.", "$1,000.00", "Active~ok"],
];

// 15 levels; each unlocks with more direct sponsors
export const treeLevels = Array.from({ length: 15 }, (_, i) => {
  const need = i < 3 ? i + 1 : i < 8 ? i + 2 : i + 4;
  const members = [12, 31, 64, 22, 9, 3][i] ?? 0;
  return { level: i + 1, need, members, unlocked: team.activeDirects >= need };
});

export const rank = {
  current: "Gold",
  next: "Platinum",
  goals: [["Self investment", 15500, 25000], ["Team investment", 177800, 250000]],
  weekly: { earned: 96, target: 120, next: "Nov 09, 00:10 UTC" },
};

export const meetingRequests = [
  ["MR-104", "Representative", "Nov 08, 15:00", "Scaling my team in Germany", "Confirmed~ok"],
  ["MR-097", "CEO", "Oct 12, 17:00", "Q4 leaders plan", "Completed~info"],
];
