import { useEffect, useRef, useState, CSSProperties } from 'react';

type AnimationType = 'fade-in' | 'fade-up' | 'fade-down' | 'slide-in' | 'slide-out';

interface ScrollAnimationProps {
  children: React.ReactNode;
  type: AnimationType;
  delay?: 100 | 200 | 300 | 400 | 500;
  threshold?: number; // 0 to 1, percentage of element visible to trigger
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  type,
  delay,
  threshold = 0.1,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly earlier for smoother appearance
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  const getInitialTransform = () => {
    switch (type) {
      case 'fade-up':
        return 'translateY(30px)';
      case 'fade-down':
        return 'translateY(-30px)';
      case 'slide-in':
        return 'translateX(-50px)';
      case 'slide-out':
        return 'translateX(50px)';
      default:
        return 'none';
    }
  };

  const baseStyles: CSSProperties = {
    opacity: 0,
    transform: getInitialTransform(),
    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: delay ? `${delay}ms` : '0ms',
    visibility: 'visible' as const,
    willChange: 'transform, opacity'
  };

  const visibleStyles: CSSProperties = {
    opacity: 1,
    transform: 'none',
    visibility: 'visible' as const
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...baseStyles,
        ...(isVisible ? visibleStyles : {}),
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;