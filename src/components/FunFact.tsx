import React, { useState } from 'react';
import { Code, GraduationCap, Trophy, Brain, Heart, Coffee, Wand2 } from 'lucide-react';

interface FunFact {
  icon: JSX.Element;
  text: string;
  color: string;
}

export const FunFacts: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const facts: FunFact[] = [
    { icon: <GraduationCap className="h-6 w-6" />, text: "3.8/4.0 GPA Wizard 🎓", color: "text-blue-500" },
    { icon: <Code className="h-6 w-6" />, text: "ICPC Programming Champion 🏆", color: "text-green-500" },
    { icon: <Trophy className="h-6 w-6" />, text: "EYE Organization Leader 👁️", color: "text-yellow-500" },
    { icon: <Brain className="h-6 w-6" />, text: "AI & Blockchain Explorer 🤖", color: "text-purple-500" },
    { icon: <Heart className="h-6 w-6" />, text: "Community Builder 🤝", color: "text-red-500" },
    { icon: <Coffee className="h-6 w-6" />, text: "Powered by Coffee & Code ⚡", color: "text-amber-500" },
    { icon: <Wand2 className="h-6 w-6" />, text: "Debugging with Magic 🪄", color: "text-indigo-500" },
  ];

  const nextFact = () => {
    setCurrentIndex((prev) => (prev + 1) % facts.length);
  };

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
};