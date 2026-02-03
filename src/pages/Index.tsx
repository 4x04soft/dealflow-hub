import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wallet, Repeat, Shield, Bell, Coins, Flame, Tag, Zap } from 'lucide-react';
import triangleHeroLogo from '@/assets/triangle-hero-logo.png';
import { Footer } from '@/components/Footer';
import WatercolorParticles from '@/components/WatercolorParticles';
import ScrollReveal from '@/components/ScrollReveal';
import TiltCard from '@/components/TiltCard';
import { motion } from 'framer-motion';

const Index = () => {
  const { language } = useLanguage();

  const walletFeatures = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: { en: 'Escrow-protected transactions', ru: 'Транзакции под защитой эскроу' },
      description: { en: 'Your funds are safe until deal is complete.', ru: 'Ваши средства в безопасности до завершения сделки.' },
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: { en: 'Powered by Stylus & Arbitrum', ru: 'На базе Stylus и Arbitrum' },
      description: { en: 'Lightning-fast and low fees.', ru: 'Молниеносно и с низкими комиссиями.' },
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      title: { en: 'Connect any wallet', ru: 'Подключите любой кошелек' },
      description: { en: 'MetaMask, WalletConnect, and more.', ru: 'MetaMask, WalletConnect и другие.' },
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: { en: 'Real-time notifications', ru: 'Уведомления в реальном времени' },
      description: { en: 'Stay updated on deal progress.', ru: 'Следите за ходом сделки.' },
    },
  ];

  const toolsFeatures = [
    {
      icon: <Flame className="h-5 w-5" />,
      title: { en: 'Do more with NFTs', ru: 'Делайте больше с NFT' },
      description: { en: 'Pin, hide, burn, and list.', ru: 'Закрепляйте, скрывайте, сжигайте.' },
    },
    {
      icon: <Repeat className="h-5 w-5" />,
      title: { en: 'Swap tokens super fast', ru: 'Обменивайте токены мгновенно' },
      description: { en: 'At low fees.', ru: 'С низкими комиссиями.' },
    },
    {
      icon: <Coins className="h-5 w-5" />,
      title: { en: 'Store, stake, and earn rewards', ru: 'Храните, стейкайте и получайте награды' },
      description: { en: 'With your tokens.', ru: 'С вашими токенами.' },
    },
    {
      icon: <Tag className="h-5 w-5" />,
      title: { en: 'Sell NFTs in just 2 clicks', ru: 'Продавайте NFT в 2 клика' },
      description: { en: '', ru: '' },
    },
  ];

  const securityFeatures = [
    {
      icon: <Wallet className="h-5 w-5" />,
      title: { en: 'Self-custodial means you control your funds', ru: 'Вы полностью контролируете свои средства' },
      description: { en: 'We never have access.', ru: 'У нас нет доступа к ним.' },
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: { en: 'Scam detection flags malicious transactions', ru: 'Обнаружение мошенничества' },
      description: { en: 'Instantly.', ru: 'Мгновенно.' },
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: { en: 'Connect your Ledger', ru: 'Подключите ваш Ledger' },
      description: { en: 'Keep your crypto even safer.', ru: 'Для максимальной безопасности.' },
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: { en: 'Global Support team 24/7', ru: 'Глобальная поддержка 24/7' },
      description: { en: 'We\'re here for you.', ru: 'Мы всегда на связи.' },
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section - Phantom style */}
      <section className="hero-glow min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-24 relative overflow-hidden">
        {/* Watercolor particles animation */}
        <WatercolorParticles />
        
        {/* Smooth gradient transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
        
        <div className="container max-w-6xl mx-auto relative z-10 pointer-events-none -mt-16">
          <div className="flex items-center justify-between gap-8 lg:gap-16">
            {/* Left - Text content */}
            <div className="flex-1 text-left ml-4 md:ml-8">
              {/* Tagline */}
              <p className="text-muted-foreground text-lg md:text-xl mb-6 animate-fade-in">
                {language === 'en' ? 'The crypto app for everyone' : 'Крипто-приложение для всех'}
              </p>
              
              {/* Main headline */}
              <h1 className="section-title mb-8 animate-fade-in flex flex-col gap-2">
                <span className="flex items-center flex-wrap gap-2">
                  <span>{language === 'en' ? 'Your' : 'Ваш'}</span>
                  <svg className="trusted-svg" viewBox="0 0 170 50" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="text-fill-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(260 10% 20%)" />
                        <stop offset="50%" stopColor="hsl(260 10% 50%)" />
                        <stop offset="100%" stopColor="hsl(260 10% 20%)" />
                      </linearGradient>
                      <linearGradient id="teal-shine" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="transparent">
                          <animate attributeName="offset" values="-0.5;1.5" dur="4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="15%" stopColor="hsl(175 70% 50% / 0.8)">
                          <animate attributeName="offset" values="-0.35;1.65" dur="4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="30%" stopColor="transparent">
                          <animate attributeName="offset" values="-0.2;1.8" dur="4s" repeatCount="indefinite" />
                        </stop>
                      </linearGradient>
                      <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <text x="50%" y="40" textAnchor="middle" className="trusted-text-base">
                      {language === 'en' ? 'trusted' : 'надежный'}
                    </text>
                    <text x="50%" y="40" textAnchor="middle" className="trusted-shine-stroke" filter="url(#soft-glow)">
                      {language === 'en' ? 'trusted' : 'надежный'}
                    </text>
                  </svg>
                </span>
                <span>{language === 'en' ? 'companion' : 'помощник'}</span>
              </h1>
              
              {/* CTA Button */}
              <div className="animate-fade-in pointer-events-auto">
                <Link to="/make-deal">
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 py-6 text-base font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-lg"
                  >
                    {language === 'en' ? 'Download Triangle' : 'Скачать Triangle'}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Animated Logo */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3
                }}
                className="relative z-30"
              >
                {/* Background circle to block watercolor with blur and noise */}
                <div 
                  className="absolute -inset-8 rounded-full overflow-hidden"
                  style={{
                    background: 'radial-gradient(circle, hsl(var(--background) / 0.85) 0%, hsl(var(--background) / 0.6) 40%, hsl(var(--background) / 0.2) 70%, transparent 90%)',
                    backdropFilter: 'blur(12px)',
                    WebkitMaskImage: 'radial-gradient(circle, black 0%, black 50%, transparent 100%)',
                    maskImage: 'radial-gradient(circle, black 0%, black 50%, transparent 100%)'
                  }}
                >
                  {/* Noise overlay */}
                  <div 
                    className="absolute inset-0 opacity-25 mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      backgroundSize: '128px 128px'
                    }}
                  />
                </div>
                
                {/* Glow effect behind logo */}
                <motion.div
                  className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Rotating ring */}
                <motion.div
                  className="absolute -inset-8 rounded-full border border-primary/30"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, hsl(174 72% 45% / 0.15), transparent)'
                  }}
                />
                
                {/* Second rotating ring */}
                <motion.div
                  className="absolute -inset-16 rounded-full border border-accent/15"
                  animate={{ rotate: -360 }}
                  transition={{ 
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Logo with float animation */}
                <motion.img 
                  src={triangleHeroLogo} 
                  alt="Triangle" 
                  className="w-48 h-48 lg:w-64 lg:h-64 object-contain relative z-10"
                  animate={{ 
                    y: [0, -15, 0],
                    rotateY: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Shadow under logo */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 lg:w-48 h-8 rounded-[50%] bg-foreground/20 blur-lg z-0"
                  animate={{
                    scaleX: [1, 0.8, 1],
                    scaleY: [1, 0.7, 1],
                    opacity: [0.5, 0.3, 0.5]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Sparkle particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/60"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 1 - Your Wallet */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Feature card visual */}
            <ScrollReveal direction="left" parallax parallaxSpeed={30} className="order-2 lg:order-1">
              <TiltCard className="feature-card min-h-[400px] flex items-center justify-center relative">
                <div className="text-center" style={{ transform: 'translateZ(40px)' }}>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Wallet className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold">{language === 'en' ? 'Your Wallet' : 'Ваш Кошелек'}</h4>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Right - Text content */}
            <ScrollReveal direction="right" delay={0.15} parallax parallaxSpeed={20} className="order-1 lg:order-2 space-y-8">
              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-3">
                  {language === 'en' ? 'Keep everything in one place' : 'Храните все в одном месте'}
                </p>
                <h2 className="section-title">
                  <span className="gradient-text">{language === 'en' ? 'Your' : 'Ваш'}</span>{' '}
                  {language === 'en' ? 'wallet' : 'кошелек'}
                </h2>
              </div>

              <ul className="space-y-4">
                {walletFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {feature.title[language]}
                      </p>
                      {feature.description[language] && (
                        <p className="text-sm text-muted-foreground">{feature.description[language]}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Feature Section 2 - Your Tools */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text content */}
            <ScrollReveal direction="left" parallax parallaxSpeed={20} className="space-y-8">
              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-3">
                  {language === 'en' ? 'Powerful tools made for everyone' : 'Мощные инструменты для всех'}
                </p>
                <h2 className="section-title">
                  <span className="gradient-text">{language === 'en' ? 'Your' : 'Ваши'}</span>{' '}
                  {language === 'en' ? 'web3 tools' : 'web3 инструменты'}
                </h2>
              </div>

              <ul className="space-y-4">
                {toolsFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {feature.title[language]}
                      </p>
                      {feature.description[language] && (
                        <p className="text-sm text-muted-foreground">{feature.description[language]}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Right - Feature card visual */}
            <ScrollReveal direction="right" delay={0.15} parallax parallaxSpeed={30}>
              <TiltCard className="feature-card min-h-[400px] flex items-center justify-center relative">
                <div className="text-center" style={{ transform: 'translateZ(40px)' }}>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <Repeat className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold">{language === 'en' ? 'Your Tools' : 'Ваши Инструменты'}</h4>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Feature Section 3 - Your Security */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Feature card visual */}
            <ScrollReveal direction="left" parallax parallaxSpeed={30}>
              <TiltCard className="feature-card min-h-[400px] flex items-center justify-center relative">
                <div className="text-center" style={{ transform: 'translateZ(40px)' }}>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Shield className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold">{language === 'en' ? 'Your Security' : 'Ваша Безопасность'}</h4>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Right - Text content */}
            <ScrollReveal direction="right" delay={0.15} parallax parallaxSpeed={20} className="space-y-8">
              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-3">
                  {language === 'en' ? 'Controlled by you, secured by us' : 'Под вашим контролем, под нашей защитой'}
                </p>
                <h2 className="section-title">
                  <span className="gradient-text">{language === 'en' ? 'Your' : 'Ваша'}</span>{' '}
                  {language === 'en' ? 'security' : 'безопасность'}
                </h2>
              </div>

              <ul className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {feature.title[language]}
                      </p>
                      {feature.description[language] && (
                        <p className="text-sm text-muted-foreground">{feature.description[language]}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-secondary/30">
        <ScrollReveal direction="up" parallax parallaxSpeed={15} className="container max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <TiltCard className="w-24 h-24 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-xl">
              <img 
                src={triangleHeroLogo} 
                alt="Triangle Logo" 
                className="w-16 h-16 object-contain"
              />
            </TiltCard>
          </div>
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-4">
            {language === 'en' ? 'Connect Wallet' : 'Подключить кошелёк'}
          </p>
          <h2 className="section-title mb-4">
            {language === 'en' ? 'to get started' : 'чтобы начать'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {language === 'en' ? 'Trusted by more than 15 million people' : 'Доверяют более 15 миллионов человек'}
          </p>
          <Link to="/make-deal">
            <Button 
              size="lg" 
              className="rounded-full px-8 py-6 text-base font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-lg gap-2 group"
            >
              {language === 'en' ? 'Make a Deal' : 'Создать сделку'}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
