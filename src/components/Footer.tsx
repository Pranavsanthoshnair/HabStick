import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">HabStick</h3>
            <p className="mt-4 text-base text-gray-500">
              Making navigation accessible and intuitive for everyone.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Products</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/products" className="text-base text-gray-500 hover:text-gray-900">
                  HabStick Pro
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-base text-gray-500 hover:text-gray-900">
                  HabStick Max
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-base text-gray-500 hover:text-gray-900">
                  HabStick Mini
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/support" className="text-base text-gray-500 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-base text-gray-500 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} HabStick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
