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
      className="relative group rounded-xl overflow-hidden border border-secondary bg-secondary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 
            ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="text-sm">{stars}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
          >
            <ExternalLink size={14} />
            Demo
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
          >
            <Github size={14} />
            Code
          </a>
        </div>
      </div>
    </div>
  );
};