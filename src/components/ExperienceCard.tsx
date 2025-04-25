import React from 'react';
import { Briefcase } from 'lucide-react';

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  period,
  description,
}) => {
  return (
    <div className="p-6 rounded-lg border border-secondary bg-secondary/10 hover:bg-secondary/20 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-primary text-primary-foreground">
          <Briefcase size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground">{company}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{period}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
};