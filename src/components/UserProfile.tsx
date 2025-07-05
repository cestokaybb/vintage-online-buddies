
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: user?.password || ''
  });

  const isOwnProfile = user?.username === username;
  
  // Données factices pour les autres utilisateurs
  const userData = isOwnProfile ? user : {
    username: username,
    email: `${username}@example.com`,
    password: '****',
    isOver18: true,
    acceptedTerms: true
  };

  const handleSaveChanges = () => {
    if (isOwnProfile && user) {
      setUser({
        ...user,
        ...editData
      });
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="border-2 border-green-400 bg-gray-900 p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">░▒▓ PROFIL UTILISATEUR ▓▒░</h1>
            <button
              onClick={() => navigate('/chat')}
              className="bg-gray-800 border border-green-400 px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              ◄ RETOUR AU CHAT
            </button>
          </div>
          <p className="text-green-300">═══ Informations de {userData?.username} ═══</p>
        </div>

        {/* Profile Info */}
        <div className="border-2 border-green-400 bg-gray-900 p-6">
          {/* Avatar ASCII */}
          <div className="text-center mb-6">
            <pre className="text-green-300 text-sm">
{`    ████████
  ██░░░░░░░░██
██░░░░░░░░░░░░██
██░░██░░░░██░░██
██░░░░░░░░░░░░██
██░░░░████░░░░██
  ██░░░░░░░░██
    ████████`}
            </pre>
            <p className="text-green-400 font-bold mt-2">&lt;{userData?.username}&gt;</p>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="border border-green-600 p-4">
              <h3 className="text-green-300 font-bold mb-3">► INFORMATIONS GÉNÉRALES</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-green-400">Nom d'utilisateur:</label>
                  {isOwnProfile && isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={editData.username}
                      onChange={handleChange}
                      className="ml-2 bg-black border border-green-400 text-green-400 p-1 focus:outline-none focus:border-green-300"
                    />
                  ) : (
                    <span className="ml-2 text-green-100">{userData?.username}</span>
                  )}
                </div>

                <div>
                  <label className="text-green-400">Email:</label>
                  {isOwnProfile && isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      className="ml-2 bg-black border border-green-400 text-green-400 p-1 focus:outline-none focus:border-green-300"
                    />
                  ) : (
                    <span className="ml-2 text-green-100">{userData?.email}</span>
                  )}
                </div>

                {isOwnProfile && (
                  <div>
                    <label className="text-green-400">Mot de passe:</label>
                    {isEditing ? (
                      <input
                        type="password"
                        name="password"
                        value={editData.password}
                        onChange={handleChange}
                        className="ml-2 bg-black border border-green-400 text-green-400 p-1 focus:outline-none focus:border-green-300"
                      />
                    ) : (
                      <span className="ml-2 text-green-100">********</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="border border-green-600 p-4">
              <h3 className="text-green-300 font-bold mb-3">► STATISTIQUES</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-400">Messages envoyés:</span>
                  <span className="ml-2 text-green-100">1337</span>
                </div>
                <div>
                  <span className="text-green-400">Membre depuis:</span>
                  <span className="ml-2 text-green-100">2024</span>
                </div>
                <div>
                  <span className="text-green-400">Dernière connexion:</span>
                  <span className="ml-2 text-green-100">Maintenant</span>
                </div>
                <div>
                  <span className="text-green-400">Statut:</span>
                  <span className="ml-2 text-green-100">● En ligne</span>
                </div>
              </div>
            </div>

            {isOwnProfile && (
              <div className="flex gap-4 mt-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveChanges}
                      className="bg-green-400 text-black font-bold px-6 py-3 border-2 border-green-400 hover:bg-green-300 hover:border-green-300 transition-colors"
                    >
                      ═══ SAUVEGARDER ═══
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-red-900 border border-red-400 text-red-400 px-6 py-3 hover:bg-red-800 transition-colors"
                    >
                      ═══ ANNULER ═══
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-yellow-600 text-black font-bold px-6 py-3 border-2 border-yellow-400 hover:bg-yellow-500 hover:border-yellow-300 transition-colors"
                  >
                    ═══ MODIFIER ═══
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-green-600 text-sm">
          <p>▓▒░ Profil généré automatiquement ░▒▓</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
