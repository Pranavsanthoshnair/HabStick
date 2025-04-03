import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ScrollAnimation from '../components/ScrollAnimation';

import DeviceStats from '../components/DeviceStats';

export default function Home() {
  const { showNotification } = useAppContext();

  const handleLearnMore = () => {
    showNotification('Loading product details...', 'info');
  };

  const handleGetSupport = () => {
    showNotification('Loading support resources...', 'info');
  };

  return (
    <div className="app-container">
      <DeviceStats className="mb-8" />
      {/* Hero section */}
      <div className="hero-section">
        <ScrollAnimation type="fade-down" delay={100}>
          <h1 className="hero-title bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Smart Navigation for Independent Living
          </h1>
        </ScrollAnimation>
        <ScrollAnimation type="fade-up" delay={200}>
          <p className="hero-description">
            HabStick is an advanced blind stick that combines cutting-edge technology with intuitive design to help visually impaired individuals navigate their world with confidence.
          </p>
        </ScrollAnimation>
        <ScrollAnimation type="fade-in" delay={300}>
          <div className="btn-container">
            <Link
              to="/product"
              onClick={handleLearnMore}
              className="btn-primary"
            >
              Learn More
            </Link>
            <Link
              to="/support"
              onClick={handleGetSupport}
              className="btn-secondary"
            >
              Get Support
            </Link>
          </div>
        </ScrollAnimation>
      </div>

      {/* Feature section */}
      <div className="features-section">
        <ScrollAnimation type="fade-up" delay={100}>
          <h2 className="features-heading">Smart Features</h2>
          <p className="features-title">
            Everything you need for safe navigation
          </p>
          <p className="features-description">
            HabStick comes equipped with advanced features designed to enhance your independence and safety.
          </p>
        </ScrollAnimation>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <ScrollAnimation 
              key={feature.name} 
              type="slide-in"
              delay={(index + 1) * 100 as 100 | 200 | 300 | 400 | 500}
            >
              <div className="feature-item">
                <h3 className="feature-title">{feature.name}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
      
      {/* Testimonial section */}
      <ScrollAnimation type="fade-up" delay={300}>
        <div className="testimonial-preview">
          <h2 className="testimonial-heading">What Our Users Say</h2>
          <div className="testimonial-card">
            <p className="testimonial-quote">
              "HabStick has completely transformed my daily life. I can now navigate with confidence and independence."
            </p>
            <p className="testimonial-author">- Sarah J., Teacher</p>
          </div>
          <Link to="/testimonials" className="btn-outline mt-6">Read More Stories</Link>
        </div>
      </ScrollAnimation>
    </div>
  );
}
const features = [
  {
    name: 'Obstacle Detection',
    description: 'Advanced sensors detect obstacles in your path and provide real-time audio feedback.',
  },
  {
    name: 'Voice Navigation',
    description: 'Built-in voice commands and audio feedback for intuitive control and navigation.',
  },
  {
    name: 'Emergency Alert',
    description: 'One-touch emergency alert system that notifies caregivers or emergency services.',
  },
  {
    name: 'GPS Integration',
    description: 'Built-in GPS to help users find their way to specific destinations with turn-by-turn directions.',
  },
  {
    name: 'Long Battery Life',
    description: '12-hour battery life ensures all-day use without worrying about recharging.',
  },
];
