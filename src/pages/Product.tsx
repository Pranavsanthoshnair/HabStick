import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { productData, Product as ProductType } from '../data/products';
import ScrollAnimation from '../components/ScrollAnimation';

// Product images
export const productImages = {
  habstickPro: [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/6595537/pexels-photo-6595537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'HabStick Pro - Smart navigation device for visually impaired'
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/6963867/pexels-photo-6963867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'HabStick Pro in use - Person with visual impairment using navigation aid'
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'HabStick Pro features - Smart cane technology for navigation'
    }
  ]
};

export default function Product() {
  const { productId } = useParams<{ productId?: string }>();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');
  const { addToCart, showNotification } = useAppContext();
  
  // Get selected product from URL param or default to showing all products
  const selectedProduct = productId ? productData.find(p => p.id === productId) : null;

  // Redirect to product catalog if invalid product ID
  useEffect(() => {
    if (productId && !selectedProduct) {
      navigate('/product');
    }
  }, [productId, selectedProduct, navigate]);

  const handleAddToCart = (product: ProductType) => {
    addToCart(product, 1);
  };

  const handleCustomize = () => {
    showNotification('Product customization options loaded');
  };

  // If we have a product ID but no selected product, show loading
  if (productId && !selectedProduct) {
    return <div className="p-8 text-center">Loading product...</div>;
  }
  
  // Show individual product detail page
  if (selectedProduct) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Product image */}
            <ScrollAnimation type="fade-in" delay={100}>
              <div className="flex flex-col">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                  <img 
                    src={selectedProduct.imageUrl} 
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover object-center shadow-lg"
                  />
                </div>
              </div>
            </ScrollAnimation>

            {/* Product info */}
            <ScrollAnimation type="slide-in" delay={200}>
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{selectedProduct.name}</h1>
                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">₹{selectedProduct.price}</p>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6 text-base text-gray-700">
                    <p>{selectedProduct.description}</p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="btn-primary"
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    onClick={handleCustomize}
                    className="btn-secondary"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </ScrollAnimation>

            {/* Product tabs */}
            <div className="col-span-2 mt-10">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {['overview', 'specifications', 'accessibility'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`
                        whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                        ${selectedTab === tab
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }
                      `}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="mt-8">
                {selectedTab === 'overview' && (
                  <div className="prose prose-sm">
                    <p>{selectedProduct.description}</p>
                  </div>
                )}
                {selectedTab === 'specifications' && (
                  <div className="mt-6">
                    <h3 className="sr-only">Features</h3>
                    <ul className="list-disc space-y-2 pl-5">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="text-gray-500">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedTab === 'accessibility' && (
                  <div className="prose prose-sm">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>High-contrast display with adjustable brightness</li>
                      <li>Voice navigation with customizable voice settings</li>
                      <li>Haptic feedback for obstacle detection</li>
                      <li>Screen reader compatibility</li>
                      <li>Large, easy-to-press buttons with clear labels</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product catalog view - show all products
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">HabStick Products</h2>
        <p className="text-lg text-gray-500 mb-12">Choose the perfect navigation companion for your needs</p>
        
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
          {productData.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 flex flex-col">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    <Link to={`/product/${product.id}`} className="hover:text-blue-500">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-xl font-medium text-gray-900">₹{product.price}</p>
                </div>
                <p className="mt-2 text-sm text-gray-500">{product.description.substring(0, 120)}...</p>
                <div className="mt-4 flex gap-2">
                  <Link 
                    to={`/product/${product.id}`} 
                    className="text-sm font-medium text-blue-500 hover:text-blue-700"
                  >
                    View details
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="ml-auto text-sm font-medium text-blue-500 hover:text-blue-700"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
