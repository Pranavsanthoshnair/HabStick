import { useEffect, useRef } from 'react';

interface SnowfallProps {
  count?: number;
  color?: string;
  speed?: number;
  size?: number;
  opacity?: number;
  zIndex?: number;
}

export default function Snowfall({
  count = 150,
  color = '#ffffff',
  speed = 1,
  size = 1,
  opacity = 0.8,
  zIndex = 5
}: SnowfallProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create snowflakes
    const snowflakes: any[] = [];
    
    for (let i = 0; i < count; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * size + 0.5,
        density: Math.random() * 10 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: (Math.random() * 0.5 + 0.5) * speed,
        opacity: Math.random() * opacity + 0.3
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];
        
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();
        
        // Update position
        flake.y += flake.speedY;
        flake.x += flake.speedX;
        
        // Add some wiggle
        flake.x += Math.sin(flake.density + flake.y / 100) * 0.3;
        
        // Reset if out of bounds
        if (flake.y > canvas.height) {
          snowflakes[i] = {
            x: Math.random() * canvas.width,
            y: 0,
            radius: flake.radius,
            density: flake.density,
            speedX: flake.speedX,
            speedY: flake.speedY,
            opacity: flake.opacity
          };
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [count, color, speed, size, opacity]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex }}
    />
  );
}
