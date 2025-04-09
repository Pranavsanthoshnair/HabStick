import React, { CSSProperties, ReactElement } from 'react';

interface FloatingElementsProps {
  count?: number;
  className?: string;
  icons?: ReactElement[];
}

export default function FloatingElements({
  count = 10,
  className = '',
  icons = []
}: FloatingElementsProps) {
  // Default icons if none provided
  const defaultIcons = [
    <svg key="1" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
    </svg>,
    <svg key="2" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
    </svg>,
    <svg key="3" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
    </svg>,
    <svg key="4" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
    </svg>,
    <svg key="5" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
    </svg>
  ];

  // Use provided icons or default ones
  const elementsToRender = icons.length > 0 ? icons : defaultIcons;
  
  // Generate random positions and animations for each element
  const elements = Array.from({ length: count }).map((_, index) => {
    const randomIcon = elementsToRender[index % elementsToRender.length];
    const size = Math.floor(Math.random() * 20) + 10; // 10px to 30px
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10; // 10s to 20s
    const startX = Math.random() * 100; // 0% to 100% of parent width
    const startY = Math.random() * 100; // 0% to 100% of parent height
    const opacity = Math.random() * 0.5 + 0.1; // 0.1 to 0.6
    
    const elementStyle: CSSProperties = {
      left: `${startX}%`,
      top: `${startY}%`,
      width: `${size}px`,
      height: `${size}px`,
      opacity,
      color: `hsl(${Math.random() * 360}, 70%, 70%)`,
      animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      transform: `rotate(${Math.random() * 360}deg)`,
    };
    
    return (
      <div
        key={index}
        className="absolute"
        style={elementStyle}
      >
        {React.cloneElement(randomIcon, {
          className: `w-full h-full ${randomIcon.props.className || ''}`,
        })}
      </div>
    );
  });

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements}
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(10deg);
            }
            100% {
              transform: translateY(0px) rotate(0deg);
            }
          }
        `}
      </style>
    </div>
  );
}
