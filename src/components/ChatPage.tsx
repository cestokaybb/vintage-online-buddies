
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Hash, Send, Settings, LogOut, User, Plus } from 'lucide-react';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
}

interface Channel {
  id: string;
  name: string;
  members: string[];
}

const ChatPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [message, setMessage] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [showChannelForm, setShowChannelForm] = useState(false);
  const [activeChannel, setActiveChannel] = useState('general');
  const [channels, setChannels] = useState<Channel[]>([
    { id: 'general', name: 'général', members: ['Admin', 'Alice', 'Bob'] }
  ]);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      user: 'Admin', 
      text: 'Bienvenue dans le salon général ! 👋', 
      time: '12:34'
    },
    { 
      id: 2, 
      user: 'Alice', 
      text: 'Salut tout le monde ! Comment ça va ?', 
      time: '12:35'
    },
    { 
      id: 3, 
      user: 'Bob', 
      text: 'Super bien ! Et vous ?', 
      time: '12:36'
    }
  ]);

  const allUsers = ['Admin', 'Alice', 'Bob', user?.username].filter(Boolean);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && user) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: user.username,
        text: message,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChannelName.trim() && user) {
      const mentions = newChannelName.match(/@(\w+)/g);
      const mentionedUsers = mentions ? mentions.map(m => m.substring(1)) : [];
      const validMentions = mentionedUsers.filter(username => 
        allUsers.includes(username) && username !== user.username
      );
      
      const channelMembers = [user.username, ...validMentions];
      const channelName = newChannelName.replace(/@\w+/g, '').trim() || 'nouveau-channel';
      
      const newChannel: Channel = {
        id: `channel-${Date.now()}`,
        name: channelName,
        members: channelMembers
      };
      
      setChannels(prev => [...prev, newChannel]);
      setNewChannelName('');
      setShowChannelForm(false);
      setActiveChannel(newChannel.id);
      setMessages([]);
    }
  };

  const getChannelDisplayName = (channel: Channel) => {
    if (channel.id === 'general') return channel.name;
    return `${channel.name} (${channel.members.length})`;
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

  const currentChannel = channels.find(c => c.id === activeChannel);

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
          <div className="flex items-center justify-between px-2 py-1 text-gray-300 text-sm font-medium mb-2">
            <span>CHANNELS</span>
            <Button
              variant="ghost"
              size="icon"
              className="w-4 h-4 text-gray-400 hover:text-white"
              onClick={() => setShowChannelForm(true)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          {showChannelForm && (
            <form onSubmit={handleCreateChannel} className="px-2 mb-2">
              <Input
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                placeholder="nom-du-channel @utilisateur"
                className="h-8 text-xs bg-[#40444b] border-gray-600 text-white placeholder-gray-400"
                autoFocus
              />
              <div className="flex gap-1 mt-1">
                <Button type="submit" size="sm" className="h-6 text-xs bg-[#5865f2] hover:bg-[#4752c4]">
                  Créer
                </Button>
                <Button 
                  type="button" 
                  size="sm" 
                  variant="ghost" 
                  className="h-6 text-xs text-gray-400"
                  onClick={() => setShowChannelForm(false)}
                >
                  ✕
                </Button>
              </div>
            </form>
          )}

          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`flex items-center px-2 py-1 text-sm cursor-pointer rounded ${
                activeChannel === channel.id 
                  ? 'bg-[#5865f2] text-white' 
                  : 'text-gray-300 hover:bg-[#40444b] hover:text-white'
              }`}
              onClick={() => {
                setActiveChannel(channel.id);
                if (channel.id !== 'general') {
                  setMessages([]);
                }
              }}
            >
              <Hash className="w-4 h-4 mr-2" />
              {getChannelDisplayName(channel)}
            </div>
          ))}
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
          <span className="text-white font-medium">{currentChannel?.name}</span>
          <div className="ml-4 text-gray-400 text-sm">
            {currentChannel?.id === 'general' 
              ? 'Salon de discussion général' 
              : `${currentChannel?.members.length} membres`
            }
          </div>
          {currentChannel && currentChannel.id !== 'general' && (
            <div className="ml-4 text-gray-400 text-sm">
              Membres: {currentChannel.members.join(', ')}
            </div>
          )}
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 hover:bg-[#32353b] p-2 rounded">
                <div className="w-10 h-10 bg-[#5865f2] rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                  {msg.user.charAt(0).toUpperCase()}
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
              placeholder={`Écrivez votre message dans #${currentChannel?.name}...`}
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
