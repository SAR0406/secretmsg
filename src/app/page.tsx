"use client";

import { useState, useEffect } from 'react';
import MainScreen from '@/components/main-screen';
import { useToast } from '@/hooks/use-toast';
import Starfield from '@/components/starfield';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const SECRET_CODE = "2310";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [code, setCode] = useState('');
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // This check runs only on the client.
    const authenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (authenticated) {
      setIsAuthenticated(true);
    } else {
      // Use a short timeout to ensure the main screen has a moment to render before blurring
      const timer = setTimeout(() => setShowLoginDialog(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (code === SECRET_CODE) {
      sessionStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      setShowLoginDialog(false);
      toast({
        title: "Welcome Back, My Love! 💕",
        description: "Our world is unlocked.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Wrong Code 🤔",
        description: "That's not the secret code, my love. Try again!",
      });
      setCode('');
    }
  };
  
  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <Starfield />
      <MainScreen />

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent 
            className="w-full max-w-sm shadow-2xl bg-card/80 backdrop-blur-sm z-50 border-primary/20" 
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="text-center items-center pt-6">
            <div className="p-4 bg-primary/10 rounded-full mb-4 relative">
               <Heart className="w-16 h-16 text-primary animate-pulse" fill="currentColor" />
            </div>
            <DialogTitle className="font-headline text-5xl text-primary">Eternal Flame ✨</DialogTitle>
            <DialogDescription className="font-body text-foreground/80 pt-2 text-base">
              Enter the secret code to unlock our world.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <div className="p-6 pt-0">
              <Input
                type="password"
                placeholder="Our Secret"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center font-code tracking-widest text-lg h-12 bg-background/50 text-foreground"
                aria-label="Secret Code"
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full font-headline text-xl" size="lg">
                Unlock Our World 💖
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
