
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const SignupForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isOver18: false,
    acceptedTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-[#36393f] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#2f3136] border-gray-600">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            {isLoginMode ? 'Se connecter' : 'Créer un compte'}
          </CardTitle>
          <CardDescription className="text-gray-300">
            {isLoginMode ? 'Bon retour parmi nous !' : 'Rejoignez notre communauté de chat'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-200">Nom d'utilisateur</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="bg-[#40444b] border-gray-600 text-white placeholder-gray-400"
                placeholder="Entrez votre nom d'utilisateur"
                required
              />
            </div>

            {!isLoginMode && (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#40444b] border-gray-600 text-white placeholder-gray-400"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-[#40444b] border-gray-600 text-white placeholder-gray-400"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>

            {!isLoginMode && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isOver18"
                    name="isOver18"
                    checked={formData.isOver18}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, isOver18: !!checked }))
                    }
                  />
                  <Label htmlFor="isOver18" className="text-gray-200 text-sm">
                    J'ai plus de 18 ans
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptedTerms"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, acceptedTerms: !!checked }))
                    }
                  />
                  <Label htmlFor="acceptedTerms" className="text-gray-200 text-sm">
                    J'accepte les conditions d'utilisation
                  </Label>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white font-medium"
            >
              {isLoginMode ? 'Se connecter' : 'Créer mon compte'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-[#5865f2] hover:underline text-sm"
              >
                {isLoginMode ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
