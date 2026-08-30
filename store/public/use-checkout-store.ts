import { create } from "zustand";

export interface CheckoutPayload {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

interface CheckoutState {
  isSubmitting: boolean;
  submitSubscription: (data: CheckoutPayload) => Promise<void>;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  isSubmitting: false,
  submitSubscription: async (data) => {
    set({ isSubmitting: true });

    // Simulate API network roundtrip latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(
      "Subscription payload successfully committed to Zustand:",
      data,
    );

    set({ isSubmitting: false });
  },
}));
