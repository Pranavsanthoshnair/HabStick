import { useEffect, useRef } from 'react';

interface ParticlesProps {
  type?: 'snow' | 'bubbles' | 'confetti';
  count?: number;
  color?: string;
  speed?: number;
  opacity?: number;
  className?: string;
}

export default function Particles({
  type = 'snow',
  count = 50,
  color = '#ffffff',
  speed = 1,
  opacity = 0.8,
  className = ''
}: ParticlesProps) {
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
    
    // Create particles
    const particles: any[] = [];
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: type === 'snow' ? Math.random() * 4 + 1 : 
                type === 'bubbles' ? Math.random() * 8 + 2 : 
                Math.random() * 6 + 2,
        density: Math.random() * 30 + 1,
        color: type === 'confetti' ? 
               `hsl(${Math.random() * 360}, 70%, 60%)` : color,
        speedX: type === 'confetti' ? 
                (Math.random() - 0.5) * 2 * speed : 
                (Math.random() - 0.5) * speed,
        speedY: type === 'bubbles' ? 
                -Math.random() * speed * 2 : 
                Math.random() * speed + 0.5,
        opacity: Math.random() * opacity + 0.3
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        if (type === 'snow') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fill();
        } else if (type === 'bubbles') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(173, 216, 230, ${p.opacity})`;
          ctx.stroke();
          ctx.fillStyle = `rgba(173, 216, 230, ${p.opacity * 0.3})`;
          ctx.fill();
        } else if (type === 'confetti') {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.density);
          ctx.fillStyle = p.color;
          ctx.fillRect(0, 0, p.radius, p.radius / 2);
          ctx.restore();
        }
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Reset if out of bounds
        if (type === 'snow' || type === 'confetti') {
          if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
          }
          if (p.x > canvas.width) p.x = 0;
          if (p.x < 0) p.x = canvas.width;
        } else if (type === 'bubbles') {
          if (p.y < 0) {
            p.y = canvas.height;
            p.x = Math.random() * canvas.width;
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [type, count, color, speed, opacity]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
}
