export type PaymentProvider = "paystack" | "flutterwave" | "mock";

export interface PaymentIntent {
  provider: PaymentProvider;
  reference: string;
  amount: number;
  currency: string;
  status: "pending" | "successful" | "failed";
}

export function createMockPaymentIntent(amount: number, currency = "NGN"): PaymentIntent {
  return {
    provider: "mock",
    reference: `PAY-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    amount,
    currency,
    status: "pending",
  };
}

export function verifyProviderStatus(reference: string, status: string) {
  return reference && status === "successful";
}
