import { SERVICES } from '@/data/content';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowUpLeft } from 'lucide-react';

export const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="services" className="py-32 bg-surface relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-20"
        >
          <span className="text-accent tracking-widest text-sm font-semibold uppercase mb-4 block">خبراتنا</span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6">خدماتنا المهنية</h2>
          <p className="text-textMuted max-w-2xl mx-auto text-lg leading-relaxed font-light">
            نقدم مجموعة متكاملة من الخدمات المهنية التي صممت بعناية لتلبية أهدافكم ودعم نجاح أعمالكم بمعايير عالمية.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.02, rotateX: 5, rotateY: -5, z: 30 }}
              whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0, z: 0 }}
              className="glass-card p-10 rounded-3xl group cursor-pointer hover:border-accent/30 transition-colors transition-shadow duration-500 relative overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transform-style-3d"
              onClick={() => setSelectedService(service)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-black/5 group-hover:border-accent/50 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500 relative z-20">
                <span className="text-accent text-3xl font-serif">{idx + 1}</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300 relative z-10">{service.title}</h3>
              <p className="text-textMuted mb-8 line-clamp-3 leading-relaxed font-light relative z-10">{service.preview}</p>
              
              <div className="flex items-center gap-3 text-accent text-sm font-semibold group-hover:text-primary transition-colors relative z-10">
                <span className="relative">
                  المزيد من التفاصيل
                  <span className="absolute -bottom-1 right-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </span>
                <ArrowUpLeft size={18} className="transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dialog */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4" dir="rtl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setSelectedService(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-3xl glass-card bg-surface rounded-3xl p-8 md:p-10 max-h-[85vh] overflow-y-auto shadow-2xl"
              >
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 left-4 md:top-8 md:left-8 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-textMuted hover:text-primary transition-colors z-10"
                >
                  <X size={20} />
                </button>
                <span className="text-accent text-sm font-semibold tracking-widest mb-2 block mt-8 md:mt-0">تفاصيل الخدمة</span>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary mb-6 md:mb-8 pb-4 md:pb-6 border-b border-black/10 pr-2">{selectedService.title}</h2>
                <div className="text-textPrimary leading-loose whitespace-pre-wrap font-light text-base md:text-lg px-2 pb-4">
                  {selectedService.details}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
