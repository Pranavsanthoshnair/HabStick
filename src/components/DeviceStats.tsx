interface DeviceStatsProps {
  className?: string;
}

export default function DeviceStats({ className = '' }: DeviceStatsProps) {
  // Mock data - In a real app, this would come from your device/backend
  const deviceStats = {
    batteryLevel: 85,
    activeUsers: 1250,
    totalDistance: '12.5k',
    activeTime: '5.2h'
  };

  return (
    <div className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8">HabStick Global Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold">{deviceStats.batteryLevel}%</div>
            <div className="text-sm mt-1 text-blue-100">Average Battery Life</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{deviceStats.activeUsers}</div>
            <div className="text-sm mt-1 text-blue-100">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{deviceStats.totalDistance}</div>
            <div className="text-sm mt-1 text-blue-100">Total Distance</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{deviceStats.activeTime}</div>
            <div className="text-sm mt-1 text-blue-100">Active Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Removing unused React import