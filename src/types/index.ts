export interface CheckoutFormData {
  fullName: string;
  email: string;
  mobile: string;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
  productName: string;
  error?: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  orderId: string;
  downloadToken: string;
  error?: string;
}

export interface OrderDetails {
  id: string;
  customerName: string;
  email: string;
  productName: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  paidAt: string | null;
  createdAt: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      close: () => void;
    };
  }
}
