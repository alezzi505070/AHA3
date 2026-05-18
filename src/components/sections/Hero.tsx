import React, { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';

// Lazy load the particle field to reduce initial bundle size, but NOT the Canvas itself
const ParticleField = React.lazy(() => 
  import('@/components/three/ParticleField').then(module => ({ default: module.ParticleField }))
);

export const Hero = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const yContent = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <section id="hero" className="relative w-full h-[100dvh] bg-background overflow-hidden flex items-center justify-center perspective-[1000px]">
      {/* 3D Background */}
      <motion.div style={{ y: yBg, opacity }} className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Light Glow Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] mix-blend-multiply animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] mix-blend-multiply animate-float-delayed" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: yContent, opacity }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center mt-16"
      >
        <motion.div
          variants={{
            hidden: { y: 40, opacity: 0, scale: 0.95 },
            visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="inline-block mb-6 px-6 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm shadow-sm"
        >
          <span className="text-accent tracking-widest text-sm lg:text-base font-semibold">
            عضو في طلال أبو غزاله الدولي
          </span>
        </motion.div>
        
        <motion.h1
          variants={{
            hidden: { y: 40, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="text-primary font-serif text-6xl lg:text-8xl font-bold mb-8 leading-[1.2] drop-shadow-sm"
        >
          مكتب <span className="text-gradient">عبد الرؤوف حسّان</span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { y: 40, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="text-textMuted text-xl lg:text-3xl mb-12 max-w-3xl mx-auto font-light leading-relaxed"
        >
          التميز في خدمات التدقيق والاستشارات المالية منذ ١٩٩٦م
        </motion.p>

        <motion.div
          variants={{
            hidden: { y: 40, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center perspective-[1000px]"
        >
          <motion.a 
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, z: 20 }}
            whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0, z: 0 }}
            href="#services" 
            className="px-10 py-5 bg-gradient-to-r from-accent to-[#D4B572] text-white rounded-lg font-bold text-lg shadow-[0_10px_30px_rgba(184,155,88,0.25)] hover:shadow-[0_15px_40px_rgba(184,155,88,0.35)] transition-all duration-300 relative overflow-hidden group transform-style-3d"
          >
            <span className="relative z-10">اكتشف خدماتنا</span>
            <div className="absolute inset-0 bg-white/20 mix-blend-overlay -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, z: 20 }}
            whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0, z: 0 }}
            href="#contact" 
            className="px-10 py-5 bg-white border border-black/5 text-primary rounded-lg font-semibold text-lg hover:bg-black/5 hover:border-black/10 shadow-sm transition-all duration-300 transform-style-3d"
          >
            تواصل معنا
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="block w-7 h-12 border border-black/10 rounded-full relative flex justify-center bg-white/50 backdrop-blur-sm shadow-sm">
          <span className="block w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
        </span>
      </motion.div>
    </section>
  );
};
