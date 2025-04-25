import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Moon, Sun, User, Book, Award, Terminal, Briefcase, Code, GraduationCap } from 'lucide-react';
import { ProgressRing } from './components/ProgressRing';
import { AchievementCard } from './components/AchievementCard';
import { ExperienceCard } from './components/ExperienceCard';
import { SkillBadge } from './components/SkillBadge';
import { FunFacts } from './components/FunFact';
import { ProjectCard } from './components/ProjectCard';
import { MagicWand } from './components/MagicWand';
import { HouseSelector } from './components/HouseSelector';
import { AnimeAvatar } from './components/AnimeAvatar';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Ammar's Magical Portfolio</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
            <a href="#education" className="hover:text-primary transition-colors">Education</a>
            <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          </div>
        </nav>
        <div className="h-1 bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      <main className="pt-20 pb-12">
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center gap-6">
            <AnimeAvatar
              imageUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
              name="AMMAR MAHMOUD EID"
            />
            <div className="animate-slideIn">
              <h1 className="text-4xl font-bold mb-2">AMMAR MAHMOUD EID</h1>
              <p className="text-xl text-muted-foreground">Software Engineering Student & Developer</p>
            </div>
            <HouseSelector />
            <FunFacts />
            <div className="flex gap-4">
              <a href="https://github.com/Ammar-Ma-Eid" target="_blank" rel="noopener noreferrer" 
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/ammar-ma-eid/" target="_blank" rel="noopener noreferrer" 
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:ammarma.eid@gmail.com" 
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-secondary/10 rounded-lg p-6 border border-secondary">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              About Me
            </h2>
            <p className="text-muted-foreground">
              Computer Science and Software Engineering student with a 3.8/4.0 GPA, skilled in Python, C++, Java, web, and software development. 
              Experienced in ODOO ERP, Java programming, and competitive programming. Currently serving as OC Head at AIU ICPC community and 
              vice governorate coordinator at EYE organization.
            </p>
          </div>
        </section>

        <section id="skills" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2">
            <Code className="h-8 w-8 text-primary" />
            Technical Arsenal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <ProgressRing progress={95} size={160} strokeWidth={8} label="Programming" />
            <ProgressRing progress={90} size={160} strokeWidth={8} label="Web Dev" />
            <ProgressRing progress={85} size={160} strokeWidth={8} label="Tools" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <SkillBadge name="Python" level={5} color="blue" />
            <SkillBadge name="C++" level={4} color="purple" />
            <SkillBadge name="Java" level={4} color="red" />
            <SkillBadge name="React" level={4} color="blue" />
            <SkillBadge name="JavaScript" level={4} color="yellow" />
            <SkillBadge name="HTML/CSS" level={4} color="orange" />
            <SkillBadge name="Solidity" level={3} color="gray" />
            <SkillBadge name="ODOO ERP" level={4} color="green" />
          </div>
        </section>

        <section id="education" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            Education
          </h2>
          <div className="bg-secondary/10 rounded-lg p-6 border border-secondary">
            <h3 className="text-xl font-bold mb-2">Bachelor of Science in Computer Science and Engineering</h3>
            <p className="text-primary mb-1">Alamein International University (AIU), Egypt</p>
            <p className="text-muted-foreground mb-2">Sep 2023 – Jul 2027 (Expected) | CGPA: 3.8/4.0</p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Relevant Coursework:</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Mathematics", "Linear Algebra", "Data Structures",
                  "Object-Oriented Programming", "Web Programming",
                  "Software Engineering", "Database Systems",
                  "Artificial Intelligence"
                ].map((course) => (
                  <span key={course} className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2">
            <Briefcase className="h-8 w-8 text-primary" />
            Experience
          </h2>
          <div className="space-y-6">
            <ExperienceCard
              title="Head of Organizing Committee"
              company="ICPC Community, AIU"
              period="Oct 2024 – Present"
              description="Leading a team of 15 to organize programming events, increasing participation by 30%. Coordinated workshops for 300+ participants, enhancing problem-solving skills."
            />
            <ExperienceCard
              title="Software Development Intern"
              company="VTS Company"
              period="Aug 2023 – Sep 2023"
              description="Developed ODOO ERP modules using Python, enhancing functionality for 50+ users. Collaborated with a team of 5 to create add-ons, improving system efficiency by 20%."
            />
            <ExperienceCard
              title="Java Programming Intern"
              company="CodeAlpha Company"
              period="Feb 2025 – Mar 2025"
              description="Built Java applications focusing on OOP principles and error handling. Worked on small-scale projects, including a student grade tracker and a stock trading simulation."
            />
          </div>
        </section>

        <section id="projects" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="SIGMAPAY"
              description="Personal finance management software with e-wallet integration, budget tracking, and financial reporting."
              tags={["Java", "Spring Boot", "React", "Financial API"]}
              imageUrl="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop"
              demoUrl="#"
              githubUrl="#"
              stars={0}
            />
            <ProjectCard
              title="Stock Trading Platform"
              description="Simulation platform for stock trading and portfolio management with real-time tracking and performance reports."
              tags={["Java", "JavaFX", "Data Structures"]}
              imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop"
              demoUrl="#"
              githubUrl="#"
              stars={0}
            />
            <ProjectCard
              title="Treasure Hunt AI"
              description="AI agent using A* algorithm for pathfinding in a treasure hunt game environment."
              tags={["Python", "Pygame", "A* Algorithm"]}
              imageUrl="https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&h=450&fit=crop"
              demoUrl="#"
              githubUrl="#"
              stars={0}
            />
            <ProjectCard
              title="Bader Website"
              description="Social impact project for disabled individuals, developed under Ministry of Youth and Sports supervision."
              tags={["WordPress", "HTML", "CSS", "Accessibility"]}
              imageUrl="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=450&fit=crop"
              demoUrl="#"
              githubUrl="#"
              stars={0}
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} AMMAR MAHMOUD EID. All rights reserved.
          </p>
        </div>
      </footer>

      <MagicWand />
    </div>
  );
}

export default App;