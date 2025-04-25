import React from 'react';
import { Trophy } from 'lucide-react';

interface AchievementCardProps {
  title: string;
  description: string;
  isUnlocked: boolean;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  isUnlocked,
}) => {
  return (
    <div
      className={`relative p-4 rounded-lg border ${
        isUnlocked
          ? 'bg-accent/10 border-accent'
          : 'bg-secondary/50 border-secondary grayscale'
      } transition-all duration-300 hover:scale-105`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-full ${
            isUnlocked ? 'bg-accent text-accent-foreground' : 'bg-secondary'
          }`}
        >
          <Trophy size={24} />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};