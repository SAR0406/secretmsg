"use client";

import { useState, useEffect } from 'react';
import LoginScreen from '@/components/login-screen';
import MainScreen from '@/components/main-screen';
import { useToast } from '@/hooks/use-toast';
import Confetti from '@/components/confetti';

const SECRET_CODE = "2310";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // This check runs only on the client, after the component has mounted.
    const authenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authenticated);
  }, []);

  const handleLogin = (code: string) => {
    if (code === SECRET_CODE) {
      sessionStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Wrong Code 🤔",
        description: "That's not the secret code, my love. Try again!",
      });
      return false;
    }
  };

  // While we're checking for authentication on the client, show a loading state.
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        Loading...
      </div>
    );
  }

  // Once the check is complete, render the correct screen.
  return (
    <>
      <Confetti />
      {isAuthenticated ? <MainScreen /> : <LoginScreen onLogin={handleLogin} />}
    </>
  );
}
