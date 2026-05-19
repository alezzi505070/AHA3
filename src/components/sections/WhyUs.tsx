import { VALUES } from '@/data/content';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const WhyUs = () => {
  return (
    <section id="values" className="py-32 bg-surface text-textPrimary relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-20"
        >
          <span className="text-accent tracking-widest text-sm font-semibold uppercase mb-4 block">قيمنا</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">قيمنا ومبادئنا المهنية</h2>
          <p className="text-textMuted max-w-2xl mx-auto text-lg">الأسس التي نبني عليها علاقاتنا وأعمالنا</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {VALUES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02, rotateX: 3, rotateY: -3, z: 20 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card bg-background p-8 rounded-3xl flex items-start gap-5 relative group overflow-hidden border border-black/5 hover:border-accent/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-500 transform-style-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-accent/10 p-2 rounded-xl group-hover:bg-accent/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-20 flex-shrink-0">
                <CheckCircle2 className="text-accent w-6 h-6" />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-3 text-primary group-hover:text-accent transition-all duration-300">{item.title}</h3>
                <p className="text-textMuted text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
