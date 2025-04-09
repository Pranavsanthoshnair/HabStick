import { useEffect, useState } from 'react';

interface CursorEffectProps {
  color?: string;
  size?: number;
  trailLength?: number;
  trailFade?: number;
  zIndex?: number;
}

export default function CursorEffect({
  color = '#3b82f6',
  size = 20,
  trailLength = 10,
  trailFade = 0.8,
  zIndex = 9999
}: CursorEffectProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; opacity: number }[]>([]);
  
  useEffect(() => {
    // Create trail array
    const initialTrail = Array(trailLength).fill({ x: 0, y: 0, opacity: 0 });
    setTrail(initialTrail);
    
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Update trail
      setTrail(prevTrail => {
        const newTrail = [...prevTrail];
        newTrail.pop(); // Remove last element
        newTrail.unshift({ x: e.clientX, y: e.clientY, opacity: 1 }); // Add new position at the beginning
        
        // Update opacity for trail effect
        return newTrail.map((point, index) => ({
          ...point,
          opacity: 1 - (index / trailLength) * trailFade
        }));
      });
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [trailLength, trailFade]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="pointer-events-none fixed top-0 left-0 w-full h-full"
      style={{ zIndex }}
    >
      {/* Main cursor */}
      <div
        className="absolute rounded-full mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          transform: `translate(${position.x - size/2}px, ${position.y - size/2}px)`,
          opacity: 0.7,
        }}
      />
      
      {/* Trail effect */}
      {trail.map((point, index) => (
        <div
          key={index}
          className="absolute rounded-full mix-blend-difference"
          style={{
            width: `${size * (1 - index * 0.05)}px`,
            height: `${size * (1 - index * 0.05)}px`,
            backgroundColor: color,
            transform: `translate(${point.x - (size * (1 - index * 0.05))/2}px, ${point.y - (size * (1 - index * 0.05))/2}px)`,
            opacity: point.opacity * 0.3,
          }}
        />
      ))}
    </div>
  );
}
