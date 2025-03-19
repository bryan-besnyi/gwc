"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import TacoRain from './TacoRain';

interface Slide {
  title: string;
  content: React.ReactNode;
}

const Card = ({ 
  children, 
  className = "", 
  bgColor = "bg-white", 
  hoverEffect = false 
}: { 
  children: React.ReactNode; 
  className?: string; 
  bgColor?: string;
  hoverEffect?: boolean;
}) => {
  return (
    <div className={`p-6 rounded-lg ${bgColor} ${hoverEffect ? 'transition-all hover:shadow-md' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTacoRain, setShowTacoRain] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Mark as loaded after component mounts to prevent size flashing
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Handle taco rain animation
  const triggerTacoRain = () => {
    setShowTacoRain(true);
    setTimeout(() => setShowTacoRain(false), 5000);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space" || e.key === "n") {
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "p") {
        prevSlide();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);
  
  const slides: Slide[] = [
    // Slide 1
    {
      title: "Full Stack Development Workshop",
      content: (
        <div className={`space-y-10 text-center ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-7xl font-bold mb-8" style={{ 
            visibility: isLoaded ? 'visible' : 'hidden',
            animation: isLoaded ? 'bounce 1s infinite 0.5s' : 'none'
          }}>
            👋 Welcome!
          </h1>
          <div className="mt-6 relative" style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-32 h-32 mr-2">
                <Image 
                  src="/chipotle.svg" 
                  alt="Chipotle Logo" 
                  width={128}
                  height={128}
                  className="object-contain"
                  priority
                />
              </div>
              <div 
                className="mt-8 bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-lg text-2xl md:text-3xl font-medium shadow-lg transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer"
                onClick={triggerTacoRain}
              >
                Chipotle! 🌮
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 2
    {
      title: "Relatable Meme",
      content: (
        <Card className="max-w-4xl mx-auto w-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-md">
          <div className="text-center space-y-6">
            
            <div className="flex justify-center">
              <div className="relative w-full max-w-2xl rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="/full-stack-meme.webp" 
                  alt="Full Stack Developer Meme" 
                  width={800}
                  height={600}
                  loading="lazy"
                  quality={80}
                />
              </div>
            </div>
          </div>
        </Card>
      )
    },
    // Slide 3
    {
      title: "Introductions",
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="text-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">Introduce yourself</p>
          <p className="text-xl">Quick round: Who&apos;s new to front-end coding?</p>
          <Card className="mt-10 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
            <p className="text-xl font-medium">Goal: Understand what &ldquo;Full Stack Development&rdquo; is by creating a small web app together.</p>
          </Card>
        </div>
      )
    },
    // Slide 4
    {
      title: "🧐 What is Full Stack Development?",
      content: (
        <div className="space-y-8 max-w-4xl mx-auto">
          <Card className="flex items-center bg-blue-50" hoverEffect>
            <div className="text-4xl mr-6">🖥️</div>
            <p className="text-xl"><span className="font-bold text-blue-600">Frontend:</span> What the user sees (UI, buttons, forms).</p>
          </Card>
          
          <Card className="flex items-center bg-green-50" hoverEffect>
            <div className="text-4xl mr-6">⚙️</div>
            <p className="text-xl"><span className="font-bold text-green-600">Backend:</span> What the user doesn&apos;t see (server logic, databases).</p>
          </Card>
          
          <Card className="mt-8 bg-amber-50 border border-amber-200">
            <p className="font-medium text-amber-700 text-xl mb-4">Easy Analogy:</p>
            <div className="flex justify-around mt-3">
              <div className="text-center">
                <p className="text-4xl mb-3">🍽️</p>
                <p className="text-xl">Frontend = Waitstaff at a restaurant.</p>
              </div>
              <div className="text-center">
                <p className="text-4xl mb-3">👨‍🍳</p>
                <p className="text-xl">Backend = Kitchen preparing food.</p>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    // Slide 5
    {
      title: "Full Stack Development Landscape",
      content: (
        <Card className="max-w-5xl mx-auto w-full bg-white shadow-lg">
          <div className="space-y-6">
            <p className="text-2xl font-medium text-center text-indigo-700">The Full Stack Ecosystem</p>
            
            <div className="flex justify-center mt-4">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="/its-tech.png" 
                  alt="Full Stack Development Landscape" 
                  width={900}
                  height={600}
                  className="object-contain"
                  loading="lazy"
                  quality={75}
                />
              </div>
            </div>
            
            <p className="text-lg text-gray-600 mt-2 text-center">
              Full stack development encompasses many technologies and specialties
            </p>
          </div>
        </Card>
      )
    },
    // Slide 6
    {
      title: "⚙️ Tools for Today",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-blue-50 shadow-sm" hoverEffect>
            <p className="font-bold text-blue-700 text-2xl mb-2">Next.js (React Framework)</p>
            <p className="text-xl">Simplifies building full-stack apps.</p>
          </Card>
          
          <Card className="bg-yellow-50 shadow-sm" hoverEffect>
            <p className="font-bold text-yellow-700 text-2xl mb-2">JavaScript</p>
            <p className="text-xl">Language we&apos;ll use today.</p>
          </Card>
          
          <Card className="col-span-1 md:col-span-2 bg-amber-50 shadow-sm">
            <p className="text-amber-700 text-xl">⚠️ Python fans: Python can also be used for backend (Flask, Django).</p>
          </Card>
        </div>
      )
    },
    // Slide 7
    {
      title: '🚀 Project: "Say Hello" Web App',
      content: (
        <div className="space-y-8 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-indigo-100 to-blue-100">
            <p className="font-medium text-indigo-700 text-2xl mb-3">Frontend:</p>
            <p className="mt-2 flex items-center text-xl">
              <span className="text-3xl mr-3">📝</span>
              Form to submit your name.
            </p>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-100 to-emerald-100">
            <p className="font-medium text-green-700 text-2xl mb-3">Backend:</p>
            <p className="mt-2 flex items-center text-xl">
              <span className="text-3xl mr-3">💬</span>
              Returns a personalized greeting (&quot;Hello, Kelsey!&quot;).
            </p>
          </Card>
          
          <div className="text-center mt-8">
            <div className="inline-block animate-bounce bg-purple-100 text-purple-800 text-xl px-6 py-2 rounded-full font-medium">
              Let&apos;s build it! 🛠️
            </div>
          </div>
        </div>
      )
    },
    // Slide 8
    {
      title: "💻 Let's look at the code!",
      content: (
        <div className="max-w-4xl mx-auto">
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-blue-100 text-blue-600 font-bold text-xl">1</span>
              <div>
                <p className="font-medium text-xl">Frontend: Create a simple page with a form.</p>
                <p className="text-gray-600">HTML + CSS + JS</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-green-100 text-green-600 font-bold text-xl">2</span>
              <div>
                <p className="font-medium text-xl">Backend: Write an API that greets users.</p>
                <p className="text-gray-600">Next.js & Python Flask API Routes</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-purple-100 text-purple-600 font-bold text-xl">3</span>
              <div>
                <p className="font-medium text-xl">Connect both: Frontend calls Backend.</p>
                <p className="text-gray-600">Using fetch or axios</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-amber-100 text-amber-600 font-bold text-xl">✓</span>
              <p className="font-medium text-xl">Quick Demo: Show final working project.</p>
            </li>
          </ul>
        </div>
      )
    },  
    // Slide 9
    {
      title: "☁️ Deploying the Project",
      content: (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="flex justify-center">
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md max-w-2xl w-full rounded-xl">
              <p className="font-bold text-2xl mb-4 text-center">Deploy easily to the web</p>
              <div className="mt-4 flex justify-center space-x-16">
                <div className="text-center">
                  <p className="text-4xl mb-2">▲</p>
                  <p className="text-xl">Vercel</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl mb-2">🌐</p>
                  <p className="text-xl">Netlify</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl mb-2">🚀</p>
                  <p className="text-xl">AWS</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl mb-2">🌐</p>
                  <p className="text-xl">CDN</p>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="bg-white border border-gray-200 shadow-sm max-w-2xl mx-auto">
            <p className="text-xl mb-2">Demonstration (if time): Click to deploy.</p>
          </Card>
        </div>
      )
    },
    // Slide 10
    {
      title: "📚 What's Next?",
      content: (
        <div className="space-y-8 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <p className="font-medium text-indigo-700 text-2xl mb-4">Continue exploring coding:</p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center text-xl"><span className="text-2xl mr-4">📘</span><a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">Next.js documentation</a></li>
              <li className="flex items-center text-xl"><span className="text-2xl mr-4">🏆</span><a href="https://freecodecamp.org" target="_blank" rel="noopener noreferrer">FreeCodeCamp.org</a></li>
            </ul>
          </Card>
          
          
        </div>
      )
    },
    // Slide 11
    {
      title: "❓ Q&A",
      content: (
        <div className="space-y-10 text-center max-w-4xl mx-auto">
          <div className="animate-bounce inline-block bg-indigo-100 text-indigo-800 px-10 py-6 rounded-full shadow-md text-3xl font-medium">
            Any questions?
          </div>
          
          <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 max-w-2xl mx-auto mt-10">
            <p className="italic text-amber-700 text-xl">Remember: No question is too simple!</p>
          </Card>
        </div>
      )
    },
    // Slide 12
    {
      title: "🎉 Thanks for joining!",
      content: (
        <div className="space-y-10 text-center">
          <p className="text-5xl">Keep coding and exploring.</p>
          <div className="mt-10 animate-pulse">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-6 px-10 rounded-lg shadow-lg inline-block">
              <p className="text-3xl">We&apos;ve just built a Full Stack App! 🚀</p>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsAnimating(false);
      }, 150);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsAnimating(false);
      }, 150);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-0">
      {/* Ensure TacoRain has proper access to the SVG */}
      <TacoRain 
        isActive={showTacoRain}
        logoSize={60}
        itemTypes={[
          { type: 'logo', weight: 2 },
          { type: 'taco', weight: 1, emoji: '🌮' },
          { type: 'burrito', weight: 1, emoji: '🌯' },
          { type: 'tamale', weight: 1, emoji: '🫔' },
          { type: 'pepper', weight: 1, emoji: '🌶️' },
          { type: 'avocado', weight: 1, emoji: '🥑' },
          { type: 'corn', weight: 1, emoji: '🌽' }
        ]}
      />
      
      <div 
        className={`w-full h-screen max-h-screen flex flex-col ${isAnimating ? 'opacity-90' : 'opacity-100'}`}
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transitionProperty: 'opacity',
          transitionDuration: '0.5s',
          transitionTimingFunction: 'ease-in-out'
        }}
      >
        <div className="flex-1 flex flex-col p-6 md:p-10 overflow-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 pb-4 text-center">
            {slides[currentSlide].title}
          </h1>
          
          <div className="flex-1 flex items-center justify-center py-4">
            <div className="w-full max-w-5xl">
              {slides[currentSlide].content}
            </div>
          </div>
          
          <div className="mt-auto pt-4 flex justify-between items-center">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0 || isAnimating}
              className={`px-6 py-2 rounded-full flex items-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                currentSlide === 0 
                  ? 'opacity-0 pointer-events-none' 
                  : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
              }`}
              aria-label="Previous slide"
            >
              <span className="mr-1">←</span> Previous
            </button>
            
            <div className="text-sm bg-gray-800 text-white px-4 py-2 rounded-full">
              {currentSlide + 1} / {slides.length}
            </div>
            
            <button 
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1 || isAnimating}
              className={`px-6 py-2 rounded-full flex items-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                currentSlide === slides.length - 1 
                  ? 'opacity-0 pointer-events-none' 
                  : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
              }`}
              aria-label="Next slide"
            >
              Next <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center text-xs text-gray-500 bg-white/80 px-3 py-1 rounded-full">
        Use arrow keys to navigate
      </div>
      
      <style jsx global>{`
        html, body {
          overflow: hidden;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        
        /* Update the slide content styles to be more prominent */
        .space-y-4, .space-y-6, .space-y-8, .space-y-10 {
          margin-top: 0;
          margin-bottom: 0;
        }
        
        /* Make text larger in general */
        p, li {
          font-size: 1.25rem;
        }
        
        /* Prevent unnecessary repaints */
        * {
          backface-visibility: hidden;
        }
        
        /* Optimize animations for performance */
        .animate-taco-fall {
          will-change: transform, opacity;
        }
        
        .animate-bounce {
          will-change: transform;
        }
        
        /* Taco falling animation - simplified */
        @keyframes taco-fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        .animate-taco-fall {
          animation-name: taco-fall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        
        /* Simplified bounce animation */
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .7;
          }
        }
      `}</style>
    </div>
  );
} 