import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Moon, Sun, User, Book, Award, Terminal, Briefcase, Code, GraduationCap, Wand2, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { FunFacts } from './components/FunFact';
import { ExperienceCard } from './components/ExperienceCard';
import { ProjectCard } from './components/ProjectCard';
import { MagicWand } from './components/MagicWand';
import { HouseSelector } from './components/HouseSelector';
import { AnimeAvatar } from './components/AnimeAvatar';
import { AtomSVG, VectorSVG } from './components/AtomsAndVectors';
import ammarPic from '/ammar.jpg';


// Interactive background effect
const useInteractiveBackground = (houseColor?: string, resetParticlesFlag?: boolean) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<any[]>([]);
  const resetFlagRef = useRef(resetParticlesFlag);
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
    // Helper to get house color
    function getHouseColor() {
      if (!houseColor) return `hsl(${Math.random() * 360}, 80%, 60%)`;
      return houseColor;
    }
    // If reset flag, randomize all
    if (resetParticlesFlag || !particlesRef.current.length) {
      // Make particles move slower: reduce dx/dy range
      // Spread particles more: allow them to start outside the visible area and move in a larger range
      particlesRef.current = Array.from({ length: 40 }, () => ({
        x: (Math.random() - 0.2) * width * 1.4, // can start a bit offscreen
        y: (Math.random() - 0.2) * height * 1.4, // can start a bit offscreen
        r: 2 + Math.random() * 3,
        dx: (Math.random() - 0.5) * 0.25, // slower movement
        dy: (Math.random() - 0.5) * 0.25, // slower movement
        color: `hsl(${Math.random() * 360}, 80%, 60%)`
      }));
      resetFlagRef.current = false;
    } else if (houseColor) {
      // Set most particles to house color
      particlesRef.current.forEach((p, i) => {
        if (i < 30) p.color = houseColor;
      });
    }
    let particles = particlesRef.current;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    function update() {
      // Move particles randomly and avoid cursor smoothly
      for (let p of particles) {
        // Random walk: add a small random change to direction
        p.dx += (Math.random() - 0.5) * 0.003; // even less random walk
        p.dy += (Math.random() - 0.5) * 0.003;
        // Clamp speed
        const maxSpeed = 0.18;
        const speed = Math.hypot(p.dx, p.dy);
        if (speed > maxSpeed) {
          p.dx *= maxSpeed / speed;
          p.dy *= maxSpeed / speed;
        }
        // Smoothly avoid cursor if close
        const distToCursor = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (distToCursor < 120) {
          // Compute repulsion vector
          const avoidStrength = (120 - distToCursor) / 120 * 0.18;
          const ax = (p.x - mouse.x) / distToCursor * avoidStrength;
          const ay = (p.y - mouse.y) / distToCursor * avoidStrength;
          p.dx += ax;
          p.dy += ay;
        }
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }

      // Check for clustering: if >70% of particles are within a small area, add more from outside the screen
      const clusterRadius = Math.min(width, height) * 0.18;
      let cx = 0, cy = 0;
      for (let p of particles) { cx += p.x; cy += p.y; }
      cx /= particles.length; cy /= particles.length;
      let clustered = particles.filter(p => Math.hypot(p.x - cx, p.y - cy) < clusterRadius).length;
      if (clustered > particles.length * 0.7 && particles.length < 80) {
        // Add 8 new particles from outside the screen, aimed toward the cluster center
        for (let i = 0; i < 8; i++) {
          const edge = Math.floor(Math.random() * 4);
          let x, y;
          if (edge === 0) { // left
            x = -width * 0.2;
            y = Math.random() * height * 1.4 - height * 0.2;
          } else if (edge === 1) { // right
            x = width * 1.2;
            y = Math.random() * height * 1.4 - height * 0.2;
          } else if (edge === 2) { // top
            x = Math.random() * width * 1.4 - width * 0.2;
            y = -height * 0.2;
          } else { // bottom
            x = Math.random() * width * 1.4 - width * 0.2;
            y = height * 1.2;
          }
          // Velocity aimed toward cluster center, with some randomness
          const angle = Math.atan2(cy - y, cx - x) + (Math.random() - 0.5) * 0.5;
          const speed = 1.2 + Math.random() * 0.5;
          particles.push({
            x,
            y,
            r: 2 + Math.random() * 3,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            color: houseColor || `hsl(${Math.random() * 360}, 80%, 60%)`
          });
        }
      }
      // If too many particles, make extras vanish into the cluster center
      if (particles.length > 50) {
        // Animate extras toward center and remove if close
        let vanished = 0;
        for (let i = 0; i < particles.length - 40; i++) {
          const p = particles[i];
          const dx = (cx - p.x) * 0.08;
          const dy = (cy - p.y) * 0.08;
          p.x += dx;
          p.y += dy;
          // If close enough to center, remove
          if (Math.hypot(p.x - cx, p.y - cy) < 10) {
            particles.splice(i, 1);
            i--;
            vanished++;
          }
        }
        // If still too many, hard trim
        if (particles.length > 60) particles.splice(0, particles.length - 40);
        // Always spawn new ones from outside for each vanished
        for (let i = 0; i < vanished; i++) {
          const edge = Math.floor(Math.random() * 4);
          let x, y;
          if (edge === 0) { // left
            x = -width * 0.2;
            y = Math.random() * height * 1.4 - height * 0.2;
          } else if (edge === 1) { // right
            x = width * 1.2;
            y = Math.random() * height * 1.4 - height * 0.2;
          } else if (edge === 2) { // top
            x = Math.random() * width * 1.4 - width * 0.2;
            y = -height * 0.2;
          } else { // bottom
            x = Math.random() * width * 1.4 - width * 0.2;
            y = height * 1.2;
          }
          // Velocity aimed toward cluster center, with some randomness
          const angle = Math.atan2(cy - y, cx - x) + (Math.random() - 0.5) * 0.5;
          const speed = 1.2 + Math.random() * 0.5;
          particles.push({
            x,
            y,
            r: 2 + Math.random() * 3,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            color: houseColor || `hsl(${Math.random() * 360}, 80%, 60%)`
          });
        }
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
  }, [houseColor, resetParticlesFlag]);
  return canvasRef;
};


type HouseName = 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff';
interface SelectedHouse { name: HouseName }
function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [spell, setSpell] = useState(false);
  const [spellPos, setSpellPos] = useState({ x: 0, y: 0 });
  const [spellPhrase, setSpellPhrase] = useState<string | null>(null);
  const [bgSpell, setBgSpell] = useState(false);
  const [showOwl, setShowOwl] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [scrollMessage, setScrollMessage] = useState<string | null>(null);
  // House selection state for global theme
  const [selectedHouse, setSelectedHouse] = useState<SelectedHouse | null>(null);
  // Remove house bg after 0.5s
  useEffect(() => {
    if (selectedHouse) {
      const timeout = setTimeout(() => setSelectedHouse(null), 500);
      return () => clearTimeout(timeout);
    }
  }, [selectedHouse]);

  // Creative: random scroll message generator
  const scrollMessages = [
    "You are more magical than you think! ✨",
    "The best bugs are the ones you never meet.",
    "Quantum leap your dreams today! 🪄",
    "May your code always compile on the first try!",
    "You found the secret scroll! 🕵️‍♂️",
    "Testing is just wizardry in disguise.",
    "Owl says: Take a break, you earned it! 🦉",
    "404: Boring not found.",
    "The scroll of destiny has chosen you!",
    "Keep calm and debug on!",
    "You are the chosen one... for this message!",
    "If you can read this, you are awesome!",
    "May the source be with you.",
    "This scroll is gluten free.",
    "Achievement unlocked: Clicked the flying scroll! 🏆",
  ];
  function randomScrollMessage() {
    return scrollMessages[Math.floor(Math.random() * scrollMessages.length)];
  }
  // House color for particles
  const houseParticleColors: Record<HouseName, string> = {
    Gryffindor: '#d7263d',
    Slytherin: '#1aab5c',
    Ravenclaw: '#1e40af',
    Hufflepuff: '#facc15',
  };
  const [resetParticlesFlag, setResetParticlesFlag] = useState(false);
  const canvasRef = useInteractiveBackground(selectedHouse ? houseParticleColors[selectedHouse.name] : undefined, resetParticlesFlag);

  const spellPhrases = [
    'Expecto Patronum!',
    'Wingardium Leviosa!',
    'Codeus Maximus!',
    'Abracadabra Debug!',
    'Quantumus Testum!',
    '✨ Magic Unleashed! ✨',
    'Let there be code!',
    '🪄 Testing Spell Cast!',
    'Refactorus Totalus!',
    'Bugus Vanishio!',
    'Deployium Successum!',
    'Infinite Loopus!',
    'Stack Overflowium!',
    'Quantum Leap!',
    'Compile & Conquer!',
    'May the tests be with you!',
    '🧙‍♂️ Wizard of Code!',
    '✨ Spell of Clean Code!',
    '🦄 Unicorn Debug!',
    '✨✨✨',
    'Magic happens here!',
    '✨ QA Power!',
    '🪄 Testum Perfectum!',
    '✨✨✨',
    '✨✨✨',
  ];

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
    setBgSpell(true);
    setResetParticlesFlag(true); // reset particles to random on spell
    const timeout = setTimeout(() => {
      setSpell(false);
      setSpellPhrase(null);
      setBgSpell(false);
      setResetParticlesFlag(false); // allow house color again
    }, 1200);
    return () => clearTimeout(timeout);
  }, [spell]);

  const handleSpellCast = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const y = e.clientY;
    setSpellPos({ x, y });
    const phrase = spellPhrases[Math.floor(Math.random() * spellPhrases.length)];
    setSpellPhrase(phrase);
    setSpell(true);
  };

  // House color mapping for background gradients
  const houseGradients: Record<HouseName, string> = {
    Gryffindor: 'from-red-700 via-yellow-400 to-yellow-100',
    Slytherin: 'from-green-700 via-gray-300 to-green-100',
    Ravenclaw: 'from-blue-700 via-blue-200 to-blue-100',
    Hufflepuff: 'from-yellow-400 via-yellow-200 to-black',
  };
  const houseGradient = selectedHouse ? houseGradients[selectedHouse.name] : null;
  return (
    <div className={`min-h-screen text-foreground relative overflow-hidden transition-all duration-700 ${bgSpell ? 'bg-gradient-to-br from-indigo-900 via-fuchsia-700 to-yellow-400 fade-bg' : houseGradient ? `bg-gradient-to-br ${houseGradient} fade-bg` : 'bg-background'}`}>
      {/* Interactive BG Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }} />
      {/* Extra floating atoms and vectors in the background */}
      <AtomSVG className="fixed left-[10vw] top-[20vh] w-8 h-8 opacity-60 animate-float-slow pointer-events-none z-0" />
      <VectorSVG className="fixed right-[12vw] top-[30vh] w-8 h-8 opacity-60 animate-float pointer-events-none z-0" />
      <AtomSVG className="fixed left-[20vw] bottom-[18vh] w-6 h-6 opacity-50 animate-float pointer-events-none z-0" />
      <VectorSVG className="fixed right-[18vw] bottom-[12vh] w-6 h-6 opacity-50 animate-float-slow pointer-events-none z-0" />
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
              {/* Atoms and vectors around avatar */}
              {/* <AtomSVG className="absolute -top-6 -left-6 w-7 h-7 animate-float" /> */}
              <VectorSVG className="absolute -top-6 -right-6 w-7 h-7 animate-float-slow" />
              <AtomSVG className="absolute -bottom-6 -left-6 w-5 h-5 animate-float" />
              {/* Removed one VectorSVG for a cleaner look */}
              {/* Sparkles for extra effect */}
              <Sparkles className="absolute -top-4 -left-4 text-yellow-400 animate-float" size={20} />
              <Sparkles className="absolute -top-4 -right-4 text-blue-400 animate-float" size={16} />
              <Sparkles className="absolute -bottom-4 -left-4 text-pink-400 animate-float" size={14} />
              <Sparkles className="absolute -bottom-4 -right-4 text-green-400 animate-float" size={16} />
            </div>
            <div className="animate-slideIn flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
                AMMAR MAHMOUD EID
                <Wand2 className="text-primary animate-float" size={32} />
              </h1>
              <p className="text-xl text-muted-foreground flex items-center gap-2">
                Software Engineering Student & Tester
                <Moon className="text-indigo-400 animate-float" size={20} />
                <Sun className="text-yellow-400 animate-float" size={20} />
              </p>
            </div>
            <div className="my-2">
              <HouseSelector onSelect={house => setSelectedHouse({ name: house.name as HouseName })} />
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
            {/* ...existing code... */}
          </div>
          {/* Spell effect */}
          {spell && (
            <>
              {/* Magical burst at click location */}
              <div
                style={{
                  position: 'fixed',
                  left: spellPos.x - 120,
                  top: spellPos.y - 120,
                  pointerEvents: 'none',
                  zIndex: 9999,
                }}
                className="animate-fadeIn"
              >
                <div className="relative">
                  <Sparkles className="text-yellow-300 drop-shadow-2xl animate-spin-slow" size={240} />
                  <Sparkles className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400 opacity-70 animate-pulse" size={180} />
                  <Sparkles className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-400 opacity-50 animate-float" size={120} />
                  <Sparkles className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400 opacity-40 animate-float" size={90} />
                </div>
              </div>
              {/* Centered spell phrase and extra effects */}
              <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[10000]">
                <div className="relative flex flex-col items-center">
                  <div className="animate-fadeIn scale-110">
                    <Sparkles className="text-fuchsia-400 animate-spin-slow absolute -top-24 left-1/2 -translate-x-1/2 opacity-60" size={180} />
                    <Sparkles className="text-yellow-200 animate-float absolute -bottom-24 left-1/2 -translate-x-1/2 opacity-40" size={120} />
                    <Sparkles className="text-blue-400 animate-float absolute -left-24 top-1/2 -translate-y-1/2 opacity-30" size={100} />
                    <Sparkles className="text-pink-400 animate-float absolute -right-24 top-1/2 -translate-y-1/2 opacity-30" size={100} />
                    <span className="relative z-10 text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] px-8 py-4 bg-black/30 rounded-2xl border-4 border-fuchsia-400 animate-fadeIn">
                      {spellPhrase}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Call to Action Section */}
        <section className="max-w-3xl mx-auto px-4 py-10 text-center">
          <div className="bg-primary/10 border border-primary rounded-lg p-8 flex flex-col items-center gap-4 relative overflow-visible">
            <h2 className="text-2xl font-bold text-primary mb-2">Ready to build quality software together?</h2>
            <p className="text-lg text-muted-foreground mb-4">Let’s connect for collaboration, software testing, or Quantum Computing research!<br />Or just to see what happens when you send a magic owl...</p>
            {/* Magic Owl Button */}
            <button
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-primary rounded-lg font-semibold shadow hover:scale-110 hover:bg-secondary/80 transition mb-4 text-xl"
              onClick={() => {
                setShowOwl(true);
                setTimeout(() => { setShowOwl(false); setShowScroll(false); setScrollMessage(null); setShowContactOptions(true); }, 3500);
                setTimeout(() => { setShowScroll(true); }, 1400);
              }}
              type="button"
            >
              <span role="img" aria-label="owl" style={{ fontSize: '2.5rem' }}>🦉</span> Send a Magic Owl
            </button>
            {/* Flying Owl Animation with flapping and sparkles */}
            {showOwl && (
              <div className="pointer-events-none select-none fixed left-[-180px] top-[55%] z-[9999] animate-owl-fly">
                <span style={{ fontSize: '7rem', filter: 'drop-shadow(0 4px 16px #0008)', position: 'relative', display: 'inline-block', animation: 'owl-flap 0.5s infinite alternate' }}>
                  🦉
                  <span style={{ position: 'absolute', left: '60%', top: '10%', fontSize: '2rem', opacity: 0.7, animation: 'sparkle 1.2s infinite alternate' }}>✨</span>
                </span>
                {/* Mystery Scroll drops from owl */}
                {showScroll && (
                  <div className="absolute left-[60%] top-[80%] animate-scroll-drop cursor-pointer" onClick={() => setScrollMessage(randomScrollMessage())}>
                    <span style={{ fontSize: '2.5rem' }}>📜</span>
                  </div>
                )}
              </div>
            )}
            {/* Mystery Scroll Message Popup */}
            {scrollMessage && (
              <div className="fixed left-1/2 top-[65%] -translate-x-1/2 bg-secondary/90 text-primary px-8 py-6 rounded-2xl shadow-2xl border-2 border-primary text-xl font-bold z-[99999] animate-fadeIn">
                {scrollMessage}
                <button className="ml-4 text-sm underline text-primary/70 hover:text-primary" onClick={() => setScrollMessage(null)}>close</button>
              </div>
            )}
            {/* Contact Options after owl animation */}
            {showContactOptions && !showOwl && (
              <div className="flex flex-col gap-3 items-center mt-4 animate-fadeIn">
                <a href="mailto:ammarma.eid@gmail.com" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5" /> Send Email
                </a>
                <a href="https://wa.me/201062065198" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition text-lg flex items-center gap-2">
                  <FaWhatsapp className="h-5 w-5" /> WhatsApp
                </a>
              </div>
            )}
            {/* Add keyframes for owl, scroll, sparkles, and confetti */}
            <style>{`
              .fade-bg {
                transition: background 1.2s cubic-bezier(.4,0,.2,1), background-color 1.2s cubic-bezier(.4,0,.2,1),
                  background-image 1.2s cubic-bezier(.4,0,.2,1), filter 1.2s cubic-bezier(.4,0,.2,1);
              }
              @keyframes owl-fly {
                0% { left: -180px; opacity: 0; }
                10% { opacity: 1; }
                60% { opacity: 1; }
                100% { left: 110vw; opacity: 0; }
              }
              .animate-owl-fly {
                animation: owl-fly 3.2s cubic-bezier(.7,.1,.7,1) forwards;
              }
              @keyframes owl-flap {
                0% { transform: rotate(-6deg) scaleY(1.05); }
                100% { transform: rotate(6deg) scaleY(0.95); }
              }
              @keyframes sparkle {
                0% { opacity: 0.7; transform: scale(1) rotate(0deg); }
                100% { opacity: 1; transform: scale(1.2) rotate(20deg); }
              }
              @keyframes scroll-drop {
                0% { opacity: 0; top: 0%; }
                30% { opacity: 1; }
                100% { opacity: 1; top: 120px; }
              }
              .animate-scroll-drop {
                animation: scroll-drop 1.2s cubic-bezier(.7,.1,.7,1) forwards;
              }
              @keyframes confetti-burst {
                0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
                20% { transform: scale(1.2) rotate(8deg); opacity: 1; }
                60% { transform: scale(1) rotate(-8deg); opacity: 1; }
                100% { transform: scale(0.5) rotate(10deg); opacity: 0; }
              }
              @keyframes float {
                0% { transform: translateY(0) scale(1) rotate(0deg); }
                50% { transform: translateY(-12px) scale(1.08) rotate(6deg); }
                100% { transform: translateY(0) scale(1) rotate(0deg); }
              }
              .animate-float {
                animation: float 2.8s ease-in-out infinite;
              }
              @keyframes float-slow {
                0% { transform: translateY(0) scale(1) rotate(0deg); }
                50% { transform: translateY(-18px) scale(1.12) rotate(-8deg); }
                100% { transform: translateY(0) scale(1) rotate(0deg); }
              }
              .animate-float-slow {
                animation: float-slow 4.2s ease-in-out infinite;
              }
            `}</style>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center place-items-center">
            <ProjectCard
              title="Students Grades Tracker"
              description="Designed and tested a Java application for grade management with input validation and calculation checks."
              tags={["Java", "OOP", "Testing"]}
              imageUrl="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=400&h=300&fit=crop"
              demoUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              githubUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              stars={0}
            />
            <ProjectCard
              title="Hospital Management System"
              description="Implemented and tested record management features ensuring correct data handling."
              tags={["Java", "Data Structures", "Testing"]}
              imageUrl="https://images.pexels.com/photos/3861949/pexels-photo-3861949.jpeg?auto=compress&w=400&h=300&fit=crop"
              demoUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              githubUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              stars={0}
            />
            <ProjectCard
              title="Transportation Application"
              description="Applied OOP and error-handling techniques; performed functional and integration testing."
              tags={["Java", "UML", "Testing"]}
              imageUrl="https://images.pexels.com/photos/3862149/pexels-photo-3862149.jpeg?auto=compress&w=400&h=300&fit=crop"
              demoUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              githubUrl="https://github.com/Ammar-M-Eid/Code_Alpha_Java"
              stars={0}
            />
            <ProjectCard
              title="Stock Trading Platform Simulation"
              description="Built trading operations with unit testing for portfolio calculations."
              tags={["JavaFX", "Java", "Unit Testing"]}
              imageUrl="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&w=400&h=300&fit=crop"
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
      <MagicWand onCast={handleSpellCast} phrase={spell && spellPhrase ? spellPhrase : undefined} />
    </div>
  );
}

export default App;