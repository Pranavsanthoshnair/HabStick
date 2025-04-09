import { useEffect, useRef } from 'react';

interface ParticlesBubbleProps {
  count?: number;
  color?: string | string[];
  maxSize?: number;
  minSize?: number;
  speed?: number;
  opacity?: number;
  zIndex?: number;
}

export default function ParticlesBubble({
  count = 50,
  color = '#60a5fa',
  maxSize = 15,
  minSize = 3,
  speed = 1,
  opacity = 0.6,
  zIndex = 1
}: ParticlesBubbleProps) {
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
    
    // Create bubbles
    const bubbles: any[] = [];
    
    for (let i = 0; i < count; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * opacity + 0.1,
        color: typeof color === 'string' ? color : 
               Array.isArray(color) ? color[Math.floor(Math.random() * color.length)] : color
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        
        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${bubble.color}${Math.floor(bubble.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Add highlight
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.radius * 0.3, 
          bubble.y - bubble.radius * 0.3, 
          bubble.radius * 0.2, 
          0, 
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.8})`;
        ctx.fill();
        
        // Update position
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;
        
        // Bounce off edges
        if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvas.width) {
          bubble.speedX = -bubble.speedX;
        }
        
        if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvas.height) {
          bubble.speedY = -bubble.speedY;
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [count, color, maxSize, minSize, speed, opacity]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex }}
    />
  );
}
