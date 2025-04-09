import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ScrollAnimation from '../components/ScrollAnimation';
import FloatingElements from '../components/FloatingElements';
import WaveBackground from '../components/WaveBackground';
import Snowfall from '../components/Snowfall';
import ParticlesBubble from '../components/ParticlesBubble';
import AnimatedBackground from '../components/AnimatedBackground';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Home() {
  const { showNotification } = useAppContext();
  
  const handleLearnMore = () => {
    showNotification('Redirecting to about page...', 'info');
  };
  
  const handleGetSupport = () => {
    showNotification('Loading support resources...', 'info');
  };

  return (
    <div className="relative">
      {/* SEO Component */}
      <SEO 
        title="HabStick | Revolutionary Smart Blind Stick with AI Navigation"
        description="HabStick: The #1 Smart Blind Stick with AI-powered navigation. Features real-time obstacle detection, voice assistance, GPS tracking, and emergency alerts."
        keywords="HabStick, smart blind stick, AI navigation aid, electronic walking stick for blind, smart cane, assistive technology, blind navigation device, obstacle detection system"
        image="https://www.habstick.com/home-og-image.jpg"
      />
      
      {/* Animated background elements */}
      <AnimatedBackground color1="#1e40af" color2="#3b82f6" speed={5} zIndex={-1} />
      <Snowfall count={100} speed={0.8} size={1.5} opacity={0.4} zIndex={5} />
      <ParticlesBubble count={20} color="#60a5fa" maxSize={15} minSize={3} speed={0.3} opacity={0.3} zIndex={2} />
      <FloatingElements count={15} className="z-0 opacity-20" />
      <WaveBackground className="h-64 -bottom-32 opacity-30" />
      
      <div className="hero-section relative z-10">
        <ScrollAnimation type="fade-down" delay={100}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block text-blue-600 drop-shadow-md">HabStick</span>
                <span className="block text-gray-900 drop-shadow-md mt-2">Navigate Life with Confidence</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-xl text-gray-900 font-medium drop-shadow-md bg-white/40 p-4 rounded-lg">
                The smart walking stick that uses AI to detect obstacles and guide you safely through your environment.
              </p>
            </div>
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation type="fade-up" delay={300}>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/about" onClick={handleLearnMore}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center btn-hover-effect transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <Link to="/support" onClick={handleGetSupport}>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-md btn-hover-effect transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Support
              </button>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
      
      {/* Features section */}
      <div className="features-section relative z-10 mt-20">
        <ScrollAnimation type="fade-up" delay={200}>
          <h2 className="section-title text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {features.map((feature) => (
              <ScrollAnimation
                key={feature.name}
                type="slide-in"
                delay={100}
              >
                <div className="h-full hover:shadow-lg transition-all duration-300 bg-white rounded-lg shadow p-6 hover:border-blue-400 hover:border-2 hover:translate-y-[-5px] cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-900">{feature.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                  <p className="mt-4 text-gray-700">{feature.details}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>
      </div>
      
      {/* Testimonial section */}
      <ScrollAnimation type="fade-up" delay={300}>
        <div className="testimonial-preview mt-20">
          <h2 className="section-title text-center">What Our Users Say</h2>
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300 cursor-pointer">
              <blockquote className="text-lg italic text-gray-700">
                "HabStick has completely changed my life. I can now navigate confidently through busy streets and unfamiliar places without constantly asking for help."
              </blockquote>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-medium">Maria S.</p>
                  <p className="text-sm text-gray-500">HabStick user for 6 months</p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link to="/testimonials">
                <button className="text-white bg-blue-600 hover:bg-blue-700 font-medium py-2 px-4 rounded-md transition-all duration-300 hover:shadow-lg">
                  View all testimonials
                </button>
              </Link>
            </div>
          </div>
        </div>
      </ScrollAnimation>
      
      {/* Global Stats Section */}
      <ScrollAnimation type="fade-up" delay={300}>
        <div className="stats-section mt-20 py-12 bg-gradient-to-r from-blue-100 to-indigo-100 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-12 text-gray-900 font-bold text-3xl drop-shadow-md">Global Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="stat-card bg-white rounded-lg shadow-md p-6 text-center transform transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-300 hover:border border border-gray-200">
                <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-800 font-medium">Users Worldwide</div>
                <div className="mt-2 text-sm text-gray-600">Across 45 countries</div>
              </div>
              
              <div className="stat-card bg-white rounded-lg shadow-md p-6 text-center transform transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-300 hover:border border border-gray-200">
                <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
                <div className="text-gray-800 font-medium">User Satisfaction</div>
                <div className="mt-2 text-sm text-gray-600">Based on 2,500+ reviews</div>
              </div>
              
              <div className="stat-card bg-white rounded-lg shadow-md p-6 text-center transform transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-300 hover:border border border-gray-200">
                <div className="text-4xl font-bold text-purple-600 mb-2">5.2M</div>
                <div className="text-gray-800 font-medium">Navigation Hours</div>
                <div className="mt-2 text-sm text-gray-600">Logged by our users</div>
              </div>
              
              <div className="stat-card bg-white rounded-lg shadow-md p-6 text-center transform transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-300 hover:border border border-gray-200">
                <div className="text-4xl font-bold text-orange-600 mb-2">85%</div>
                <div className="text-gray-800 font-medium">Independence Gain</div>
                <div className="mt-2 text-sm text-gray-600">Reported by users</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
      
      {/* CTA section */}
      <ScrollAnimation type="fade-up" delay={400}>
        <div className="cta-section mt-20 mb-16 text-center">
          <h2 className="section-title">Ready to Experience HabStick?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Join thousands of users who have transformed their daily navigation experience with HabStick.
          </p>
          <div className="mt-8">
            <Link to="/product">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md text-lg font-medium btn-hover-effect transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Your HabStick Today
              </button>
            </Link>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}

// Sample data
const features = [
  {
    name: "Obstacle Detection",
    description: "Advanced sensors for precise detection",
    details: "Uses ultrasonic and infrared sensors to detect obstacles up to 4 meters away with high precision."
  },
  {
    name: "Voice Guidance",
    description: "Clear audio instructions",
    details: "Provides real-time voice feedback about surroundings and potential obstacles through bone conduction technology."
  },
  {
    name: "GPS Navigation",
    description: "Turn-by-turn directions",
    details: "Integrated GPS system provides accurate directions to destinations with customizable route preferences."
  },
  {
    name: "Long Battery Life",
    description: "All-day usage on a single charge",
    details: "High-capacity battery provides up to 12 hours of continuous use and quick charging capabilities."
  }
];