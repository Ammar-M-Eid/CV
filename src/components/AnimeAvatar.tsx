import React from 'react';

interface AnimeAvatarProps {
  imageUrl: string;
  name: string;
}

export const AnimeAvatar: React.FC<AnimeAvatarProps> = ({ imageUrl, name }) => {
  return (
    <div className="relative group">
      <div className="w-32 h-32 rounded-full border-4 border-primary p-1 
        overflow-hidden transition-transform duration-500 transform 
        group-hover:scale-110">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full rounded-full object-cover 
            transition-transform duration-700 transform 
            group-hover:scale-110 group-hover:rotate-3"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 
          to-transparent opacity-0 group-hover:opacity-100 transition-opacity 
          duration-300 rounded-full" />
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
        bg-primary/90 px-3 py-1 rounded-full text-sm font-medium 
        opacity-0 group-hover:opacity-100 transition-all duration-300 
        translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};