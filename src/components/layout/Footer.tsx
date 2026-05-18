import { NAV_LINKS, CONTACT } from '@/data/content';
import { Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-surface text-textPrimary relative border-t border-black/5 pt-16 pb-8 content-vis-auto">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <span className="text-3xl font-serif text-primary font-bold mb-4">AHA Office</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap justify-center gap-6">
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href} className="text-textMuted hover:text-accent transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a href={`mailto:${CONTACT.email}`} className="w-10 h-10 rounded-full bg-background border border-black/5 shadow-sm flex flex-col items-center justify-center text-textMuted hover:bg-accent/10 hover:text-accent transition-colors">
                <Mail size={20} />
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background border border-black/5 shadow-sm flex flex-col items-center justify-center text-textMuted hover:bg-accent/10 hover:text-accent transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="text-center text-textMuted/60 pt-8 border-t border-black/10 text-sm">
          <p>© 2024 مكتب عبد الرؤوف حسان. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};
