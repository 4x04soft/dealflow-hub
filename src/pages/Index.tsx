import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wallet, Repeat, Shield, Bell, Coins, Flame, Tag, Zap } from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();

  const walletFeatures = [
    {
      icon: '🔗',
      title: { en: 'Multiple chains, one wallet', ru: 'Множество сетей, один кошелек' },
      description: { en: 'No more switching.', ru: 'Больше никаких переключений.' },
    },
    {
      icon: '🖼️',
      title: { en: 'Seamlessly access NFT marketplaces', ru: 'Легкий доступ к NFT маркетплейсам' },
      description: { en: 'The largest ones.', ru: 'К крупнейшим.' },
    },
    {
      icon: '✨',
      title: { en: 'Showcase your NFT collection', ru: 'Демонстрируйте вашу NFT коллекцию' },
      description: { en: '', ru: '' },
    },
    {
      icon: '📊',
      title: { en: 'Monitor activity with history', ru: 'Отслеживайте историю транзакций' },
      description: { en: 'And notifications.', ru: 'И уведомления.' },
    },
    {
      icon: '∞',
      title: { en: 'No limits on tokens or transactions', ru: 'Без лимитов на токены и транзакции' },
      description: { en: '', ru: '' },
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
      <section className="hero-glow min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16">
        <div className="container max-w-5xl mx-auto text-center relative z-10">
          {/* Tagline */}
          <p className="text-muted-foreground text-lg md:text-xl mb-6 animate-fade-in">
            {language === 'en' ? 'The crypto app for everyone' : 'Крипто-приложение для всех'}
          </p>
          
          {/* Main headline with icon */}
          <h1 className="section-title mb-8 animate-fade-in flex flex-col items-center gap-4">
            <span className="flex items-center justify-center gap-4 flex-wrap">
              <span>{language === 'en' ? 'Your' : 'Ваш'}</span>
              <span className="phantom-icon"></span>
              <span className="gradient-text">{language === 'en' ? 'trusted' : 'надежный'}</span>
            </span>
            <span>{language === 'en' ? 'companion' : 'помощник'}</span>
          </h1>
          
          {/* CTA Button */}
          <div className="animate-fade-in">
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
      </section>

      {/* Feature Section 1 - Your Wallet */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Feature card visual */}
            <div className="order-2 lg:order-1">
              <div className="feature-card min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Wallet className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold">{language === 'en' ? 'Your Wallet' : 'Ваш Кошелек'}</h4>
                </div>
              </div>
            </div>

            {/* Right - Text content */}
            <div className="order-1 lg:order-2 space-y-8">
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
                    <span className="text-2xl">{feature.icon}</span>
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
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 - Your Tools */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text content */}
            <div className="space-y-8">
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
            </div>

            {/* Right - Feature card visual */}
            <div>
              <div className="feature-card min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <Repeat className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold">{language === 'en' ? 'Your Tools' : 'Ваши Инструменты'}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3 - Your Security */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Feature card visual */}
            <div>
              <div className="feature-card min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Shield className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold">{language === 'en' ? 'Your Security' : 'Ваша Безопасность'}</h4>
                </div>
              </div>
            </div>

            {/* Right - Text content */}
            <div className="space-y-8">
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-4">
            {language === 'en' ? 'Download Triangle' : 'Скачать Triangle'}
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
              {language === 'en' ? 'Download Triangle' : 'Скачать Triangle'}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-border/50">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-bold">Triangle</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Triangle. {language === 'en' ? 'All rights reserved.' : 'Все права защищены.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
