import React from 'react';
import { Star } from 'lucide-react';

interface SkillBadgeProps {
  name: string;
  level: number;
  color: string;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ name, level, color }) => {
  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
      border border-${color}/20 bg-${color}/10 hover:bg-${color}/20 
      transition-all duration-300 cursor-pointer group`}
    >
      <span className="text-sm font-medium">{name}</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${i < level ? `text-${color}` : 'text-muted'} 
            transition-transform group-hover:scale-110 group-hover:rotate-[360deg] 
            duration-300 delay-[${i * 100}ms]`}
            fill={i < level ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    </div>
  );
};