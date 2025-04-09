import { CSSProperties } from 'react';

interface WaveBackgroundProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  speed?: number;
}

export default function WaveBackground({
  className = '',
  primaryColor = '#3b82f6',
  secondaryColor = '#60a5fa',
  speed = 15
}: WaveBackgroundProps) {
  const waveAnimationStyle: CSSProperties = {
    animation: `wave-move ${speed}s linear infinite`
  };
  
  const wave1Style: CSSProperties = {
    ...waveAnimationStyle,
    animationDelay: '-2s'
  };
  
  const wave2Style: CSSProperties = {
    ...waveAnimationStyle,
    animationDelay: '-4s',
    animationDuration: `${speed * 0.8}s`
  };
  
  const wave3Style: CSSProperties = {
    ...waveAnimationStyle,
    animationDelay: '-3s',
    animationDuration: `${speed * 0.6}s`
  };
  
  const wave4Style: CSSProperties = {
    ...waveAnimationStyle,
    animationDelay: '-4s',
    animationDuration: `${speed * 0.7}s`
  };
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="wave-path"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="wave-animation">
          <use
            xlinkHref="#wave-path"
            x="48"
            y="0"
            fill={`${primaryColor}33`}
            style={wave1Style}
          />
          <use
            xlinkHref="#wave-path"
            x="48"
            y="3"
            fill={`${primaryColor}66`}
            style={wave2Style}
          />
          <use
            xlinkHref="#wave-path"
            x="48"
            y="5"
            fill={`${secondaryColor}99`}
            style={wave3Style}
          />
          <use 
            xlinkHref="#wave-path" 
            x="48" 
            y="7" 
            fill={primaryColor}
            style={wave4Style}
          />
        </g>
      </svg>
      <style>
        {`
          @keyframes wave-move {
            0% {
              transform: translate(-90px, 0%);
            }
            100% {
              transform: translate(85px, 0%);
            }
          }
        `}
      </style>
    </div>
  );
}
