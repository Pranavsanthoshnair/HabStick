import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { updateProfile } from 'firebase/auth';
import LocationMap from '../components/LocationMap';

export default function Profile() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { showNotification } = useAppContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (currentUser) {
      setName(currentUser.displayName || '');
    }
  }, [isAuthenticated, navigate, currentUser]);
  
  if (!currentUser) {
    return null; // Don't render anything if not logged in (will redirect)
  }
  
  // Format date based on user metadata
  const formatJoinDate = () => {
    if (currentUser?.metadata?.creationTime) {
      return new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Unknown';
  };
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() === '' || !currentUser) {
      return;
    }
    
    setIsEditing(true);
    
    try {
      await updateProfile(currentUser, {
        displayName: name
      });
      
      showNotification('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      showNotification('Failed to update profile. Please try again.');
    } finally {
      setIsEditing(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary, #111827)' }}>Your Profile</h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary, #6b7280)' }}>
          Manage your account settings and preferences.
        </p>
        
        <div className="mt-8 shadow overflow-hidden sm:rounded-lg" style={{ background: 'var(--bg-secondary, #ffffff)', borderColor: 'var(--card-border, #e5e7eb)' }}>
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium" style={{ color: 'var(--text-primary, #111827)' }}>Account Information</h2>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                Your personal details and preferences.
              </p>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-gray-50"  style={{ background: 'var(--bg-primary, #ffffff)', color: 'var(--text-primary, #374151)', borderColor: 'var(--border-color, #e5e7eb)' }}
              >
                Edit Profile
              </button>
            )}
          </div>
          
          <div className="border-t border-gray-200">
            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" style={{ background: 'var(--input-bg, #ffffff)', color: 'var(--input-text, #111827)', borderColor: 'var(--border-color, #e5e7eb)' }}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={currentUser.email || ''}
                      disabled
                      className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3" style={{ background: 'var(--bg-secondary, #f3f4f6)', color: 'var(--text-tertiary, #6b7280)', borderColor: 'var(--border-color, #e5e7eb)' }}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Email cannot be changed. Please contact support for assistance.
                    </p>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-gray-50"  style={{ background: 'var(--bg-primary, #ffffff)', color: 'var(--text-primary, #374151)', borderColor: 'var(--border-color, #e5e7eb)' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-blue-700" style={{ background: 'var(--button-primary, #3b82f6)', color: 'var(--button-text, #ffffff)' }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <dl>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" style={{ background: 'var(--bg-secondary, #f9fafb)' }}>
                  <dt className="text-sm font-medium" style={{ color: 'var(--text-secondary, #6b7280)' }}>Full name</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2" style={{ color: 'var(--text-primary, #111827)' }}>{currentUser.displayName || 'Unknown'}</dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" style={{ background: 'var(--bg-primary, #ffffff)' }}>
                  <dt className="text-sm font-medium" style={{ color: 'var(--text-secondary, #6b7280)' }}>Email address</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2" style={{ color: 'var(--text-primary, #111827)' }}>{currentUser.email || 'Unknown'}</dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" style={{ background: 'var(--bg-secondary, #f9fafb)' }}>
                  <dt className="text-sm font-medium" style={{ color: 'var(--text-secondary, #6b7280)' }}>Member since</dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2" style={{ color: 'var(--text-primary, #111827)' }}>{formatJoinDate()}</dd>
                </div>
              </dl>
            )}
          </div>
        </div>
        
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
              <p className="mt-1 text-sm text-gray-500">
                View your recent purchases and order status.
              </p>
            </div>
            <button
              onClick={() => navigate('/orders')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View All Orders
            </button>
          </div>
          <div className="border-t border-gray-200">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ORD-1234567
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹5,000.00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => navigate('/orders')} className="text-blue-600 hover:text-blue-900">
                        Details
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ORD-7654321
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹3,000.00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => navigate('/orders')} className="text-blue-600 hover:text-blue-900">
                        Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <p>Need help with an order?</p>
              </div>
              <button
                onClick={() => navigate('/support')}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Device Statistics</h2>
            <p className="mt-1 text-sm text-gray-500">
              View your HabStick device information and recordings.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Live Location</h3>
            <LocationMap className="mb-6" />
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Battery Status</h3>
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">85%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Usage Statistics</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Distance</span>
                    <span className="text-sm font-medium">12.5 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Time</span>
                    <span className="text-sm font-medium">5.2 hours</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Recent Recordings</h3>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Morning Walk</h4>
                      <p className="text-xs text-gray-500">Today, 8:30 AM - 9:00 AM</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Recording
                    </button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Evening Route</h4>
                      <p className="text-xs text-gray-500">Yesterday, 5:15 PM - 5:45 PM</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Recording
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Account Actions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account settings and security.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Change Password</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Update your password for enhanced security.</p>
                </div>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Change Password
                </button>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-red-500">Delete Account</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Once you delete your account, there is no going back. Please be certain.</p>
                </div>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Sign Out</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Sign out from your account on this device.</p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}