import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import PaymentCheckout from '../components/PaymentCheckout';

export default function Checkout() {
  const { cart, clearCart, showNotification } = useAppContext();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'India'
  });
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = 100; // ₹100 shipping
  const taxRate = 0.18; // 18% GST
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/product');
      showNotification('Your cart is empty. Please add items to your cart before checkout.', 'info');
    }
    
    // Pre-fill user info if available
    if (currentUser) {
      setShippingAddress(prev => ({
        ...prev,
        name: currentUser.displayName || prev.name
      }));
    }
  }, [cart, navigate, currentUser, showNotification]);
  
  // Redirect if not logged in - only check once when component mounts
  useEffect(() => {
    // Only redirect if not authenticated and cart has items
    if (!isAuthenticated && cart.length > 0) {
      // Store cart items in localStorage before redirecting
      localStorage.setItem('pendingCheckout', 'true');
      showNotification('Please sign in to continue with checkout.');
      navigate('/auth', { state: { returnUrl: '/checkout' } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this only runs once when component mounts
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePaymentSuccess = (paymentId: string, orderId: string, signature: string) => {
    setIsProcessing(true);
    
    // In a real application, you would send this information to your server
    // to verify the payment and create an order in your database
    console.log('Payment successful:', { paymentId, orderId, signature });
    
    setTimeout(() => {
      // Simulate order processing
      clearCart();
      setIsProcessing(false);
      showNotification('Order successful! Order ID: ' + orderId);
      navigate('/orders');
    }, 1500);
  };
  
  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
    showNotification('Payment failed. Please try again.');
    setIsProcessing(false);
  };
  
  // Check if form is valid
  const isFormValid = () => {
    return (
      shippingAddress.name.trim() !== '' &&
      shippingAddress.street.trim() !== '' &&
      shippingAddress.city.trim() !== '' &&
      shippingAddress.state.trim() !== '' &&
      shippingAddress.zip.trim() !== ''
    );
  };
  
  if (cart.length === 0) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Checkout</h2>
        <p className="mt-2 text-lg text-gray-500">
          Complete your order by providing shipping details and payment information.
        </p>
        
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {/* Checkout form */}
          <div className="lg:col-span-7">
            <form>
              {/* Shipping information */}
              <section aria-labelledby="shipping-heading" className="mt-10">
                <h2 id="shipping-heading" className="text-lg font-medium text-gray-900">
                  Shipping Information
                </h2>
                
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={shippingAddress.name}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                      Street address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={shippingAddress.street}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={shippingAddress.zip}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <div className="mt-1">
                      <select
                        id="country"
                        name="country"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Payment method */}
              <section aria-labelledby="payment-heading" className="mt-10">
                <h2 id="payment-heading" className="text-lg font-medium text-gray-900">
                  Payment Method
                </h2>
                
                <div className="mt-6">
                  <div className="flex items-center">
                    <input
                      id="razorpay"
                      name="payment-method"
                      type="radio"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="razorpay" className="ml-3 block text-sm font-medium text-gray-700">
                      Razorpay (Credit/Debit Card, UPI, Netbanking)
                    </label>
                  </div>
                  
                  <div className="mt-6 flex items-center">
                    <input
                      id="cod"
                      name="payment-method"
                      type="radio"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                      Cash on Delivery (COD)
                    </label>
                  </div>
                </div>
              </section>
            </form>
          </div>
          
          {/* Order summary */}
          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Order summary</h3>
              
              <div className="border-b border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.imageUrl || ''}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">₹{item.price.toLocaleString('en-IN')}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="border-b border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-medium text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <p className="text-gray-500">Shipping</p>
                  <p className="font-medium text-gray-900">₹{shippingCost.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <p className="text-gray-500">Tax (18% GST)</p>
                  <p className="font-medium text-gray-900">₹{taxAmount.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
                  <p>Total</p>
                  <p>₹{orderTotal.toLocaleString('en-IN')}</p>
                </div>
              </div>
              
              <div className="px-4 py-6 sm:px-6">
                {paymentMethod === 'razorpay' ? (
                  <PaymentCheckout
                    amount={orderTotal}
                    productName="HabStick Order"
                    productDescription={`Order with ${cart.length} item(s)`}
                    onSuccess={handlePaymentSuccess}
                    onFailure={handlePaymentFailure}
                  />
                ) : (
                  <button
                    type="button"
                    disabled={!isFormValid() || isProcessing}
                    onClick={() => {
                      if (isFormValid()) {
                        setIsProcessing(true);
                        setTimeout(() => {
                          clearCart();
                          setIsProcessing(false);
                          showNotification('Order placed successfully! You will pay on delivery.');
                          navigate('/orders');
                        }, 1500);
                      } else {
                        showNotification('Please fill in all required fields.');
                      }
                    }}
                    className={`w-full rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 ${
                      (!isFormValid() || isProcessing) ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order (Cash on Delivery)'}
                  </button>
                )}
                
                <p className="mt-6 text-center text-sm text-gray-500">
                  By placing an order, you agree to our{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
