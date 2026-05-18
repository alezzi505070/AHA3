import { CONTACT } from '@/data/content';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-surface text-textPrimary content-vis-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-primary">تواصل معنا</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <MapPin className="text-textMuted group-hover:text-accent transition-colors mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-primary">الموقع</h4>
                  <p className="text-textMuted">{CONTACT.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <Mail className="text-textMuted group-hover:text-accent transition-colors mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-primary">البريد الإلكتروني</h4>
                  <p className="text-textMuted" dir="ltr">{CONTACT.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <Phone className="text-textMuted group-hover:text-accent transition-colors mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-primary">الهاتف</h4>
                  <div className="text-textMuted flex flex-col items-start gap-1" dir="ltr">
                    {CONTACT.phones.map((phone, i) => (
                      <span key={i}>{phone}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <Clock className="text-textMuted group-hover:text-accent transition-colors mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-primary">ساعات العمل</h4>
                  <p className="text-textMuted">{CONTACT.hours}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card bg-background p-8 rounded-3xl border border-black/5"
          >
            <form className="space-y-6 flex flex-col" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="الاسم الكامل"
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-textPrimary placeholder-textMuted focus:outline-none focus:border-accent shadow-sm"
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-textPrimary placeholder-textMuted focus:outline-none focus:border-accent shadow-sm"
              />
              <input
                type="tel"
                placeholder="رقم الهاتف"
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-textPrimary placeholder-textMuted focus:outline-none focus:border-accent shadow-sm"
              />
              <textarea
                placeholder="رسالتك"
                rows={4}
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-textPrimary placeholder-textMuted focus:outline-none focus:border-accent shadow-sm"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white hover:opacity-90 shadow-md transition-opacity"
              >
                إرسال <Send size={18} className="rotate-180" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
