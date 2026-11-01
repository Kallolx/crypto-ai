/* Draft legal copy built from the published plan terms.
   IMPORTANT: replace with text approved by the client's legal counsel before launch. */
const updated = "November 1, 2026";

export const legal = {
  terms: {
    crumb: "Terms & Conditions",
    title: ["Terms &", "Conditions"],
    lead: "The rules that apply when you use the platform, make deposits and request withdrawals.",
    updated,
    glance: [
      ["Minimum investment", "$50 crypto · $100 forex"],
      ["Payment asset", "USDT (BEP20)"],
      ["Payout processing", "Within 96 hours"],
      ["Principal withdrawal fee", "15%"],
    ],
    sections: [
      {
        title: "Eligibility",
        text: "The platform is not available to residents of the United States, Canada or the United Arab Emirates. You are responsible for checking that using the service is lawful where you live.",
        points: ["You must be at least 18 years old.", "You may hold one account only.", "We may ask you to verify your identity before processing payouts."],
      },
      {
        title: "Your account",
        text: "You are responsible for everything that happens under your account and for keeping your credentials safe.",
        points: ["Turn on two-factor authentication.", "Never share your password or one-time codes.", "Tell us immediately if you suspect unauthorised access."],
      },
      {
        title: "Deposits",
        text: "Deposits are made in USDT on BNB Smart Chain (BEP20). Sending funds on a different network may result in permanent loss that we cannot reverse.",
        points: ["Minimum investment is $50 for crypto plans and $100 for forex plans.", "Always check the network and address before sending.", "Deposits appear after the network confirms the transaction."],
      },
      {
        title: "Plans and rates",
        text: "Plan rates are target ranges, not guaranteed returns. Crypto plans distribute daily and forex plans distribute weekly or monthly.",
        points: ["Forex plans include a $30 trading-bot fee.", "Actual results can be lower than the target and can be negative.", "We may adjust plans with notice to existing users."],
      },
      {
        title: "Earnings cap",
        text: "Passive investors are capped at 4X their investment. Active affiliates who refer at least two people per month may earn up to 10X through affiliate bonuses.",
        points: ["Once a cap is reached, further earnings on that investment stop.", "Caps are measured against your original investment amount."],
      },
      {
        title: "Withdrawals",
        text: "Profit withdrawals start from $10 and are processed within 96 hours. Withdrawing principal carries a 15% fee.",
        points: ["Requests may be delayed for security or compliance checks.", "Withdrawals are sent to the wallet address you provide.", "We cannot recover funds sent to a wrong address you entered."],
      },
      {
        title: "Changes and termination",
        text: "We may update these terms from time to time. Continued use after a change means you accept the updated terms. We may suspend accounts that breach the rules or the law.",
      },
    ],
  },

  privacy: {
    crumb: "Privacy Policy",
    title: ["Privacy", "Policy"],
    lead: "What information we collect, why we collect it and how you can control it.",
    updated,
    glance: [
      ["Data we sell", "None"],
      ["Account security", "2FA supported"],
      ["Data requests", "Answered via support"],
      ["Retention", "While active + legal period"],
    ],
    sections: [
      {
        title: "Information we collect",
        text: "We collect the details you give us and the activity needed to run your wallets, investments and reports.",
        points: ["Name, email address and phone number.", "Referral and team information.", "Deposit, withdrawal and transaction history.", "Device and log data used for security."],
      },
      {
        title: "How we use it",
        text: "To create and secure your account, process deposits and withdrawals, send service messages and meet legal and compliance obligations.",
        points: ["Operating and improving the platform.", "Detecting fraud and abuse.", "Responding to support requests."],
      },
      {
        title: "Sharing",
        text: "We only share data with service providers that help us run the platform, or when the law requires it. We do not sell personal data.",
      },
      {
        title: "Cookies",
        text: "We use essential cookies to keep you signed in and remember basic preferences. We do not use advertising cookies on this site.",
      },
      {
        title: "Retention",
        text: "We keep information for as long as your account is active and for the period required by applicable regulation.",
      },
      {
        title: "Your rights",
        text: "You can ask to access, correct or delete your personal data, or object to how we use it.",
        points: ["Contact support from your registered email.", "We aim to respond within 30 days."],
      },
    ],
  },

  risk: {
    crumb: "Risk Disclosure",
    title: ["Risk", "Disclosure"],
    lead: "Please read this carefully before you invest. Trading carries a high level of risk.",
    updated,
    glance: [
      ["Returns", "Not guaranteed"],
      ["Capital", "May be lost in full"],
      ["Token", "Utility only, not equity"],
      ["Past performance", "No indicator of future"],
    ],
    sections: [
      {
        title: "You can lose money",
        text: "Trading cryptocurrencies and foreign exchange is volatile. You may lose some or all of your invested capital. Only invest what you can afford to lose.",
      },
      {
        title: "No guaranteed returns",
        text: "Advertised rates are targets, not guarantees. Past performance does not indicate future results, and reported accuracy figures are win-rate measures, not measures of profitability.",
        points: ["A high win rate does not mean a strategy is profitable.", "Calculator results are illustrations, not forecasts."],
      },
      {
        title: "Market and technology risk",
        text: "Prices can move sharply and quickly. Automated systems can fail, behave unexpectedly or be affected by outages, latency and third-party providers.",
      },
      {
        title: "Token risk",
        text: "The utility token is not equity and gives no claim on platform profits. Its desk price is not a guaranteed market value, and exchange listing, liquidity and redemption are not guaranteed. Smart contracts can contain bugs.",
      },
      {
        title: "Withdrawal costs and limits",
        text: "Principal withdrawals carry a 15% fee, earnings are capped and payouts can take up to 96 hours.",
      },
      {
        title: "Referral programmes",
        text: "Referral bonuses depend on other people joining and are not a source of guaranteed income. Do not invest based on expected referral earnings.",
      },
    ],
  },
};
