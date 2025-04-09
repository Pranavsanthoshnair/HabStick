import { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate scroll progress
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(scrollPx / winHeightPx * 100);
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);

    // Initial call
    updateScrollProgress();

    // Cleanup
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        backgroundColor: 'rgba(37, 99, 235, 0.1)', // Light blue background
        zIndex: 1000,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${scrollProgress}%`,
          backgroundColor: '#2563eb', // Blue-600 color
          transition: 'width 0.1s ease-out',
          backgroundImage: 'linear-gradient(to right, #2563eb, #3b82f6)', // Blue gradient
          boxShadow: '0 0 8px rgba(37, 99, 235, 0.5)', // Glowing effect
        }}
      />
    </div>
  );
};

export default ScrollProgress;
