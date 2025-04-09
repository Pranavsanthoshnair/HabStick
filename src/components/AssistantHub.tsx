import { useState } from 'react';
import { RocketLaunchIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ChatBot from './ChatBot';
import VoiceAssistant from './VoiceAssistant';

type Assistant = 'none' | 'chat' | 'voice';

export default function AssistantHub() {
  const [activeAssistant, setActiveAssistant] = useState<Assistant>('none');
  const [isHubOpen, setIsHubOpen] = useState(false);

  const toggleHub = () => {
    if (isHubOpen) {
      setActiveAssistant('none');
    }
    setIsHubOpen(!isHubOpen);
  };

  const selectAssistant = (assistant: Assistant) => {
    setActiveAssistant(assistant);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Hub Button */}
      <button
        onClick={toggleHub}
        className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all z-50 flex items-center justify-center"
        aria-label="Toggle Assistant Hub"
      >
        {isHubOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <RocketLaunchIcon className="h-6 w-6" />
        )}
      </button>

      {/* Assistant Options */}
      {isHubOpen && activeAssistant === 'none' && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-48 border border-gray-200">
          <div className="space-y-2">
            <button
              onClick={() => selectAssistant('chat')}
              className="w-full p-2 text-left rounded-md hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Chat Assistant</span>
            </button>
            <button
              onClick={() => selectAssistant('voice')}
              className="w-full p-2 text-left rounded-md hover:bg-blue-50 transition-colors flex items-center space-x-2"
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Voice Assistant</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Assistant */}
      {activeAssistant === 'chat' && (
        <ChatBot isOpen={true} onClose={() => setActiveAssistant('none')} />
      )}
      {activeAssistant === 'voice' && (
        <VoiceAssistant isOpen={true} setIsOpen={(open) => {
          if (!open) setActiveAssistant('none');
        }} />
      )}
    </div>
  );
}
