"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (code: string) => boolean;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(code);
    if (!success) {
      setCode('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 animate-in fade-in duration-1000 bg-gradient-to-br from-background via-secondary to-background">
      <Card className="w-full max-w-sm shadow-2xl bg-card/90 backdrop-blur-sm z-10 border-primary/20">
        <CardHeader className="text-center items-center">
          <div className="p-4 bg-primary/10 rounded-full mb-4 relative">
             <Heart className="w-16 h-16 text-primary" fill="currentColor" />
             <Heart className="w-16 h-16 text-white absolute top-4 left-4 animate-ping opacity-50" fill="currentColor" />
          </div>
          <CardTitle className="font-headline text-5xl text-primary">Eternal Flame</CardTitle>
          <CardDescription className="font-body text-foreground/80 pt-2 text-base">Enter the secret code to unlock our world.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Input
              type="password"
              placeholder="Our Secret"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-center font-code tracking-widest text-lg h-12 bg-background/50"
              aria-label="Secret Code"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full font-headline text-xl" size="lg">
              Unlock Our World
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
