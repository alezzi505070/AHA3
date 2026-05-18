import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BackgroundPaths } from './components/ui/background-paths';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Sectors } from './components/sections/Sectors';
import { WhyUs } from './components/sections/WhyUs';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="font-sans min-h-screen bg-background text-foreground selection:bg-accent/30 relative" dir="rtl">
      <div className="fixed inset-0 z-[9999] pointer-events-none bg-noise" />
      <Navbar />
      <main>
        <section id="hero">
          <BackgroundPaths 
            title="AHA Office" 
            slogan="شركاؤكم في النمو والتميز المهني - خبرات متراكمة منذ عام ١٩٩٦" 
          />
        </section>
        <About />
        <WhyUs />
        <Services />
        <Sectors />
      </main>
      <Footer />
    </div>
  );
}

export default App;
