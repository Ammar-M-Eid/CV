

import { useState, useEffect, useRef } from 'react';
import { Code, GraduationCap, Trophy, Brain, Heart, Coffee, Wand2 } from 'lucide-react';

interface FunFact {
  icon: JSX.Element;
  text: string;
  color: string;
}

export function FunFacts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const facts: FunFact[] = [
    { icon: <GraduationCap className="h-6 w-6" />, text: "Computer Science Undergrad 🎓", color: "text-blue-500" },
    { icon: <GraduationCap className="h-6 w-6" />, text: "Detail-Oriented Software Tester 🔧", color: "text-orange-500" },
    
    { icon: <Code className="h-6 w-6" />, text: "Problem Solver 🧠", color: "text-pink-500" },

    { icon: <Brain className="h-6 w-6" />, text: "AI & Blockchain Explorer 🤖", color: "text-purple-500" },
    { icon: <Heart className="h-6 w-6" />, text: "Community Builder 🤝", color: "text-red-500" },
    { icon: <Coffee className="h-6 w-6" />, text: "Powered by Coffee & Code ⚡", color: "text-amber-500" },
    { icon: <Wand2 className="h-6 w-6" />, text: "Debugging with Magic 🪄", color: "text-indigo-500" },
    // New fun facts about quantum and testing
    { icon: <Brain className="h-6 w-6" />, text: "⚛️ Superposition is my comfort zone!", color: "text-cyan-500" },
    { icon: <Code className="h-6 w-6" />, text: "Writes tests before breakfast (and after) 🧪", color: "text-pink-500" },
    { icon: <Trophy className="h-6 w-6" />, text: "Once found a bug in a quantum algorithm 🐛⚛️", color: "text-violet-500" },
    { icon: <Coffee className="h-6 w-6" />, text: "Can explain Schrödinger’s cat with unit tests 🐱📦", color: "text-emerald-500" },
    { icon: <Wand2 className="h-6 w-6" />, text: "Testing is my magic spell ✨", color: "text-fuchsia-500" },
  ];

  const nextFact = () => {
    setCurrentIndex((prev: number) => (prev + 1) % facts.length);
    // Reset timer on click
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % facts.length);
    }, 4000);
  };

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % facts.length);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div
      onClick={nextFact}
      className="inline-flex items-center gap-3 px-4 py-2 rounded-lg 
        bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 
        cursor-pointer group"
    >
      <span className={`${facts[currentIndex].color} transition-transform 
          group-hover:rotate-[360deg] duration-500`}>
        {facts[currentIndex].icon}
      </span>
      <span className="text-sm">{facts[currentIndex].text}</span>
    </div>
  );
}
