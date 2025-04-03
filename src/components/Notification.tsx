// Remove React import as it's not needed with modern JSX transform
import { useAppContext } from '../context/AppContext';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Notification = () => {
  const { notifications, removeNotification } = useAppContext();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center justify-between p-4 rounded-lg shadow-lg max-w-md transform transition-all duration-500 animate-fade-in ${
            notification.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : notification.type === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
            ) : notification.type === 'error' ? (
              <XCircleIcon className="h-5 w-5 text-red-500 mr-3" />
            ) : (
              <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-3" />
            )}
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
// Removed the duplicate export declaration
