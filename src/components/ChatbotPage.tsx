import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Pill, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sendPlainText } from '../services/BackendBridge';
import { useGlobal } from '../contexts/GlobalContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  prescription?: {
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
  };
}

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Health Companion. How can I help you today? You can ask me about symptoms, medications, or general health advice.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { username, setUsername } = useGlobal();
  const { formData, setFormData } = useGlobal();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(async () => {
      const response = await sendPlainText("api/gemini", username + "~" + input);
      const jsonPart = JSON.parse(
            response
              .replace(/^```json\s*/, '')  // Remove starting ```json
              .replace(/```$/, '')         // Remove ending ```
              .trim()
      );
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: jsonPart.content,
        timestamp: new Date(),
        prescription: jsonPart.prescription
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-4xl h-[700px] flex flex-col">
        {/* Chat Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-t-3xl bg-gradient-to-r from-blue-500 to-green-400 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-white">AI Health Assistant</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                <span className="text-blue-50 text-sm">Online</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-white/50 backdrop-blur-lg border-x border-blue-100">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] ${
                      message.type === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                        : 'bg-white border border-blue-100'
                    } rounded-2xl p-4 shadow-md`}
                  >
                    <p className={message.type === 'user' ? 'text-white' : 'text-gray-800'}>
                      {message.content}
                    </p>
                    
                    {message.prescription && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200"
                      >
                        <div className="flex items-center gap-2 mb-3 text-green-700">
                          <Pill className="w-5 h-5" />
                          <span>Prescription Information</span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div>
                            <strong>Medication:</strong> {message.prescription.medication}
                          </div>
                          <div>
                            <strong>Dosage:</strong> {message.prescription.dosage}
                          </div>
                          <div>
                            <strong>Frequency:</strong> {message.prescription.frequency}
                          </div>
                          <div>
                            <strong>Duration:</strong> {message.prescription.duration}
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
                          ⚠️ This is AI-generated advice. Consult a healthcare professional before taking any medication.
                        </div>
                      </motion.div>
                    )}

                    <div className={`mt-2 text-xs ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white border border-blue-100 rounded-2xl p-4 shadow-md">
                  <div className="flex gap-2">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 rounded-b-3xl bg-white/80 backdrop-blur-lg border border-blue-100 shadow-lg">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your health..."
              className="flex-1 px-6 py-4 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-6 py-4 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
          <p className="mt-3 text-xs text-gray-500 text-center">
            AI can make mistakes. Always verify medical information with a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}
