"use client";

import { useState, useEffect } from 'react';
import LoginScreen from '@/components/login-screen';
import MainScreen from '@/components/main-screen';
import { useToast } from '@/hooks/use-toast';

const SECRET_CODE = "2310";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    // Check if user is already authenticated in session storage
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (code: string) => {
    if (code === SECRET_CODE) {
      sessionStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Wrong Code",
        description: "That's not the secret code, my love. Try again!",
      });
      return false;
    }
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        {/* You can add a loader here */}
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? <MainScreen /> : <LoginScreen onLogin={handleLogin} />}
    </>
  );
}
