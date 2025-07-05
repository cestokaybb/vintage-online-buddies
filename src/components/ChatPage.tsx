
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Hash, Send, Settings, LogOut, User } from 'lucide-react';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  avatar: string;
}

const ChatPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      user: 'Admin', 
      text: 'Bienvenue dans le salon général ! 👋', 
      time: '12:34',
      avatar: '🛡️'
    },
    { 
      id: 2, 
      user: 'Alice', 
      text: 'Salut tout le monde ! Comment ça va ?', 
      time: '12:35',
      avatar: '🌸'
    },
    { 
      id: 3, 
      user: 'Bob', 
      text: 'Super bien ! Et vous ?', 
      time: '12:36',
      avatar: '🚀'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && user) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: user.username,
        text: message,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        avatar: '👤'
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleUserClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#36393f] flex">
      {/* Sidebar */}
      <div className="w-60 bg-[#2f3136] flex flex-col">
        {/* Server Header */}
        <div className="h-12 px-4 flex items-center bg-[#27292d] border-b border-gray-600">
          <h1 className="text-white font-semibold">Chat Zone</h1>
        </div>

        {/* Channels */}
        <div className="flex-1 p-2">
          <div className="flex items-center px-2 py-1 text-gray-300 text-sm font-medium">
            <Hash className="w-4 h-4 mr-2" />
            général
          </div>
        </div>

        {/* User Panel */}
        <div className="h-14 bg-[#27292d] px-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="ml-2">
              <div className="text-white text-sm font-medium">{user.username}</div>
              <div className="text-gray-400 text-xs">En ligne</div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-600"
              onClick={() => handleUserClick(user.username)}
            >
              <User className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-600"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-12 px-4 flex items-center bg-[#36393f] border-b border-gray-600">
          <Hash className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-white font-medium">général</span>
          <div className="ml-4 text-gray-400 text-sm">
            Salon de discussion général
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 hover:bg-[#32353b] p-2 rounded">
                <div className="w-10 h-10 bg-[#5865f2] rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                  {msg.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <button
                      onClick={() => handleUserClick(msg.user)}
                      className="text-white font-medium hover:underline cursor-pointer"
                    >
                      {msg.user}
                    </button>
                    <span className="text-gray-400 text-xs">{msg.time}</span>
                  </div>
                  <p className="text-gray-200">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 bg-[#40444b] border-gray-600 text-white placeholder-gray-400"
            />
            <Button
              type="submit"
              className="bg-[#5865f2] hover:bg-[#4752c4] text-white"
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
