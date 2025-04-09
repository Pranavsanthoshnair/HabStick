import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { initializePayment, getRazorpayKeyId, loadRazorpayScript, PaymentOptions } from '../services/razorpay';
import Confetti from './Confetti';

interface PaymentCheckoutProps {
  amount: number;
  productName: string;
  productDescription: string;
  onSuccess?: (paymentId: string, orderId: string, signature: string) => void;
  onFailure?: (error: any) => void;
}

export default function PaymentCheckout({
  amount,
  productName,
  productDescription,
  onSuccess,
  onFailure
}: PaymentCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();
  const { showNotification } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Load Razorpay script
    const loadScript = async () => {
      setIsLoading(true);
      const loaded = await loadRazorpayScript();
      setIsRazorpayLoaded(loaded);
      setIsLoading(false);
      
      if (!loaded) {
        showNotification('Failed to load payment gateway. Please try again.', 'error');
      }
    };
    
    loadScript();
  }, [showNotification]);

  const handlePayment = () => {
    if (!isRazorpayLoaded) {
      showNotification('Payment gateway is not loaded. Please try again.', 'error');
      return;
    }

    if (!isAuthenticated) {
      showNotification('Please sign in to continue with the payment.');
      navigate('/auth');
      return;
    }

    setIsLoading(true);

    // In a real application, you would make an API call to your server
    // to create an order and get an order_id
    // For demo purposes, we'll generate a fake order ID
    const fakeOrderId = 'order_' + Math.random().toString(36).substring(2, 15);

    try {
      // Configure payment options
      const options: PaymentOptions = {
        key: getRazorpayKeyId(),
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'HabStick',
        description: productDescription || `Payment for ${productName}`,
        order_id: fakeOrderId, // In production, this should come from your server
        prefill: {
          name: currentUser?.displayName || '',
          email: currentUser?.email || '',
          contact: currentUser?.phoneNumber || '',
        },
        theme: {
          color: '#3b82f6', // Blue color matching your theme
        },
        handler: function (response: any) {
          // Handle successful payment
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          
          if (onSuccess) {
            onSuccess(razorpay_payment_id, razorpay_order_id, razorpay_signature);
          }
          
          setIsLoading(false);
          setPaymentSuccess(true);
        },
      };

      const razorpayCheckout = initializePayment(options);
      
      // Add event handlers
      razorpayCheckout.on('payment.failed', function (response: any) {
        showNotification('Payment failed. Please try again.', 'error');
        setIsLoading(false);
        if (onFailure) onFailure(response.error);
      });
    } catch (error) {
      console.error('Error initializing payment:', error);
      showNotification('Failed to initialize payment. Please try again.', 'error');
      setIsLoading(false);
      if (onFailure) onFailure(error);
    }
  };

  return (
    <div className="mt-6">
      <Confetti active={paymentSuccess} />
      
      <button
        type="button"
        onClick={handlePayment}
        disabled={isLoading || !isRazorpayLoaded}
        className={`w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isLoading || !isRazorpayLoaded ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : !isRazorpayLoaded ? (
          'Loading Payment Gateway...'
        ) : (
          <>
            Pay ₹{amount.toLocaleString('en-IN')}
          </>
        )}
      </button>
      <p className="mt-2 text-xs text-gray-500 text-center">
        Secure payment powered by Razorpay
      </p>
      
      {paymentSuccess && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700 animate-fade-in">
          <p className="font-medium">Payment Successful!</p>
          <p className="text-sm mt-1">Thank you for your purchase.</p>
        </div>
      )}
    </div>
  );
}
