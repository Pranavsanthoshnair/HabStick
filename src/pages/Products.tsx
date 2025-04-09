import { Link } from 'react-router-dom';

const products = [
  {
    id: 'habstick-pro',
    name: 'HabStick Pro',
    price: '₹7,999',
    description: 'Professional-grade navigation aid with advanced features.',
    features: [
      'Advanced obstacle detection',
      'Voice navigation',
      'GPS integration',
      'Emergency alert system',
      'Long battery life',
      'Water-resistant'
    ]
  },
  {
    id: 'habstick-max',
    name: 'HabStick Max',
    price: '₹9,999',
    description: 'Our most advanced navigation aid with premium features.',
    features: [
      'Premium obstacle detection',
      'Advanced voice navigation',
      'Real-time GPS tracking',
      'SOS emergency system',
      'Extended battery life',
      'Waterproof design'
    ]
  },
  {
    id: 'habstick-mini',
    name: 'HabStick Mini',
    price: '₹4,999',
    description: 'Compact and affordable navigation aid for everyday use.',
    features: [
      'Basic obstacle detection',
      'Voice feedback',
      'Portable design',
      'Emergency alerts',
      'Standard battery life',
      'Splash-resistant'
    ]
  }
];

export default function Products() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Choose the HabStick that's right for you
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full bg-gray-200 rounded-lg overflow-hidden aspect-w-1 aspect-h-1">
                <div className="h-full bg-blue-600 opacity-10"></div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-500 flex items-center">
                    <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
