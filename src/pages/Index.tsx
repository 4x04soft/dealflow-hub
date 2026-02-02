import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Users, Lock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: { en: 'Secure Escrow', ru: 'Безопасный эскроу' },
    description: { en: 'Your funds are protected until both parties confirm the trade', ru: 'Ваши средства защищены, пока обе стороны не подтвердят сделку' },
  },
  {
    icon: Zap,
    title: { en: 'Instant Trades', ru: 'Мгновенные сделки' },
    description: { en: 'Execute trades in seconds with our optimized matching engine', ru: 'Выполняйте сделки за секунды с нашим оптимизированным движком' },
  },
  {
    icon: Users,
    title: { en: 'P2P Network', ru: 'P2P Сеть' },
    description: { en: 'Trade directly with verified users worldwide', ru: 'Торгуйте напрямую с верифицированными пользователями по всему миру' },
  },
  {
    icon: Lock,
    title: { en: 'Multi-Chain', ru: 'Мульти-сеть' },
    description: { en: 'Support for TRC20, ERC20, BEP20, and more networks', ru: 'Поддержка сетей TRC20, ERC20, BEP20 и других' },
  },
];

const stats = [
  { value: '$2.5B+', label: { en: 'Total Volume', ru: 'Общий объем' } },
  { value: '150K+', label: { en: 'Active Users', ru: 'Активных пользователей' } },
  { value: '99.9%', label: { en: 'Uptime', ru: 'Доступность' } },
  { value: '24/7', label: { en: 'Support', ru: 'Поддержка' } },
];

const Index = () => {
  const { t, language } = useLanguage();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="hero-glow min-h-[90vh] flex items-center justify-center px-4 py-20">
        <div className="container max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">
              {language === 'en' ? 'Trusted by 150,000+ traders' : 'Доверяют 150,000+ трейдеров'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="gradient-text glow-text">{t('heroTitle')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link to="/make-deal">
              <Button variant="gradient" size="xl" className="gap-2 group">
                {t('getStarted')}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              {t('learnMore')}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.label[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' ? 'Why Choose Triangle?' : 'Почему Triangle?'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'en'
                ? 'Built for traders who value security, speed, and simplicity'
                : 'Создано для трейдеров, которые ценят безопасность, скорость и простоту'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="gradient-border p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title[language]}</h3>
                <p className="text-sm text-muted-foreground">{feature.description[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="gradient-border p-12 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'en' ? 'Ready to Start Trading?' : 'Готовы начать торговать?'}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {language === 'en'
                  ? 'Join thousands of traders who trust Triangle for secure P2P transactions'
                  : 'Присоединяйтесь к тысячам трейдеров, которые доверяют Triangle'}
              </p>
              <Link to="/make-deal">
                <Button variant="gradient" size="xl" className="gap-2 group">
                  {t('createDeal')}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
