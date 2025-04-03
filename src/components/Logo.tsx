import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'medium' }) => {
  // Size mappings
  const sizeMap = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-24 h-24'
  };

  const sizeClass = sizeMap[size];

  return (
    <div className={`logo-container flex items-center ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className={`${sizeClass} transform transition-transform duration-300 hover:scale-110`}
        style={{
          filter: 'drop-shadow(0 0 2px rgba(37, 99, 235, 0.3))',
        }}
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <path
          fill="url(#logo-gradient)"
          d="M12 2C11.448 2 11 2.448 11 3v2.5c0 .39.228.74.586.9l.414.2V8c0 .552.448 1 1 1s1-.448 1-1V6.6l.414-.2c.358-.16.586-.51.586-.9V3c0-.552-.448-1-1-1zm0 7c-1.657 0-3 1.343-3 3v6c0 1.657 1.343 3 3 3s3-1.343 3-3v-6c0-1.657-1.343-3-3-3zm0 2c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1s-1-.448-1-1v-6c0-.552.448-1 1-1z"
        />
      </svg>
    </div>
  );
};

export default Logo;