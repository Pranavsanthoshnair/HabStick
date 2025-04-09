import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { productData } from '../data/products';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-1234567',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'Delivered',
    total: 5000,
    items: [
      { id: 'habstick-pro', name: 'HabStick Pro', price: 5000, quantity: 1 }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      country: 'India'
    },
    paymentMethod: 'Credit Card',
    trackingNumber: 'IND123456789'
  },
  {
    id: 'ORD-7654321',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    status: 'Delivered',
    total: 3000,
    items: [
      { id: 'habstick-lite', name: 'HabStick Lite', price: 3000, quantity: 1 }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      country: 'India'
    },
    paymentMethod: 'UPI',
    trackingNumber: 'IND987654321'
  }
];

export default function Orders() {
  const { isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
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

  // Filter orders by status
  const filteredOrders = filterStatus === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status.toLowerCase() === filterStatus.toLowerCase());
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
            <p className="mt-2 text-sm text-gray-500">
              View the status of recent orders and manage returns.
            </p>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="status-filter" className="mr-2 text-sm font-medium text-gray-700">
              Filter:
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Orders</option>
              <option value="delivered">Delivered</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
            </select>
          </div>
        </div>
        
        {filteredOrders.length === 0 ? (
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
              {filterStatus === 'all' 
                ? "You haven't placed any orders yet."
                : `You don't have any ${filterStatus} orders.`}
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
            {filteredOrders.map((order) => (
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
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="mt-1 text-sm font-medium text-gray-900 text-right">
                      Total: ₹{order.total.toLocaleString('en-IN')}
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
                              <p className="ml-4">₹{item.price.toLocaleString('en-IN')}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <div className="mt-2 flex-1 flex items-end justify-between text-sm">
                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => navigate(`/product/${item.id}`)}
                                className="font-medium text-blue-600 hover:text-blue-500"
                              >
                                View Product
                              </button>
                            </div>
                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-blue-600 hover:text-blue-500"
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
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    {selectedOrder === order.id ? 'Hide Details' : 'View Order Details'}
                  </button>
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Track Package
                  </button>
                </div>
                
                {/* Order Details Section */}
                {selectedOrder === order.id && (
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6 bg-gray-50">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                        <dd className="mt-1 text-sm text-gray-900">{order.id}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Date Placed</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatDate(order.date)}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                        <dd className="mt-1 text-sm text-gray-900">{order.paymentMethod}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Tracking Number</dt>
                        <dd className="mt-1 text-sm text-gray-900">{order.trackingNumber}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {order.shippingAddress.name}<br />
                          {order.shippingAddress.street}<br />
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                          {order.shippingAddress.country}
                        </dd>
                      </div>
                      <div className="sm:col-span-2 border-t border-gray-200 pt-4">
                        <dt className="text-sm font-medium text-gray-500">Need Help?</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <div className="flex space-x-4 mt-2">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Return Item
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Report Problem
                            </button>
                            <button
                              type="button"
                              onClick={() => navigate('/support')}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Contact Support
                            </button>
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}