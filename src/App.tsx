import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Moon, Sun, User, Book, Award, Terminal, Briefcase, Code, GraduationCap, Wand2, Sparkles } from 'lucide-react';
import { FunFacts } from './components/FunFact';
import { ExperienceCard } from './components/ExperienceCard';
import { ProjectCard } from './components/ProjectCard';
import { MagicWand } from './components/MagicWand';
import { HouseSelector } from './components/HouseSelector';
import { AnimeAvatar } from './components/AnimeAvatar';
import ammarPic from '../ammar pic.jpg';


// Interactive background effect
const useInteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let mouse = { x: width / 2, y: height / 2 };
    let particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 2 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`
    }));
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
      }
    }
    function update() {
      for (let p of particles) {
        p.x += p.dx + (mouse.x - p.x) * 0.0005;
        p.y += p.dy + (mouse.y - p.y) * 0.0005;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
    }
    function animate() {
      update();
      draw();
      requestAnimationFrame(animate);
    }
    animate();
    function handleMouse(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return canvasRef;
};

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [spell, setSpell] = useState(false);
  const [spellPos, setSpellPos] = useState({ x: 0, y: 0 });
  const canvasRef = useInteractiveBackground();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spell casting effect
  useEffect(() => {
    if (!spell) return;
    const timeout = setTimeout(() => setSpell(false), 900);
    return () => clearTimeout(timeout);
  }, [spell]);

  const handleSpellCast = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX;
    const y = e.clientY;
    setSpellPos({ x, y });
    setSpell(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Interactive BG Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }} />
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border z-50 shadow-lg">
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

      <main className="pt-20 pb-12 relative z-10">
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="relative">
              <AnimeAvatar
                imageUrl={ammarPic}
                name="AMMAR MAHMOUD EID"
              />
              {/* Sparkles around avatar */}
              <Sparkles className="absolute -top-4 -left-4 text-yellow-400 animate-float" size={28} />
              <Sparkles className="absolute -top-4 -right-4 text-blue-400 animate-float" size={24} />
              <Sparkles className="absolute -bottom-4 -left-4 text-pink-400 animate-float" size={20} />
              <Sparkles className="absolute -bottom-4 -right-4 text-green-400 animate-float" size={24} />
            </div>
            <div className="animate-slideIn flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
                AMMAR MAHMOUD EID
                <Wand2 className="text-primary animate-float" size={32} />
              </h1>
              <p className="text-xl text-muted-foreground flex items-center gap-2">
                Software Engineering Student & Developer
                <Moon className="text-indigo-400 animate-float" size={20} />
                <Sun className="text-yellow-400 animate-float" size={20} />
              </p>
            </div>
            <div className="my-2">
              <HouseSelector />
            </div>
            <div className="my-2">
              <FunFacts />
            </div>
            <div className="flex gap-4 mt-2">
              <a href="https://github.com/Ammar-M-Eid" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors shadow-lg animate-float">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/ammar-m-eid/" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors shadow-lg animate-float">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.upwork.com/freelancers/~01fda896c89fa8c04d" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors shadow-lg animate-float">
                <Book className="h-5 w-5" />
              </a>
              <a href="mailto:ammarma.eid@gmail.com"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors shadow-lg animate-float">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            {/* Spell casting button */}
            <button
              className="mt-6 px-6 py-3 bg-gradient-to-r from-primary to-indigo-500 text-white rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform animate-float border-2 border-primary/60"
              onClick={handleSpellCast}
              title="Cast a spell!"
            >
              <Wand2 className="animate-spin-slow" size={24} />
              Cast a Spell
            </button>
          </div>
          {/* Spell effect */}
          {spell && (
            <div
              style={{
                position: 'fixed',
                left: spellPos.x - 40,
                top: spellPos.y - 40,
                pointerEvents: 'none',
                zIndex: 9999,
              }}
              className="animate-fadeIn"
            >
              <Sparkles className="text-yellow-300 drop-shadow-lg animate-spin" size={80} />
            </div>
          )}
        </section>

        {/* Call to Action Section */}
        <section className="max-w-3xl mx-auto px-4 py-10 text-center">
          <div className="bg-primary/10 border border-primary rounded-lg p-8 flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold text-primary mb-2">Ready to build quality software together?</h2>
            <p className="text-lg text-muted-foreground mb-4">Let’s connect for collaboration, software testing, or Quantum Computing research! Reach out for projects, internships, or student leadership opportunities at QAIU.</p>
            <a href="mailto:ammarma.eid@gmail.com" className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition">Contact Me</a>
          </div>
        </section>

        <section id="about" className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-secondary/10 rounded-lg p-6 border border-secondary">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              Profile Summary
            </h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold">Ammar Mahmoud</span>
                <span className="text-muted-foreground">📍 Damietta, Egypt</span>
                <span className="text-muted-foreground">✉️ <a href="mailto:ammarma.eid@gmail.com" className="underline">ammarma.eid@gmail.com</a></span>
                <span className="text-muted-foreground">📱 +20 1062065198</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                <a href="https://github.com/Ammar-Ma-Eid" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"><Github className="h-5 w-5" /></a>
                <a href="https://www.linkedin.com/in/ammar-m-eid/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"><Linkedin className="h-5 w-5" /></a>
                <a href="https://www.upwork.com/freelancers/~01fda896c89fa8c04d" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"><Book className="h-5 w-5" /></a>
              </div>
            </div>
            <p className="text-muted-foreground">
              Software Engineering student with strong foundations in software quality, testing, and development. Experienced in manual and automated testing concepts, problem-solving, and working in agile environments. Passionate about delivering reliable software through structured test design, debugging, and error handling.
            </p>
          </div>
        </section>

        <section id="skills" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2">
            <Code className="h-8 w-8 text-primary" />
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-secondary/10 rounded-lg p-6 border border-secondary">
              <h3 className="font-semibold mb-2">Testing & QA Skills</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Test Design Techniques (Boundary Value Analysis, Equivalence Partitioning, Decision Tables, State Transition Testing)</li>
                <li>SDLC & STLC</li>
                <li>Functional & Non-functional Testing</li>
                <li>Regression, Unit, and Integration Testing</li>
                <li>Debugging & Error Handling (Java, Python)</li>
                <li>UI/UX Validation and Usability Testing</li>
                <li>Test Case Writing & Execution</li>
              </ul>
            </div>
            <div className="bg-secondary/10 rounded-lg p-6 border border-secondary">
              <h3 className="font-semibold mb-2">Technical Tools & Languages</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Languages: Python, Java, C++, R, JavaScript, HTML, CSS</li>
                <li>Testing & Dev Tools: GitHub, Trello, Notion, Odoo ERP, JavaFX, Pygame</li>
                <li>Other Tools: Microsoft Excel (MOS certified), WordPress, React.js</li>
              </ul>
            </div>
          </div>
          <div className="bg-secondary/10 rounded-lg p-6 border border-secondary mb-8">
            <h3 className="font-semibold mb-2">Soft Skills</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Problem Solving & Critical Thinking</li>
              <li>Team Collaboration & Leadership</li>
              <li>Fast Learner & Adaptability</li>
            </ul>
          </div>
        </section>

        <section id="education" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            Education
          </h2>
          <div className="bg-secondary/10 rounded-lg p-6 border border-secondary">
            <h3 className="text-xl font-bold mb-2">B.Sc. in Computer Science and Engineering (Software Engineering Major)</h3>
            <p className="text-primary mb-1">Alamein International University (AIU), Egypt</p>
            <p className="text-muted-foreground mb-2">Sep 2023 – Jul 2027 | Current CGPA: 3.8/4.0</p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Relevant Coursework:</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Mathematics 1&2",
                  "Linear Algebra",
                  "Probability & Statistics",
                  "Structured Programming",
                  "Object-Oriented Programming",
                  "Discrete Mathematics",
                  "Data Structures",
                  "Logic Design",
                  "Artificial Intelligence",
                  "Computer Architecture & Organization",
                  "Web Programming",
                  "Database Systems",
                  "Software Engineering",
                  "Field Training in Computer Science"
                ].map((course) => (
                  <span key={course} className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {course}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Additional Programs:</h4>
                <div className="flex flex-wrap gap-2">
                  {["USAID Scholars Program", "AUC School of Continuing Education (SCE)", "AUC Center for Entrepreneurship and Innovation (CEI)", "Aspire Institute Entrepreneurship Program"].map((prog) => (
                    <span key={prog} className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full border border-secondary/40">
                      {prog}
                    </span>
                  ))}
                </div>
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
              title="Java Programming Intern"
              company="CodeAlpha (Remote)"
              period="Feb 2025 – Mar 2025"
              description="Built Java applications with a focus on error handling and OOP principles. Implemented debugging strategies and exception testing in multiple projects."
            />
            <ExperienceCard
              title="Software Development Intern"
              company="VTS Company (Damietta)"
              period="Aug 2023 – Sep 2023"
              description="Developed and tested Odoo ERP modules in Python for 50+ users. Conducted functionality testing and validation, improving system efficiency by 20%."
            />
          </div>
        </section>

        <section id="projects" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Testing & Development Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="Students Grades Tracker"
              description="Designed and tested a Java application for grade management with input validation and calculation checks."
              tags={["Java", "OOP", "Testing"]}
              imageUrl="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop"
              demoUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              githubUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              stars={0}
            />
            <ProjectCard
              title="Hospital Management System"
              description="Implemented and tested record management features ensuring correct data handling."
              tags={["Java", "Data Structures", "Testing"]}
              imageUrl="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=450&fit=crop"
              demoUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              githubUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              stars={0}
            />
            <ProjectCard
              title="Transportation Application"
              description="Applied OOP and error-handling techniques; performed functional and integration testing."
              tags={["Java", "UML", "Testing"]}
              imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=450&fit=crop"
              demoUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              githubUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              stars={0}
            />
            <ProjectCard
              title="Stock Trading Platform Simulation"
              description="Built trading operations with unit testing for portfolio calculations."
              tags={["JavaFX", "Java", "Unit Testing"]}
              imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop"
              demoUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              githubUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              stars={0}
            />
            <ProjectCard
              title="Treasure Hunt AI Agent"
              description="Tested pathfinding algorithm accuracy using edge case scenarios."
              tags={["Pygame", "A*", "Testing"]}
              imageUrl="https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&h=450&fit=crop"
              demoUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              githubUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              stars={0}
            />
            <ProjectCard
              title="Online Store"
              description="Conducted UI/UX testing and SEO validation."
              tags={["WordPress", "HTML", "CSS", "Testing"]}
              imageUrl="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=450&fit=crop"
              demoUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              githubUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              stars={0}
            />
            <ProjectCard
              title="Hotel Reservation System"
              description="Designed booking workflows and tested for input validation and data consistency."
              tags={["Java", "Testing"]}
              imageUrl="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop"
              demoUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              githubUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              stars={0}
            />
          </div>
        </section>
        {/* Certifications Section */}
        <section id="certifications" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2">
            <Award className="h-8 w-8 text-primary" />
            Certifications
          </h2>
          <div className="bg-secondary/10 rounded-lg p-6 border border-secondary flex flex-wrap gap-4 justify-center">
            {["Object-Oriented Programming (OOP)", "Data Structures", "Java Programming", "Python Programming", "Front-End Web Development", "Microsoft Excel (MOS Certification)", "Blockchain & Smart Contracts (extra knowledge)"]
              .map((cert) => (
                <span key={cert} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">{cert}</span>
              ))}
          </div>
        </section>

        {/* Extracurricular & Volunteering Section */}
        <section id="extracurricular" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2">
            <Book className="h-8 w-8 text-primary" />
            Extracurricular & Volunteering (QA-Relevant)
          </h2>
          <div className="bg-secondary/10 rounded-lg p-6 border border-secondary space-y-4">
            <div>
              <span className="font-semibold">Co-Founder, ICPC Community AIU:</span> Organized programming & problem-solving workshops for 300+ participants, focusing on debugging and testing techniques.
            </div>
            <div>
              <span className="font-semibold">QAIU Founder & President:</span> Led student research initiatives in computing and software development.
            </div>
            <div>
              <span className="font-semibold">Microsoft Excel Trainer:</span> Taught 20+ students, validating their skills through hands-on testing tasks.
            </div>
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