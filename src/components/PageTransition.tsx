import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
      setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 300); // This should match the CSS transition time
    }
  }, [location, displayLocation]);

  return (
    <div className={`transition-wrapper ${transitionStage}`}>
      {children}
      <style>
        {`
          .transition-wrapper {
            position: relative;
            transition: opacity 0.3s ease-in-out;
          }
          .fadeIn {
            opacity: 1;
          }
          .fadeOut {
            opacity: 0;
          }
        `}
      </style>
    </div>
  );
}
