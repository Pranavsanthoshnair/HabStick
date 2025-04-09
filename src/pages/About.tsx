import { Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';
import WaveBackground from '../components/WaveBackground';

export default function About() {
  return (
    <div className="about-page relative pt-8 pb-16">
      {/* Background elements */}
      <WaveBackground className="h-64 -bottom-32 opacity-20" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation type="fade-down" delay={100}>
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            About <span className="text-blue-600">HabStick</span>
          </h1>
        </ScrollAnimation>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <ScrollAnimation type="fade-up" delay={200}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              HabStick was founded in 2023 with a simple yet powerful mission: to enhance the independence and quality of life for visually impaired individuals through innovative technology. Our journey began when our founder, witnessing the daily challenges faced by a visually impaired family member, recognized the limitations of traditional navigation aids.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              After extensive research and collaboration with the visually impaired community, we developed HabStick – a smart navigation device that combines cutting-edge sensor technology, intuitive design, and real-time feedback systems to provide unprecedented spatial awareness and navigation assistance.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, HabStick has grown from a small startup to a recognized leader in assistive technology, with thousands of users worldwide reporting significant improvements in their mobility, confidence, and overall independence.
            </p>
          </ScrollAnimation>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ScrollAnimation type="slide-in" delay={300}>
            <div className="bg-white rounded-lg shadow-lg p-8 h-full border-l-4 border-blue-600 hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                We envision a world where visual impairment no longer limits a person's ability to navigate and experience their surroundings with confidence and independence. We strive to create a future where advanced technology is accessible to all, breaking down barriers and opening up new possibilities for those with visual disabilities.
              </p>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-blue-600 mb-2">Key Aspirations:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Universal accessibility to navigation technology</li>
                  <li>Continuous innovation in assistive devices</li>
                  <li>Integration of AI and machine learning for personalized experiences</li>
                  <li>Building inclusive communities through technology</li>
                </ul>
              </div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation type="slide-in" delay={400}>
            <div className="bg-white rounded-lg shadow-lg p-8 h-full border-l-4 border-green-600 hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to empower visually impaired individuals with innovative, reliable, and intuitive navigation tools that enhance their independence, safety, and quality of life. We are committed to developing technology that is not only functional but also affordable and user-friendly.
              </p>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-green-600 mb-2">Our Commitments:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Designing products with direct input from the visually impaired community</li>
                  <li>Ensuring affordability without compromising on quality</li>
                  <li>Providing exceptional customer support and training</li>
                  <li>Reinvesting in research and development for continuous improvement</li>
                  <li>Advocating for policies that support accessibility and inclusion</li>
                </ul>
              </div>
            </div>
          </ScrollAnimation>
        </div>
        
        <ScrollAnimation type="fade-up" delay={500}>
          <div className="bg-blue-50 rounded-lg p-8 border border-blue-100 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Us in Our Journey</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Whether you're a potential user, partner, investor, or simply share our passion for creating a more accessible world, we invite you to be part of our journey.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/product">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center btn-hover-effect transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Explore HabStick
                </button>
              </Link>
              <Link to="/support">
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-md btn-hover-effect transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
