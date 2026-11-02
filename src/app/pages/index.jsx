import Investments from "./Investments";
import Earnings from "./Earnings";
import { AffiliateOverview, DirectMembers, Downline, AffiliateTree, AffiliateStatus } from "./Affiliate";
import { WalletOverview, Deposit, Withdraw, Transfer, Transactions } from "./Wallet";
import ReportCenter from "./ReportCenter";
import PlansPage from "./Plans";
import { BuyTickets, MyTickets, DrawResults } from "./Draw";
import Club from "./Club";
import Events, { MeetingRequest } from "./Events";
import Report from "./Report";
import { SupportCenter, HelpCenter, RewardSchedule } from "./Support";
import BrandKit from "./BrandKit";
import Settings from "./Settings";
import { reports } from "../data";

/* Path (relative to /dashboard) -> page element. Keys match the sidebar routes in nav.js. */
export const pageFor = {
  investments: <Investments />,
  earnings: <Earnings />,
  affiliate: <AffiliateOverview />,
  "affiliate/directs": <DirectMembers />,
  "affiliate/downline": <Downline />,
  "affiliate/tree": <AffiliateTree />,
  "affiliate/status": <AffiliateStatus />,
  wallet: <WalletOverview />,
  "wallet/deposit": <Deposit />,
  "wallet/withdraw": <Withdraw />,
  "wallet/transfer": <Transfer />,
  "wallet/transactions": <Transactions />,
  "report-center": <ReportCenter />,
  "plans/crypto": <PlansPage kind="crypto" />,
  "plans/forex": <PlansPage kind="forex" />,
  "plans/staking": <PlansPage kind="staking" />,
  "draw/buy": <BuyTickets />,
  "draw/tickets": <MyTickets />,
  "draw/results": <DrawResults />,
  "club/cash": <Club kind="cash" />,
  "club/travel": <Club kind="travel" />,
  "club/gifts": <Club kind="gifts" />,
  events: <Events />,
  "events/request": <MeetingRequest />,
  "support/center": <SupportCenter />,
  "support/help": <HelpCenter />,
  "support/schedule": <RewardSchedule />,
  "brand-kit": <BrandKit />,
  settings: <Settings />,
  ...Object.fromEntries(Object.keys(reports).map((slug) => [`reports/${slug}`, <Report slug={slug} />])),
};
