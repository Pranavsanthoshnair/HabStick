import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Predefined responses for common questions
const predefinedResponses: Record<string, string> = {
  // Owner information
  owner: "HabStick was founded and is owned by Pranav S Nair, an innovative entrepreneur dedicated to improving accessibility technology for the visually impaired.",
  "pranav s nair": "Pranav S Nair is the founder and owner of HabStick. He developed the concept after witnessing the challenges faced by visually impaired individuals in his community.",
  "who created": "HabStick was created by Pranav S Nair, who serves as the company's founder and CEO.",
  "who owns": "HabStick is owned by Pranav S Nair, who founded the company with a mission to enhance independence for the visually impaired.",
  "about pranav": "Pranav S Nair is a tech entrepreneur and accessibility advocate who founded HabStick. He has a background in assistive technology and is passionate about creating solutions that improve quality of life for people with visual impairments.",
  
  // Product information
  "habstick": "HabStick is an advanced navigation aid that combines cutting-edge technology with intuitive design to help visually impaired individuals navigate with confidence.",
  "products": "We offer several HabStick models: HabStick Pro, HabStick Max, HabStick Lite, and HabStick Mini. Each model is designed to meet different needs and budgets while providing reliable navigation assistance.",
  "features": "HabStick features include obstacle detection, voice navigation, emergency alert systems, GPS integration, and long battery life. The specific features vary by model.",
  "price": "HabStick products range from ₹1,500 for the HabStick Mini to ₹10,000 for our premium HabStick Max model. Visit our product page for detailed pricing information.",
  
  // Support information
  "support": "For support with your HabStick device, please visit our support page or contact our customer service team. We offer user manuals, video tutorials, and a community forum.",
  "help": "Need help with your HabStick? Check our support page for FAQs, user manuals, and video tutorials. You can also contact our support team directly.",
  
  // General information
  "about": "HabStick is dedicated to enhancing independence for the visually impaired through innovative navigation technology. Founded by Pranav S Nair, we develop smart navigation aids that combine advanced sensors, voice feedback, and intuitive design."
};

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add styles for better mobile positioning
  const chatbotStyles = {
    position: 'absolute' as const,
    bottom: '16px',
    right: '0px',
    zIndex: 50,
    maxHeight: 'calc(100vh - 100px)',
    marginTop: 'auto'
  };

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Check if the user's input matches any predefined responses
  const checkForPredefinedResponse = (input: string): string | null => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for exact matches first
    if (predefinedResponses[lowercaseInput]) {
      return predefinedResponses[lowercaseInput];
    }
    
    // Check for partial matches
    for (const key of Object.keys(predefinedResponses)) {
      if (lowercaseInput.includes(key)) {
        return predefinedResponses[key];
      }
    }
    
    // Special case for questions about the owner
    if (
      lowercaseInput.includes('who is pranav') ||
      lowercaseInput.includes('tell me about pranav') ||
      lowercaseInput.includes('founder') ||
      (lowercaseInput.includes('who') && lowercaseInput.includes('owner')) ||
      (lowercaseInput.includes('who') && lowercaseInput.includes('created')) ||
      (lowercaseInput.includes('who') && lowercaseInput.includes('made'))
    ) {
      return predefinedResponses['owner'];
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check for predefined responses first
      const predefinedResponse = checkForPredefinedResponse(input);
      
      if (predefinedResponse) {
        // Use predefined response
        setTimeout(() => {
          const assistantMessage: Message = {
            role: 'assistant',
            content: predefinedResponse
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsLoading(false);
        }, 500); // Small delay to simulate processing
      } else {
        // Make API call to Groq for other queries
        const response = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: 'llama3-8b-8192',
            messages: [...messages, userMessage].map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            temperature: 0.7,
            max_tokens: 1000
          },
          {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY || ''}`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Add assistant response
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.data.choices[0].message.content
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error calling Groq API:', error);
      // Add error message
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }
      ]);
    } finally {
      if (!checkForPredefinedResponse(input)) {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Chat window */}
      <div style={chatbotStyles} className="w-[90vw] sm:w-96 h-[80vh] sm:h-96 bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 overflow-hidden">
        {/* Chat header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h3 className="font-semibold">HabStick Assistant</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p>How can I help you today?</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-blue-50 text-blue-800 border border-blue-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex">
            <input
              type="text"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isLoading || !input.trim()}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}