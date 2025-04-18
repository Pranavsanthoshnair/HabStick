import { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
  particleCount?: number;
  colors?: string[];
}

const Confetti = ({ 
  active, 
  duration = 3000, 
  particleCount = 200,
  colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722']
}: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<any[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const startTime = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create particles
    particles.current = [];
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 5 + 2,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * 0.2 - 0.1,
        rotationSpeed: Math.random() * 0.01 - 0.005,
        oscillationSpeed: Math.random() * 0.025 + 0.025,
        oscillationDistance: Math.random() * 40 + 40,
      });
    }
    
    startTime.current = Date.now();
    
    // Animation function
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime.current;
      
      if (elapsed > duration) {
        // Stop animation after duration
        if (animationFrameId.current !== null) {
          cancelAnimationFrame(animationFrameId.current);
        }
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        
        // Update position
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed + 1; // Add gravity
        
        // Add oscillation
        p.x += Math.cos(elapsed * p.oscillationSpeed) * p.oscillationDistance;
        
        // Update rotation
        p.rotation += p.rotationSpeed;
        
        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        
        // Reset if particle is out of screen
        if (p.y > canvas.height) {
          particles.current[i] = {
            ...p,
            y: -p.size,
            x: Math.random() * canvas.width,
          };
        }
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [active, colors, duration, particleCount]);
  
  if (!active) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default Confetti;
