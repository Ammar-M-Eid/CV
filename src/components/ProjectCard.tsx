import React, { useState } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  stars: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  imageUrl,
  demoUrl,
  githubUrl,
  stars,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group rounded-lg overflow-hidden border border-secondary bg-secondary/10 shadow-sm"
      style={{ maxWidth: 320, minWidth: 220 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] w-full flex items-center justify-center overflow-hidden" style={{ minHeight: 120, maxHeight: 140 }}>
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-cover object-center transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          style={{ display: 'block' }}
        />
      </div>
      <div className="p-2">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-base">{title}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs">{stars}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
          >
            <ExternalLink size={12} />
            Demo
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
          >
            <Github size={12} />
            Code
          </a>
        </div>
      </div>
    </div>
  );
};