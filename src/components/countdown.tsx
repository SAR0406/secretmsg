"use client";

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft | null => {
  const difference = +new Date(targetDate) - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return null;
};

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  if (!timeLeft) {
    return <div className="font-headline text-4xl text-accent">Happy Special Day! 🎉</div>;
  }

  return (
    <div className="flex justify-center items-center space-x-4 md:space-x-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-bold text-primary tracking-tighter w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-card rounded-2xl shadow-lg border-2 border-primary/20">
            {value.toString().padStart(2, '0')}
          </div>
          <div className="mt-3 text-lg md:text-xl font-headline text-foreground/80 capitalize">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
