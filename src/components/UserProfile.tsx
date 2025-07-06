
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Edit2, Save, X } from 'lucide-react';

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

  const handleCancel = () => {
    setEditData({
      username: user?.username || '',
      email: user?.email || '',
      password: user?.password || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#36393f] p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/chat')}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au chat
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="bg-[#2f3136] border-gray-600">
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-[#5865f2] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              {userData?.username?.charAt(0).toUpperCase()}
            </div>
            <CardTitle className="text-white text-2xl">{userData?.username}</CardTitle>
            <CardDescription className="text-gray-300">
              {isOwnProfile ? 'Votre profil' : 'Profil utilisateur'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Information */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center">
                Informations personnelles
                {isOwnProfile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="ml-auto text-gray-400 hover:text-white"
                  >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                  </Button>
                )}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">Nom d'utilisateur</Label>
                  {isOwnProfile && isEditing ? (
                    <Input
                      name="username"
                      value={editData.username}
                      onChange={handleChange}
                      className="mt-1 bg-[#40444b] border-gray-600 text-white"
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-[#40444b] rounded text-white">
                      {userData?.username}
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-gray-300">Email</Label>
                  {isOwnProfile && isEditing ? (
                    <Input
                      name="email"
                      type="email"
                      value={editData.email}
                      onChange={handleChange}
                      className="mt-1 bg-[#40444b] border-gray-600 text-white"
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-[#40444b] rounded text-white">
                      {userData?.email}
                    </div>
                  )}
                </div>

                {isOwnProfile && (
                  <div>
                    <Label className="text-gray-300">Mot de passe</Label>
                    {isEditing ? (
                      <Input
                        name="password"
                        type="password"
                        value={editData.password}
                        onChange={handleChange}
                        className="mt-1 bg-[#40444b] border-gray-600 text-white"
                      />
                    ) : (
                      <div className="mt-1 p-2 bg-[#40444b] rounded text-white">
                        ••••••••
                      </div>
                    )}
                  </div>
                )}
              </div>

              {isOwnProfile && isEditing && (
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={handleSaveChanges}
                    className="bg-[#5865f2] hover:bg-[#4752c4] text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Annuler
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
