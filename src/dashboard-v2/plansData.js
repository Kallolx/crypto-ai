import { RiSeedlingFill, RiLeafFill, RiFlashlightFill, RiVipCrownFill } from "react-icons/ri";

/* Sample plan catalogue for the demo. No rates or returns are shown anywhere. */
export const planList = [
  {
    id: "starter", name: "Starter", Icon: RiSeedlingFill, status: "active", progress: 72,
    summary: "A simple first plan with the essentials.",
    perks: ["Basic reports", "Email support"],
    includes: ["Monthly summary report", "Email support within a day", "Plan dashboard access", "Standard security checks"],
  },
  {
    id: "growth", name: "Growth", Icon: RiLeafFill, status: "active", progress: 48,
    summary: "More reporting and faster support for active users.",
    perks: ["Weekly reports", "Priority support"],
    includes: ["Weekly summary report", "Priority email and chat support", "Plan dashboard access", "Standard security checks", "Activity export"],
  },
  {
    id: "premium", name: "Premium", Icon: RiFlashlightFill, status: "active", progress: 31,
    summary: "Daily reporting and a dedicated contact.",
    perks: ["Daily reports", "Dedicated contact"],
    includes: ["Daily summary report", "A dedicated contact person", "Plan dashboard access", "Enhanced security checks", "Activity export", "Early access to features"],
  },
  {
    id: "elite", name: "Elite", Icon: RiVipCrownFill, status: "done", progress: 100,
    summary: "Full reporting with a VIP support desk.",
    perks: ["Full reports", "VIP desk"],
    includes: ["Full real-time reporting", "VIP support desk, every day", "Plan dashboard access", "Enhanced security checks", "Activity export", "Early access to features", "Invitations to member events"],
  },
];

export const findPlan = (id) => planList.find((p) => p.id === id);

export const planFaq = [
  ["Can I add to a plan later?", "Yes. Open the plan and choose Invest more. Each addition is shown separately in your plan history."],
  ["Where do I see my plan history?", "Every plan keeps its own timeline and documents on its details page."],
  ["Who can help if something looks wrong?", "Use Support from the menu. Include the plan name and we will look at it with you."],
];

export const planDocs = ["Plan terms", "Fee schedule", "Risk disclosure"];
