// FAQ data array with type safety
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
export const FAQ_DATA: FAQItem[] = [
  {
    id: "item-1",
    question: "What is BlackTree.TV?",
    answer:
      "BlackTree.TV is a premium streaming platform delivering high-quality movies, live broadcasts, exclusive interviews, and entertainment content directly to your devices.",
  },
  {
    id: "item-2",
    question: "How do I subscribe to a premium plan?",
    answer:
      "Click on the 'Subscribe Now' button in the navigation bar to view our available pricing tiers. Follow the secure checkout process to instantly activate your premium access.",
  },
  {
    id: "item-3",
    question: "Can I watch live streams on my tablet or mobile device?",
    answer:
      "Yes, our platform is fully optimized and 100% responsive across all desktop, tablet, and mobile device browsers.",
  },
  {
    id: "item-4",
    question: "How do I cancel my subscription?",
    answer:
      "You can manage or cancel your subscription at any time through your Account Settings under the 'Billing' tab. Your premium access will remain active until the end of your current billing cycle.",
  },
  {
    id: "item-5",
    question: "I am having trouble logging in. What should I do?",
    answer:
      "Ensure your email and password match your registration details. If you forgot your password, click the 'Forgot Password' link on the login page to securely reset it.",
  },
];
