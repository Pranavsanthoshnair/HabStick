import { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  depth?: number; // Controls parallax intensity (0-1)
  className?: string;
}

export default function ParallaxSection({
  children,
  depth = 0.3,
  className = '',
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrolled = window.scrollY;
      const rect = sectionRef.current.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      
      // Only apply parallax when element is in view
      if (scrolled + window.innerHeight > elementTop && 
          scrolled < elementTop + rect.height) {
        const offset = (scrolled - elementTop) * depth;
        sectionRef.current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [depth]);

  return (
    <div
      ref={sectionRef}
      className={`parallax-section ${className}`}
    >
      {children}
      <style>
        {`
          .parallax-section {
            position: relative;
            will-change: transform;
            transform-style: preserve-3d;
            backface-visibility: hidden;
            transition: transform 0.1s ease-out;
          }
        `}
      </style>
    </div>
  );
}