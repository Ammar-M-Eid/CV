import React, { useState } from 'react';
import { Shield } from 'lucide-react';

export interface House {
  name: string;
  color: string;
  traits: string[];
}

type Props = {
  onSelect?: (house: House) => void;
};
export const HouseSelector: React.FC<Props> = ({ onSelect }) => {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const houses: House[] = [
    {
      name: "Gryffindor",
      color: "from-red-600 to-yellow-500",
      traits: ["Brave", "Determined", "Leadership"]
    },
    {
      name: "Slytherin",
      color: "from-green-600 to-gray-200",
      traits: ["Ambitious", "Cunning", "Strategic"]
    },
    {
      name: "Ravenclaw",
      color: "from-blue-600 to-bronze-200",
      traits: ["Wise", "Creative", "Analytical"]
    },
    {
      name: "Hufflepuff",
      color: "from-yellow-400 to-black",
      traits: ["Loyal", "Patient", "Dedicated"]
    }
  ];

  const selectRandomHouse = () => {
    setIsAnimating(true);
    const randomIndex = Math.floor(Math.random() * houses.length);
    setTimeout(() => {
      const house = houses[randomIndex];
      setSelectedHouse(house);
      if (onSelect) onSelect(house);
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div className="relative group flex flex-col items-center justify-center">
      <button
        onClick={selectRandomHouse}
        disabled={isAnimating}
        className="px-4 py-2 bg-secondary/30 rounded-lg hover:bg-secondary/50 
        transition-all duration-300 flex items-center gap-2 font-semibold border border-primary shadow mx-auto"
        title="Discover your house and my passion for software quality!"
      >
        <Shield className="w-5 h-5 text-primary" />
        <span>
          {selectedHouse ? selectedHouse.name :
            <>
              Sort me! <span className="ml-2 text-xs text-primary/80">(Testing | Quantum | Software Engineering)</span>
            </>
          }
        </span>
      </button>

      {selectedHouse && !isAnimating && (
        <div className="mt-2 p-3 rounded-lg bg-gradient-to-r animate-fadeIn w-full flex flex-col items-center justify-center">
          <div
            className={`bg-gradient-to-r ${selectedHouse.color} p-4 rounded-lg shadow-magical w-full flex flex-col items-center justify-center transition-all opacity-90`}
            style={{ transitionProperty: 'background, opacity' }}
          >
            <h4 className="font-semibold mb-2 text-white">{selectedHouse.name}</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedHouse.traits.map((trait) => (
                <span key={trait}
                  className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin w-6 h-6 border-2 border-primary 
            border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  );
};