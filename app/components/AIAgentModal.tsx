import React, { useState, useRef, useEffect } from "react";
import { Terminal, Send, Bot, User, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

interface AIAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const AIAgentModal: React.FC<AIAgentModalProps> = ({
  open,
  onOpenChange,
  isOpen,
  onClose,
}) => {
  const isDialogOpen = open || isOpen || false;

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange?.(newOpen);
    if (!newOpen) onClose?.();
  };
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "system",
      content:
        "AI Agent initialized successfully. Connected to profile database.",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      type: "bot",
      content:
        "Hello! I'm Budi Prih Hastomo's AI Assistant. I can help you learn about his experience, skills, projects, and more. What would you like to know?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "bot",
        content:
          "This is where the AI agent will respond with information about Budi Prih Hastomo's profile, experience, and projects. The RAG system will be integrated here.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-[800px] bg-black border-gray-700 text-white p-0 max-h-[90vh] flex flex-col animate-in fade-in-0 zoom-in-95 duration-300 z-50"
        showCloseButton={false}
      >
        {/* Terminal Container */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
            <div className="flex space-x-2">
              <DialogClose>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </DialogClose>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400 font-mono flex items-center">
              <Terminal className="mr-2" size={14} />
              ~/ai-agent/chat-session
            </div>
            <div className="ml-auto flex items-center text-green-400">
              <Zap className="mr-1" size={14} />
              <span className="text-xs font-mono">ONLINE</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 animate-fade-in ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type !== "user" && (
                  <div
                    className={`p-2 rounded-full ${message.type === "system"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-green-500/20 text-green-400"
                      }`}
                  >
                    {message.type === "system" ? (
                      <Terminal size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>
                )}

                <div
                  className={`max-w-xs lg:max-w-md ${message.type === "user" ? "order-first" : ""
                    }`}
                >
                  <div
                    className={`p-3 rounded-lg font-mono text-sm ${message.type === "user"
                      ? "bg-green-600 text-white ml-auto"
                      : message.type === "system"
                        ? "bg-blue-900/50 text-blue-300 border border-blue-700/50"
                        : "bg-gray-800 text-gray-300 border border-gray-700"
                      }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-mono">
                    {message.timestamp}
                  </div>
                </div>

                {message.type === "user" && (
                  <div className="p-2 rounded-full bg-green-500/20 text-green-400">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-3 animate-pulse">
                <div className="p-2 rounded-full bg-green-500/20 text-green-400">
                  <Bot size={16} />
                </div>
                <div className="bg-gray-800 text-gray-300 border border-gray-700 p-3 rounded-lg font-mono text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex space-x-2">
              <div className="flex items-center text-green-400 font-mono text-sm mr-2">
                <span className="text-gray-500">$</span>
              </div>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Budi's experience, skills, projects..."
                className="flex-1 bg-gray-900 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 font-mono"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-green-600 hover:bg-green-500 text-white px-4"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="p-4 bg-gray-900 border-t border-gray-700">
          <div className="mb-3">
            <h3 className="text-green-400 font-mono text-sm">
              // Quick Commands
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => setInputValue("What are Budi's main skills?")}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-green-400 font-mono text-sm justify-start"
            >
              ./get_skills.sh
            </Button>
            <Button
              variant="outline"
              onClick={() => setInputValue("Tell me about Budi's projects")}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-green-400 font-mono text-sm justify-start"
            >
              ./show_projects.sh
            </Button>
            <Button
              variant="outline"
              onClick={() => setInputValue("What is Budi's experience?")}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-green-400 font-mono text-sm justify-start"
            >
              ./get_experience.sh
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAgentModal;
