import { useState, useEffect, useRef } from 'react';
import { MicrophoneIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { productData } from '../data/products';
import 'regenerator-runtime/runtime';

interface VoiceAssistantProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const VoiceAssistant = ({ setIsOpen }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  // Using _ prefix to indicate intentionally unused state variable
  const [_isSpeaking, setIsSpeaking] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      setFeedback('Speech recognition is not supported in this browser.');
      return;
    }
    
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    
    // Initialize speech synthesis
    speechSynthesisRef.current = new SpeechSynthesisUtterance();
    speechSynthesisRef.current.lang = 'en-US';
    speechSynthesisRef.current.rate = 1.0;
    speechSynthesisRef.current.pitch = 1.0;
    
    // Set up speech recognition event handlers
    if (recognitionRef.current) {
      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
        processVoiceCommand(result);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setFeedback(`Error: ${event.error}`);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current?.start();
        }
      };
    }
    
    // Set up speech synthesis event handlers
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.onstart = () => {
        setIsSpeaking(true);
      };
      
      speechSynthesisRef.current.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesisRef.current.onerror = (event) => {
        console.error('Speech synthesis error', event);
        setIsSpeaking(false);
      };
    }
    
    // Welcome message when component mounts
    speak('Welcome to HabStick. I am your voice assistant. Say "help" to learn what I can do.');
    
    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        if (isListening) {
          recognitionRef.current.stop();
        }
      }
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);
  
  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      speak('Voice commands paused.');
    } else {
      try {
        recognitionRef.current?.start();
        speak('I\'m listening. How can I help you?');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setFeedback('Error starting speech recognition. Please try again.');
      }
    }
    setIsListening(!isListening);
  };
  
  // Toggle mute state
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      speechSynthesis.cancel();
      setFeedback('Voice assistant muted.');
    } else {
      speak('Voice assistant unmuted.');
    }
  };
  
  // Speak text using speech synthesis
  const speak = (text: string) => {
    if (isMuted || !speechSynthesisRef.current) return;
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    // Set the text to be spoken
    speechSynthesisRef.current.text = text;
    
    // Speak the text
    speechSynthesis.speak(speechSynthesisRef.current);
    
    // Update feedback for visual users
    setFeedback(text);
  };
  
  // Process voice commands
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Help command
    if (lowerCommand.includes('help')) {
      speak('I can help you navigate the HabStick website. You can say: products, features, price, support, about, or open chat.');
      return;
    }
    
    // Navigation commands
    if (lowerCommand.includes('go to home') || lowerCommand.includes('homepage')) {
      speak('Navigating to home page.');
      window.location.href = '/';
      return;
    }
    
    if (lowerCommand.includes('go to products') || lowerCommand.includes('show products')) {
      speak('Navigating to products page.');
      window.location.href = '/products';
      return;
    }
    
    if (lowerCommand.includes('go to support') || lowerCommand.includes('help page')) {
      speak('Navigating to support page.');
      window.location.href = '/support';
      return;
    }
    
    if (lowerCommand.includes('go to testimonials') || lowerCommand.includes('reviews')) {
      speak('Navigating to testimonials page.');
      window.location.href = '/testimonials';
      return;
    }
    
    // Chat commands
    if (lowerCommand.includes('open chat') || lowerCommand.includes('start chat')) {
      speak('Opening chat assistant.');
      setIsOpen(true);
      return;
    }
    
    if (lowerCommand.includes('close chat') || lowerCommand.includes('end chat')) {
      speak('Closing chat assistant.');
      setIsOpen(false);
      return;
    }
    
    // Product information commands
    if (lowerCommand.includes('tell me about products') || lowerCommand.includes('what products')) {
      const productNames = productData.map(p => p.name).join(', ');
      speak(`HabStick offers the following products: ${productNames}. Say the name of a product to learn more.`);
      return;
    }
    
    // Check for specific product inquiries
    for (const product of productData) {
      if (lowerCommand.includes(product.name.toLowerCase())) {
        speak(`${product.name}: ${product.description}. It costs ${product.price} rupees.`);
        return;
      }
    }
    
    // Price information
    if (lowerCommand.includes('price') || lowerCommand.includes('cost') || lowerCommand.includes('how much')) {
      speak('HabStick products range from 1,500 rupees for the HabStick Mini to 10,000 rupees for our premium HabStick Max model.');
      return;
    }
    
    // Features information
    if (lowerCommand.includes('features') || lowerCommand.includes('what can it do')) {
      speak('HabStick features include obstacle detection, voice navigation, emergency alert systems, GPS integration, and long battery life. The specific features vary by model.');
      return;
    }
    
    // About information
    if (lowerCommand.includes('about') || lowerCommand.includes('company')) {
      speak('HabStick is dedicated to enhancing independence for the visually impaired through innovative navigation technology. Founded by Pranav S Nair, we develop smart navigation aids that combine advanced sensors, voice feedback, and intuitive design.');
      return;
    }
    
    // Stop listening command
    if (lowerCommand.includes('stop listening') || lowerCommand.includes('stop voice assistant')) {
      speak('Voice assistant stopping.');
      setIsListening(false);
      recognitionRef.current?.stop();
      return;
    }
  };
  
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="flex flex-col items-center">
        {/* Voice assistant button */}
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full shadow-lg transition-all flex items-center justify-center mb-2 ${isListening ? 'bg-red-600 animate-pulse' : 'bg-primary-600 hover:bg-primary-700'}`}
          aria-label={isListening ? 'Stop voice assistant' : 'Start voice assistant'}
        >
          <MicrophoneIcon className="h-6 w-6 text-white" />
        </button>
        
        {/* Mute button */}
        <button
          onClick={toggleMute}
          className={`p-3 rounded-full shadow-lg transition-all flex items-center justify-center ${isMuted ? 'bg-gray-600' : 'bg-primary-600 hover:bg-primary-700'}`}
          aria-label={isMuted ? 'Unmute voice assistant' : 'Mute voice assistant'}
        >
          {isMuted ? (
            <SpeakerXMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <SpeakerWaveIcon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      
      {/* Feedback display (only visible when there's feedback) */}
      {feedback && (
        <div className="mt-2 p-2 bg-white rounded-lg shadow-md max-w-xs">
          <p className="text-sm text-gray-800">{feedback}</p>
          {transcript && isListening && (
            <p className="text-xs text-gray-500 mt-1">Heard: "{transcript}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;

// Using the type definitions from @types/dom-speech-recognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

// This is needed to avoid TypeScript errors