import { useEffect, useState } from 'react';

interface AnimatedCursorProps {
  color?: string;
  size?: number;
  ringSize?: number;
  trailLength?: number;
  zIndex?: number;
}

export default function AnimatedCursor({
  color = '#3b82f6',
  size = 8,
  ringSize = 24,
  trailLength = 8,
  zIndex = 9999
}: AnimatedCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Update trail
      setTrail(prevTrail => {
        const newTrail = [...prevTrail];
        newTrail.push({ x: e.clientX, y: e.clientY });
        if (newTrail.length > trailLength) {
          newTrail.shift();
        }
        return newTrail;
      });
      
      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' ||
        target.onclick !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      setClickPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseUp = () => {
      setIsClicked(false);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, [trailLength]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex }}
    >
      {/* Main cursor dot */}
      <div
        className="absolute rounded-full transition-transform duration-100 ease-out"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          transform: `translate(${position.x - size/2}px, ${position.y - size/2}px)`,
          opacity: 0.8,
        }}
      />
      
      {/* Cursor ring */}
      <div
        className="absolute rounded-full border-2 transition-transform duration-300 ease-out"
        style={{
          width: `${isClicked ? ringSize * 0.8 : isPointer ? ringSize * 1.5 : ringSize}px`,
          height: `${isClicked ? ringSize * 0.8 : isPointer ? ringSize * 1.5 : ringSize}px`,
          borderColor: color,
          transform: `translate(${position.x - (isClicked ? ringSize * 0.4 : isPointer ? ringSize * 0.75 : ringSize/2)}px, ${position.y - (isClicked ? ringSize * 0.4 : isPointer ? ringSize * 0.75 : ringSize/2)}px)`,
          opacity: 0.5,
          transitionProperty: 'width, height, transform',
        }}
      />
      
      {/* Click effect */}
      {isClicked && (
        <div
          className="absolute rounded-full animate-ping"
          style={{
            width: `${ringSize * 2}px`,
            height: `${ringSize * 2}px`,
            borderColor: color,
            border: `2px solid ${color}`,
            transform: `translate(${clickPosition.x - ringSize}px, ${clickPosition.y - ringSize}px)`,
            opacity: 0,
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1)'
          }}
        />
      )}
      
      {/* Trail effect */}
      {trail.map((point, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${size * 0.8}px`,
            height: `${size * 0.8}px`,
            backgroundColor: color,
            transform: `translate(${point.x - (size * 0.8)/2}px, ${point.y - (size * 0.8)/2}px)`,
            opacity: (index / trail.length) * 0.3,
          }}
        />
      ))}
    </div>
  );
}
