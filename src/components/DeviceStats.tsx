interface DeviceStatsProps {
  className?: string;
}

export default function DeviceStats({ className = '' }: DeviceStatsProps) {
  // Mock data - In a real app, this would come from your device/backend
  const deviceStats = {
    batteryLevel: 92,
    activeUsers: 2750,
    totalDistance: '30k',
    activeTime: '8.5h'
  };

  return (
    <div className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 sm:py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">HabStick Global Stats</h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 text-center">
          <div className="p-2 sm:p-3">
            <div className="text-2xl sm:text-3xl font-bold">{deviceStats.batteryLevel}%</div>
            <div className="text-xs sm:text-sm mt-1 text-blue-100">Average Battery Life</div>
          </div>
          <div className="p-2 sm:p-3">
            <div className="text-2xl sm:text-3xl font-bold">{deviceStats.activeUsers}</div>
            <div className="text-xs sm:text-sm mt-1 text-blue-100">Active Users</div>
          </div>
          <div className="p-2 sm:p-3">
            <div className="text-2xl sm:text-3xl font-bold">{deviceStats.totalDistance}</div>
            <div className="text-xs sm:text-sm mt-1 text-blue-100">Total Distance</div>
          </div>
          <div className="p-2 sm:p-3">
            <div className="text-2xl sm:text-3xl font-bold">{deviceStats.activeTime}</div>
            <div className="text-xs sm:text-sm mt-1 text-blue-100">Active Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Removing unused React import