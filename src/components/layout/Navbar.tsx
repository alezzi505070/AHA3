import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/data/content';
import { Menu, X, MessageCircle } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-surface/80 backdrop-blur-2xl border-b border-black/5 py-3 shadow-md' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group perspective-[1000px]">
            <span className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 group-hover:from-accent group-hover:to-accent/80 transition-all duration-300">
              AHA Office
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10">
            {NAV_LINKS.map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -2 }}
                className={`${scrolled ? 'text-primary hover:text-accent' : 'text-primary/80 hover:text-primary'} transition-colors relative group text-sm font-semibold tracking-wide`}
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden ${scrolled ? 'text-primary' : 'text-primary/80'} hover:text-accent transition-colors`}
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-surface/95 backdrop-blur-xl flex flex-col p-6 border-l border-black/5"
          >
            <div className="flex justify-between items-center mb-12 border-b border-black/10 pb-4">
              <span className="text-2xl font-serif text-accent font-bold">AHA Office</span>
              <button className="text-primary/70 hover:text-primary" onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-textMuted hover:text-accent hover:pl-4 transition-all duration-300 font-serif border-b border-black/5 pb-4"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <a
        href="https://api.whatsapp.com/send?phone=0060173740140"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-[90] bg-primary text-white p-4 rounded-full shadow-[0_0_20px_rgba(62,39,35,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(62,39,35,0.6)] transition-all duration-300"
        title="تواصل معنا مباشرة"
      >
        <MessageCircle size={28} />
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30"></span>
      </a>
    </>
  );
};
