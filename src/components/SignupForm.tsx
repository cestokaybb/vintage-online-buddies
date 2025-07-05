
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const SignupForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isOver18: false,
    acceptedTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accepter n'importe quelle donnée et rediriger vers le chat
    setUser(formData);
    navigate('/chat');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center p-4">
      <div className="border-2 border-green-400 bg-gray-900 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">░▒▓ CHAT ZONE ▓▒░</h1>
          <p className="text-green-300">═══ INSCRIPTION ═══</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-300 mb-1">► NOM D'UTILISATEUR:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-black border border-green-400 text-green-400 p-2 focus:outline-none focus:border-green-300"
              placeholder="Tapez votre pseudo..."
            />
          </div>

          <div>
            <label className="block text-green-300 mb-1">► MOT DE PASSE:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black border border-green-400 text-green-400 p-2 focus:outline-none focus:border-green-300"
              placeholder="Mot de passe secret..."
            />
          </div>

          <div>
            <label className="block text-green-300 mb-1">► EMAIL:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black border border-green-400 text-green-400 p-2 focus:outline-none focus:border-green-300"
              placeholder="votre@email.com"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-green-300">
              <input
                type="checkbox"
                name="isOver18"
                checked={formData.isOver18}
                onChange={handleChange}
                className="mr-2 accent-green-400"
              />
              ► J'ai plus de 18 ans
            </label>

            <label className="flex items-center text-green-300">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="mr-2 accent-green-400"
              />
              ► J'accepte les conditions d'utilisation
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-400 text-black font-bold py-3 border-2 border-green-400 hover:bg-green-300 hover:border-green-300 transition-colors"
          >
            ═══ ENTRER DANS LE CHAT ═══
          </button>
        </form>

        <div className="text-center mt-6 text-green-600 text-sm">
          <p>▓▒░ Bienvenue dans le futur du chat ░▒▓</p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
