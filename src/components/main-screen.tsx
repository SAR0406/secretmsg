
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MapPin, Heart, Sparkles, Milestone, HeartHandshake } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";

const ourMomentImage = PlaceHolderImages.find(p => p.id === "our-moment");

const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith("gallery-"));

const timelineEvents = [
  {
    icon: <Heart className="w-8 h-8 text-accent drop-shadow-lg" />,
    title: "The Day We Met",
    description: "Where our story began. A day that changed my life forever.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-accent drop-shadow-lg" />,
    title: "Our First Date",
    description: "The beginning of countless adventures and beautiful memories.",
  },
  {
    icon: <Milestone className="w-8 h-8 text-accent drop-shadow-lg" />,
    title: "Became Inseparable",
    description: "The moment I knew you were the one I wanted to share my life with.",
  }
];

const promises = [
    "To always be your biggest supporter.",
    "To make you laugh, especially when you need it most.",
    "To create a home filled with warmth and love.",
    "To never stop exploring the world with you.",
    "To be your partner in crime, forever and always.",
    "To listen, even when we don't agree.",
    "To remind you every day how much you mean to me."
];

const reasonsILoveYou = [
  "Your infectious laugh and the way your eyes light up when you smile. 😄",
  "Your incredible kindness and compassion for everyone you meet. 💖",
  "The way you make me feel safe, loved, and completely at home. 🏡",
  "Your unwavering support for my dreams, no matter how big or small. 🚀",
  "Our late-night talks that turn into early-morning giggles. 💬",
  "Your amazing sense of adventure and willingness to try new things with me. 🌍"
];

export default function MainScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPromise, setCurrentPromise] = useState("Click the button to see a promise...");

  const revealPromise = () => {
    const randomIndex = Math.floor(Math.random() * promises.length);
    setCurrentPromise(promises[randomIndex]);
  };

  return (
    <div className="animate-in fade-in-0 duration-1000 bg-background/50 text-foreground min-h-screen">
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-2xl flex flex-col items-center text-center">
        {ourMomentImage && (
          <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-primary/50 animate-pulse-slow mb-8">
            <Image
              src={ourMomentImage.imageUrl}
              alt={ourMomentImage.description}
              fill
              className="object-cover"
              data-ai-hint={ourMomentImage.imageHint}
              priority
            />
          </div>
        )}
        
        <h1 
          className="font-headline text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-in fade-in-0"
          style={{ filter: 'drop-shadow(0 0 1.5rem hsl(var(--primary) / 0.7))' }}
        >
          Eternal Flame
        </h1>
        <p 
          className="font-headline text-4xl md:text-5xl mt-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 animate-in fade-in-0 delay-300"
           style={{ filter: 'drop-shadow(0 0 1rem rgb(236 72 153 / 0.5))' }}
        >
          I love you Cookie 💗✨💖
        </p>
        <p className="font-body text-xl md:text-2xl mt-4 text-foreground/80 italic">With all my love, forever and always.</p>

        <div className="w-full mt-16 md:mt-24 space-y-12">
            <section id="journey">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-xl transition-all duration-300 hover:shadow-primary/20 hover:scale-[1.02]">
                    <CardHeader>
                        <CardTitle className="font-headline text-4xl text-primary flex items-center justify-center gap-4">
                            <MapPin className="w-10 h-10 drop-shadow-lg"/> Our Journey
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="relative pl-8">
                        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-primary/30"></div>
                        {timelineEvents.map((event, index) => (
                          <div key={index} className="relative flex items-start gap-6 mb-6">
                            <div className="absolute left-4 top-4 -translate-x-1/2 w-8 h-8 bg-background rounded-full border-2 border-primary flex items-center justify-center">
                              <div className="w-3 h-3 bg-primary rounded-full"></div>
                            </div>
                            <div className="p-4 rounded-lg bg-secondary/50 text-left flex-1">
                                <h3 className="font-body font-semibold text-lg flex items-center gap-3 mb-1 text-primary">{event.icon}{event.title}</h3>
                                <p className="font-body text-foreground/90 leading-relaxed italic">"{event.description}"</p>
                            </div>
                          </div>
                        ))}
                        {/* Promise Box */}
                        <div className="relative flex items-start gap-6">
                            <div className="absolute left-4 top-4 -translate-x-1/2 w-8 h-8 bg-background rounded-full border-2 border-primary flex items-center justify-center">
                              <div className="w-3 h-3 bg-primary rounded-full"></div>
                            </div>
                            <div className="p-4 rounded-lg bg-secondary/50 text-left flex-1">
                                <h3 className="font-body font-semibold text-lg flex items-center gap-3 mb-2 text-primary">
                                    <HeartHandshake className="w-8 h-8 text-accent drop-shadow-lg"/> A Promise Made
                                </h3>
                                <p className="font-body text-foreground/90 leading-relaxed italic h-12 flex items-center animate-in fade-in duration-500">
                                    "{currentPromise}"
                                </p>
                                <Button onClick={revealPromise} size="sm" className="mt-2">Reveal a Promise</Button>
                            </div>
                          </div>
                      </div>
                    </CardContent>
                </Card>
            </section>
            
            <section id="gallery">
                 <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:scale-[1.02]">
                    <CardHeader>
                        <CardTitle className="font-headline text-4xl text-primary flex items-center justify-center gap-4">
                            <Camera className="w-10 h-10 drop-shadow-lg"/> Our Memories
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <Carousel
                          opts={{
                            align: "start",
                            loop: true,
                          }}
                          className="w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto"
                        >
                          <CarouselContent>
                            {galleryImages.map((image, index) => (
                              <CarouselItem key={index} className="md:basis-1/2">
                                <div className="p-1">
                                  <Card className="overflow-hidden">
                                    <CardContent className="flex aspect-square items-center justify-center p-0">
                                      <div className="cursor-pointer w-full h-full" onClick={() => setSelectedImage(image.imageUrl)}>
                                        <Image
                                          src={image.imageUrl}
                                          alt={image.description}
                                          width={400}
                                          height={400}
                                          className="object-cover w-full h-full"
                                          data-ai-hint={image.imageHint}
                                        />
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                    </CardContent>
                </Card>
            </section>
            
            <section id="reasons">
                <Card className="bg-card/50 backdrop-blur-sm border-accent/20 shadow-xl transition-all duration-300 hover:shadow-accent/20 hover:scale-[1.02]">
                    <CardHeader>
                        <CardTitle className="font-headline text-4xl text-accent flex items-center justify-center gap-4">
                            <HeartHandshake className="w-10 h-10 drop-shadow-lg"/> Reasons I Love You
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {reasonsILoveYou.map((reason, index) => (
                            <p key={index} className="font-body text-lg text-foreground/90 italic animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 150}ms`}}>
                                {reason}
                            </p>
                        ))}
                    </CardContent>
                </Card>
            </section>
        </div>

      </main>

      <footer className="text-center py-10 mt-16 border-t border-border">
          <p className="font-headline text-2xl text-secondary-foreground">Forever & Always ❤️</p>
          <p className="font-body text-lg text-muted-foreground mt-2">with love , sarthak 💗</p>
      </footer>

      <Dialog open={selectedImage !== null} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 bg-transparent border-0">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Enlarged gallery image"
              width={1200}
              height={800}
              className="rounded-lg object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
