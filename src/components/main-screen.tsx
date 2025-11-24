"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Gift, Sparkles, Star } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find(p => p.id === "hero");
const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith("gallery-"));

const loveNotes = [
  {
    icon: <Sparkles className="w-8 h-8 text-accent" />,
    title: "My Dearest,",
    message: "Every single moment spent with you is a moment I treasure. Your smile brightens my entire world, and your laughter is the sweetest music to my ears. You are my everything.",
  },
  {
    icon: <Gift className="w-8 h-8 text-accent" />,
    title: "Remember When?",
    message: "I'll never forget our first date. The way you looked at me made my heart skip a beat. From that day on, I knew my life had changed forever, and for the better.",
  },
  {
    icon: <Star className="w-8 h-8 text-accent" />,
    title: "My Promise",
    message: "I promise to always be your biggest fan and your staunchest supporter. I promise to hold your hand through every storm and celebrate every triumph. My love for you is eternal.",
  },
];


export default function MainScreen() {
  return (
    <div className="animate-in fade-in-0 duration-1000 bg-background">
      <header className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
              />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 p-4">
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl drop-shadow-lg">Forever & Always</h1>
          <p className="font-body text-xl md:text-3xl mt-4 max-w-3xl mx-auto drop-shadow-md italic">This is our story, written in moments of joy and endless love.</p>
        </div>
      </header>

      <main>
        <section id="notes" className="py-16 md:py-24">
           <div className="container mx-auto px-4">
            <h2 className="font-headline text-5xl md:text-6xl text-center text-primary mb-12">Love Letters</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loveNotes.map((note, index) => (
                <Card key={index} className="shadow-lg hover:shadow-2xl transition-shadow duration-300 border-accent/20 bg-card transform hover:-translate-y-2">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {note.icon}
                      <CardTitle className="font-headline text-3xl text-primary">{note.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-body text-foreground/90 text-lg italic leading-relaxed">"{note.message}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-5xl md:text-6xl text-center text-primary mb-12">Our Gallery</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <Card className="overflow-hidden rounded-xl shadow-lg border-accent/10">
                        <CardContent className="p-0 flex aspect-[4/5] items-center justify-center">
                           <Image
                            src={image.imageUrl}
                            alt={image.description}
                            width={400}
                            height={500}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                            data-ai-hint={image.imageHint}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>
      </main>

      <footer className="text-center py-10 bg-secondary">
          <p className="font-headline text-2xl text-secondary-foreground">With all my love, forever. ❤️</p>
      </footer>
    </div>
  );
}
