import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section id="about" className="py-32 bg-background text-textPrimary relative overflow-hidden content-vis-auto">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotateX: 5, rotateY: -10, scale: 1.05, z: 30 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            className="order-2 lg:order-1 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-[3rem] bg-gradient-to-br from-accent to-[#553637]/30 p-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(184,155,88,0.2)] transition-shadow duration-700 animate-float">
              <div className="w-full h-full bg-white rounded-[3rem] flex flex-col items-center justify-center p-12 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                
                <span className="text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-accent to-[#8A733F] mb-4 drop-shadow-sm transform group-hover:scale-105 transition-transform duration-700 inline-block">١٩٩٦</span>
                <p className="text-xl font-medium text-textMuted tracking-wide">عام التأسيس والتميز المهني</p>
                <div className="absolute -inset-4 border border-accent/20 rounded-[3.5rem] -z-10 group-hover:rotate-12 group-hover:scale-105 transition-transform duration-1000" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 space-y-10"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-[2px] bg-accent"></span>
                <p className="text-accent font-semibold tracking-widest uppercase text-sm">من نحن</p>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-primary drop-shadow-sm">شركاؤكم في النمو <br/><span className="text-gradient text-5xl md:text-6xl">والتميز المهني</span></h2>
            </div>
            
            <p className="text-xl text-textMuted leading-relaxed font-light">
              تأسس مكتب عبد الرؤوف حسان في عام 1996م وهو مكتب متكامل الخدمات يقود عملياته قيادات وطنية يدعمها فرق إقليمية متخصصة في عملها ومجموعة من الموظفين الموهوبين الذين يتمتعون بقدرات إدارية وخبرات طويلة في مجالات مختلفة.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 perspective-[1000px]">
              <motion.div 
                id="mission"
                whileHover={{ y: -8, scale: 1.02, rotateX: 5, rotateY: -5, z: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="glass-card bg-surface p-8 rounded-3xl group transition-all duration-500 hover:shadow-xl"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
                </div>
                <h3 className="font-bold text-primary mb-3 text-2xl group-hover:text-accent transition-colors">رسالتنا</h3>
                <p className="text-base text-textMuted font-light leading-relaxed">
                  تقديم خدمات مهنية عالية الجودة تسهم في نمو وتطوير أعمال عملائنا.
                </p>
              </motion.div>
              <motion.div 
                id="vision"
                whileHover={{ y: -8, scale: 1.02, rotateX: 5, rotateY: 5, z: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="glass-card bg-surface p-8 rounded-3xl group transition-all duration-500 hover:shadow-xl"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-4 text-accent group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <h3 className="font-bold text-primary mb-3 text-2xl group-hover:text-accent transition-colors">رؤيتنا</h3>
                <p className="text-base text-textMuted font-light leading-relaxed">
                  الاستمرار في الحفاظ على مكانتنا كمكتب رائد من خلال تقديم خدمة متميزة، والمشاركة مع العميل في تطوير وتنظيم أعماله.
                </p>
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
