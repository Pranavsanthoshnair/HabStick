// Razorpay client-side integration
// Note: In a production app, order creation should happen on your server

// Your Razorpay key ID (replace with your actual key in production)
const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_yourtestkeyid';

// Interface for payment options
export interface PaymentOptions {
  key: string;
  amount: number; // amount in paise
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  handler?: (response: any) => void;
}

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initializePayment = (options: PaymentOptions) => {
  // Check if Razorpay is loaded
  if (!(window as any).Razorpay) {
    throw new Error('Razorpay SDK is not loaded. Please call loadRazorpayScript first.');
  }
  
  const razorpay = new (window as any).Razorpay(options);
  razorpay.open();
  return razorpay;
};

// Get Razorpay key ID
export const getRazorpayKeyId = () => razorpayKeyId;

export default {
  loadRazorpayScript,
  initializePayment,
  getRazorpayKeyId,
};
