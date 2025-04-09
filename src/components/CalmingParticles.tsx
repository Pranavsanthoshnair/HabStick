import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
}

export default function CalmingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create initial particles
    const initialParticles = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4, // 4-12px
      opacity: Math.random() * 0.3 + 0.2, // 0.2-0.5
      speed: Math.random() * 0.5 + 0.2, // 0.2-0.7
      direction: Math.random() * Math.PI * 2
    }));

    setParticles(initialParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + Math.cos(particle.direction) * particle.speed;
        let newY = particle.y + Math.sin(particle.direction) * particle.speed;

        // Bounce off edges
        if (newX <= 0 || newX >= 100) {
          particle.direction = Math.PI - particle.direction;
          newX = Math.max(0, Math.min(100, newX));
        }
        if (newY <= 0 || newY >= 100) {
          particle.direction = -particle.direction;
          newY = Math.max(0, Math.min(100, newY));
        }

        return {
          ...particle,
          x: newX,
          y: newY,
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="particles-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        />
      ))}

      <style>
        {`
          .particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
          }

          .particle {
            position: absolute;
            background: radial-gradient(circle at center, #4f46e5 0%, transparent 70%);
            border-radius: 50%;
            filter: blur(1px);
            transition: all 0.5s ease;
            animation: pulse 3s ease-in-out infinite;
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </div>
  );
}