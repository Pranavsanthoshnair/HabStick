import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  size: number;
  opacity: number;
  animationDuration: number;
}

export default function Snow() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Create initial snowflakes
    const initialSnowflakes = Array.from({ length: 50 }, (_, index) => ({
      id: index,
      left: Math.random() * 100, // Random horizontal position (0-100%)
      size: Math.random() * 4 + 2, // Random size (2-6px)
      opacity: Math.random() * 0.6 + 0.4, // Random opacity (0.4-1)
      animationDuration: Math.random() * 5 + 5, // Random duration (5-10s)
    }));

    setSnowflakes(initialSnowflakes);

    // Add new snowflakes periodically
    const interval = setInterval(() => {
      setSnowflakes(prev => {
        const newSnowflake = {
          id: Date.now(),
          left: Math.random() * 100,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.6 + 0.4,
          animationDuration: Math.random() * 5 + 5,
        };
        return [...prev.slice(-49), newSnowflake]; // Keep max 50 snowflakes
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="snow-container">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.animationDuration}s`,
          }}
        />
      ))}

      <style>{`
        .snow-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .snowflake {
          position: absolute;
          top: -10px;
          background: white;
          border-radius: 50%;
          animation: snowfall linear infinite;
          box-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-10px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}