import React from 'react';

interface MagicWandProps {
  onCast?: (e: React.MouseEvent<HTMLDivElement>) => void;
  phrase?: string;
}

export const MagicWand: React.FC<MagicWandProps> = ({ onCast, phrase }) => {
  return (
    <div className="fixed bottom-4 left-4 cursor-pointer group z-50" onClick={onCast} title="Cast a spell!">
      <div className="relative w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shadow-lg">
        <div className="w-8 h-1 bg-primary transform rotate-45 group-hover:scale-x-110 transition-transform">
          <div className="absolute w-2 h-2 bg-primary rounded-full -left-1 -top-0.5" />
        </div>
        <div className="absolute inset-0 animate-ping bg-primary/20 rounded-full" />
        <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-secondary/80 text-xs px-2 py-1 rounded">
          Cast a spell!
        </div>
      </div>
      {phrase && (
        <div className="absolute left-16 bottom-1 bg-secondary/90 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn text-lg font-bold">
          {phrase}
        </div>
      )}
    </div>
  );
};