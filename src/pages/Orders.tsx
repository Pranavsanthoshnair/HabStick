import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { productData } from '../data/products';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-1234567',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 7 days ago
    status: 'Delivered',
    total: 299.99,
    items: [
      { id: 'habstick-pro', name: 'HabStick Pro', price: 5000, quantity: 1 }
    ]
  },
  {
    id: 'ORD-7654321',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 30 days ago
    status: 'Delivered',
    total: 199.99,
    items: [
      { id: 'habstick-lite', name: 'HabStick Lite', price: 3000, quantity: 1 }
    ]
  }
];

export default function Orders() {
  const { isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Don't render anything if not logged in (will redirect)
  }
  
  // Get product image URLs
  const getProductImage = (productId: string) => {
    const product = productData.find(p => p.id === productId);
    return product?.imageUrl || '';
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        <p className="mt-2 text-sm text-gray-500">
          View the status of recent orders and manage returns.
        </p>
        
        {mockOrders.length === 0 ? (
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't placed any orders yet.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => navigate('/product')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Products
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            {mockOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white shadow overflow-hidden sm:rounded-lg"
              >
                <div className="px-4 py-5 sm:px-6 flex justify-between flex-wrap">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      Order #{order.id}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Placed on {order.date}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.status}
                    </span>
                    <p className="mt-1 text-sm font-medium text-gray-900 text-right">
                      Total: ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200">
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id} className="px-4 py-4 sm:px-6 flex items-center hover:bg-gray-50">
                        <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={getProductImage(item.id)}
                            alt={item.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-sm font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">₹{item.price.toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <div className="mt-2 flex-1 flex items-end justify-between text-sm">
                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-blue-600 hover:text-blue-500"
                              >
                                View Product
                              </button>
                            </div>
                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-gray-600 hover:text-gray-500"
                              >
                                Buy Again
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6 flex justify-between">
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View Order Details
                  </button>
                  <button
                    type="button"
                    className="text-sm font-medium text-gray-600 hover:text-gray-500"
                  >
                    Track Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}