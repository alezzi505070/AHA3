import { SECTORS } from '@/data/content';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export const Sectors = () => {
  return (
    <section id="clients" className="py-32 bg-background text-textPrimary relative content-vis-auto">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <span className="text-accent tracking-widest text-sm font-semibold uppercase mb-4 block">شركاء النجاح</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">عملاؤنا</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {SECTORS.map((sector, idx) => {
            const IconComponent = (Icons as any)[sector.icon];
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.05, rotateX: 5, rotateY: -5, z: 20 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="glass-card bg-surface p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-6 group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-black/5"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-accent group-hover:text-primary transition-colors duration-300 transform group-hover:scale-110">
                  {IconComponent && <IconComponent size={42} strokeWidth={1.5} />}
                </div>
                <h3 className="font-semibold text-lg text-primary group-hover:text-accent transition-all duration-300 relative z-10">{sector.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
