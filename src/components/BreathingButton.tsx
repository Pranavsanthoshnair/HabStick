interface BreathingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function BreathingButton({
  children,
  onClick,
  className = '',
  disabled = false,
}: BreathingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`breathing-button ${className}`}
    >
      {children}
      <style>
        {`
          .breathing-button {
            position: relative;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            background: linear-gradient(145deg, #3b82f6, #2563eb);
            color: white;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: breathing 4s ease-in-out infinite;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                      0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .breathing-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            animation: none;
          }

          .breathing-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                      0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }

          @keyframes breathing {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                        0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            50% {
              transform: scale(1.02);
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                        0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
          }
        `}
      </style>
    </button>
  );
}