/* Brand & global settings, change the name, domain or token here once. */
export const site = {
  name: "Crypto-AI",
  domain: "crypto-ai.com",
  email: "support@crypto-ai.com",
  token: {
    symbol: "CAI",
    name: "Crypto-AI Token",
    supply: 210_000_000,
    price: 0.005,
    bonus: 6,
    network: "BNB Smart Chain (BEP20)",
    // TODO: replace with the client's deployed contract address
    contract: "0x0000000000000000000000000000000000000000",
  },
  company: "Crypto-AI LLC",
  restricted: "United States, Canada and the United Arab Emirates",
};

export const nav = [
  { label: "Products", to: "/#products" },
  { label: "How it works", to: "/#how-it-works" },
  { label: "Pricing", to: "/pricing" },
  { label: "Token", to: "/token" },
  { label: "FAQ", to: "/#faq" },
];
