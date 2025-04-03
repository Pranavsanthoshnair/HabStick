import { useAppContext } from '../context/AppContext';

export default function Testimonials() {
  const { showNotification } = useAppContext();

  return (
    <div className="app-container">
      <section className="testimonials-section">
        <h2 className="testimonials-heading">Success Stories</h2>
        <p className="testimonials-title">
          What Our Customers Are Saying
        </p>
        <p className="testimonials-description">
          Hear from individuals whose lives have been transformed by HabStick. Our technology has helped people regain their independence and confidence.
        </p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item">
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div>
                <p className="testimonial-author">{testimonial.author}</p>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="testimonials-section" style={{ marginTop: '4rem' }}>
        <h2 className="testimonials-heading">Share Your Experience</h2>
        <p className="testimonials-title">
          Tell Us Your Story
        </p>
        <p className="testimonials-description">
          We'd love to hear about your experience with HabStick. Your feedback helps us improve our products and inspires others on their journey.
        </p>
        
        <form 
          className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-blue-100"
          onSubmit={(e) => {
            e.preventDefault();
            showNotification("Thank you for sharing your story! We'll review and publish it soon.");
          }}
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 font-medium mb-2">Your Role or Location</label>
            <input
              type="text"
              id="role"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="New York, USA"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="testimonial" className="block text-gray-700 font-medium mb-2">Your Experience</label>
            <textarea
              id="testimonial"
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Share how HabStick has helped you..."
              required
            ></textarea>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn-primary px-8 py-3"
            >
              Submit Your Story
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

const testimonials = [
  {
    quote: "HabStick has completely transformed my daily life. I can now navigate through busy streets with confidence and safety. The obstacle detection feature has saved me countless times.",
    author: "Sarah Johnson",
    role: "Teacher, New York"
  },
  {
    quote: "As someone who lost their vision later in life, HabStick helped me regain my independence. The voice navigation is intuitive and the emergency alert feature gives my family peace of mind.",
    author: "Michael Chen",
    role: "Retired Engineer, San Francisco"
  },
  {
    quote: "The HabStick's battery life is impressive - I can go all day without worrying about charging. The haptic feedback system is subtle yet effective, helping me navigate complex environments.",
    author: "Emily Rodriguez",
    role: "Social Worker, Chicago"
  },
  {
    quote: "I've tried many navigation aids, but HabStick stands out for its reliability and ease of use. It's become an essential part of my daily routine, giving me the confidence to explore new places.",
    author: "James Wilson",
    role: "Musician, Nashville"
  },
  {
    quote: "The emergency alert feature proved invaluable when I needed assistance in an unfamiliar area. One button press connected me with help. HabStick is worth every penny for the security it provides.",
    author: "Amara Okafor",
    role: "Student, Boston"
  },
  {
    quote: "As a mobility instructor, I recommend HabStick to many of my clients. The learning curve is minimal, and the features address real needs. It's a game-changer in assistive technology.",
    author: "Dr. Robert Patel",
    role: "Vision Rehabilitation Specialist, Seattle"
  }
]; 