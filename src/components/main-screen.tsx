"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Sparkles, Star, Heart, HeartHandshake, Camera } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ourMomentImage = PlaceHolderImages.find(p => p.id === "our-moment");

const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith("gallery-"));

const loveNotes = [
  {
    icon: <Sparkles className="w-10 h-10 text-accent drop-shadow-lg" />,
    title: "My Dearest, 💖",
    message: "Every single moment spent with you is a moment I treasure. Your smile brightens my entire world, and your laughter is the sweetest music to my ears. You are my everything. 🥰",
  },
  {
    icon: <Gift className="w-10 h-10 text-accent drop-shadow-lg" />,
    title: "Remember When? ✨",
    message: "I'll never forget our first date. The way you looked at me made my heart skip a beat. From that day on, I knew my life had changed forever, and for the better. ❤️",
  },
  {
    icon: <Star className="w-10 h-10 text-accent drop-shadow-lg" />,
    title: "My Promise 💍",
    message: "I promise to always be your biggest fan and your staunchest supporter. I promise to hold your hand through every storm and celebrate every triumph. My love for you is eternal. 🔐",
  },
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
          I love you 😘
        </p>
        <p className="font-body text-xl md:text-2xl mt-4 text-foreground/80 italic">With all my love, forever and always.</p>

        <div className="w-full mt-16 md:mt-24 space-y-12">
            <section id="notes">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-xl transition-all duration-300 hover:shadow-primary/20 hover:scale-[1.02]">
                    <CardHeader>
                        <CardTitle className="font-headline text-4xl text-primary flex items-center justify-center gap-4">
                            <Heart className="w-10 h-10 drop-shadow-lg"/> A Message For You
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         {loveNotes.map((note, index) => (
                            <div key={index} className="text-left p-4 rounded-lg bg-secondary/50">
                                <h3 className="font-body font-semibold text-lg flex items-center gap-3 mb-1">{note.icon}{note.title}</h3>
                                <p className="font-body text-foreground/90 leading-relaxed italic">"{note.message}"</p>
                            </div>
                        ))}
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
                                      <Image
                                        src={image.imageUrl}
                                        alt={image.description}
                                        width={400}
                                        height={400}
                                        className="object-cover w-full h-full"
                                        data-ai-hint={image.imageHint}
                                      />
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
      </footer>
    </div>
  );
}
