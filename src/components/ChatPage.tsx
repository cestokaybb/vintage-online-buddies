
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const ChatPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{id: number, user: string, text: string, time: string}>>([
    { id: 1, user: 'Admin', text: 'Bienvenue dans le chat général !', time: '12:34' },
    { id: 2, user: 'OldSchoolGamer', text: 'Salut tout le monde ! 😎', time: '12:35' },
    { id: 3, user: 'RetroFan90s', text: 'Qui se souvient des anciens forums ?', time: '12:36' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && user) {
      const newMessage = {
        id: messages.length + 1,
        user: user.username,
        text: message,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
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
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="border-b-2 border-green-400 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">░▒▓ CHAT ZONE - SALON GÉNÉRAL ▓▒░</h1>
          <p className="text-green-300">Connecté en tant que: {user.username}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleUserClick(user.username)}
            className="bg-gray-800 border border-green-400 px-4 py-2 hover:bg-gray-700 transition-colors"
          >
            ► MON PROFIL
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-900 border border-red-400 text-red-400 px-4 py-2 hover:bg-red-800 transition-colors"
          >
            ► QUITTER
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 h-96 overflow-y-auto bg-gray-900 border-2 border-green-400 m-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-3 border-b border-green-800 pb-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-green-300">[{msg.time}]</span>
              <button
                onClick={() => handleUserClick(msg.user)}
                className="text-green-400 font-bold hover:text-green-300 hover:underline cursor-pointer"
              >
                &lt;{msg.user}&gt;
              </button>
            </div>
            <p className="text-green-100 ml-4">► {msg.text}</p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t-2 border-green-400">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 bg-black border border-green-400 text-green-400 p-3 focus:outline-none focus:border-green-300"
          />
          <button
            type="submit"
            className="bg-green-400 text-black font-bold px-6 py-3 border-2 border-green-400 hover:bg-green-300 hover:border-green-300 transition-colors"
          >
            ═══ ENVOYER ═══
          </button>
        </form>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 border-t border-green-400 p-2 text-center text-green-600 text-sm">
        ▓▒░ {messages.length} messages • Utilisateurs connectés: 42 ░▒▓
      </div>
    </div>
  );
};

export default ChatPage;
