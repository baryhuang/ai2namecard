import { useEffect, useRef } from 'react';
import { useSceneStore } from '../../stores/sceneStore';
import { sendMessageToAI } from '../../services/aiService';
import { MessageItem } from './MessageItem';
import { TypingIndicator } from './TypingIndicator';
import { InputArea } from './InputArea';

export function ChatPanel() {
  const messages = useSceneStore((state) => state.messages);
  const isLoading = useSceneStore((state) => state.isLoading);
  const addMessage = useSceneStore((state) => state.addMessage);
  const setLoading = useSceneStore((state) => state.setLoading);
  const updateScene = useSceneStore((state) => state.updateScene);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingTextRef = useRef('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (userInput: string) => {
    // Add user message
    addMessage({ sender: 'user', content: userInput });
    setLoading(true);
    streamingTextRef.current = '';

    try {
      // Convert messages to AI format
      const chatHistory = messages.map((msg) => ({
        role: msg.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.content,
      }));

      // Send to AI with streaming
      const result = await sendMessageToAI(userInput, chatHistory, (chunk) => {
        streamingTextRef.current += chunk;
      });

      // Add AI response to chat
      addMessage({ sender: 'assistant', content: result.response });

      // Update 3D scene if we got valid params
      if (result.sceneParams) {
        updateScene(result.sceneParams);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        sender: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-800">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">AI 3D Generator</h1>
        <p className="text-sm text-gray-400 mt-1">
          Describe your vision and watch it come to life
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <p className="text-lg mb-2">Welcome! 👋</p>
            <p className="text-sm">
              Try saying things like:
              <br />
              "Make it feel like a sunset"
              <br />
              "Add my name: Alex"
              <br />
              "Give it cyberpunk vibes"
            </p>
          </div>
        )}

        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <InputArea onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
