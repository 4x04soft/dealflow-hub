import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, FileText, HelpCircle, Shield } from 'lucide-react';
import triangleLogo from '@/assets/triangle-logo.png';

export const Footer = () => {
  const { language } = useLanguage();

  const navigationLinks = [
    {
      title: { en: 'FAQ', ru: 'FAQ' },
      href: '/support',
      icon: <HelpCircle className="h-4 w-4" />,
    },
    {
      title: { en: 'Support', ru: 'Поддержка' },
      href: '/support',
      icon: <MessageCircle className="h-4 w-4" />,
    },
    {
      title: { en: 'Terms', ru: 'Условия' },
      href: '#',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: { en: 'Privacy', ru: 'Конфиденциальность' },
      href: '#',
      icon: <Shield className="h-4 w-4" />,
    },
  ];

  const socialLinks = [
    { title: 'X', href: 'https://x.com' },
    { title: 'Telegram', href: 'https://t.me' },
    { title: 'Discord', href: 'https://discord.com' },
  ];

  return (
    <footer className="relative">
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Main footer bar */}
      <div className="footer-blur border-t border-border/30">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <img src={triangleLogo} alt="Triangle" className="w-8 h-8 object-contain" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Triangle</span>
                <span className="text-xs text-muted-foreground">
                  © 2026 {language === 'en' ? 'All rights reserved' : 'Все права защищены'}
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-1">
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  {link.icon}
                  <span className="hidden sm:inline">{link.title[language]}</span>
                </Link>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
