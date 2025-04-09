import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  color1?: string;
  color2?: string;
  speed?: number;
  zIndex?: number;
}

export default function AnimatedBackground({
  color1 = '#3b82f6',
  color2 = '#60a5fa',
  speed = 20,
  zIndex = 0
}: AnimatedBackgroundProps) {
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
    
    let time = 0;
    
    // Animation loop
    const animate = () => {
      time += 0.01 * speed;
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated shapes
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(time + i * 0.5) * canvas.width * 0.25 + canvas.width * 0.5;
        const y = Math.cos(time + i * 0.5) * canvas.height * 0.25 + canvas.height * 0.5;
        const size = Math.sin(time * 0.5) * 50 + 100;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
        ctx.fill();
      }
      
      // Draw animated waves
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.5);
      
      for (let i = 0; i < canvas.width; i++) {
        const y = Math.sin(i * 0.01 + time) * 50 + canvas.height * 0.5;
        ctx.lineTo(i, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
      ctx.fill();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [color1, color2, speed]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex }}
    />
  );
}
