import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import triangleHeroLogo from '@/assets/triangle-hero-logo.png';

const Index = () => {
  const { language } = useLanguage();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="hero-glow min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16">
        <div className="container max-w-5xl mx-auto text-center relative z-10">
          {/* Placeholder: Tagline */}
          <div className="mb-6 animate-fade-in">
            <p className="text-muted-foreground text-lg md:text-xl italic border-2 border-dashed border-border rounded-lg p-4 bg-muted/20">
              [Добавьте подзаголовок]
            </p>
          </div>
          
          {/* Placeholder: Main headline */}
          <div className="mb-8 animate-fade-in">
            <h1 className="section-title border-2 border-dashed border-border rounded-lg p-6 bg-muted/20">
              [Добавьте заголовок]
            </h1>
          </div>
          
          {/* Placeholder: Hero image */}
          <div className="mb-8 animate-fade-in">
            <div className="w-full max-w-md mx-auto h-48 border-2 border-dashed border-border rounded-2xl bg-muted/20 flex items-center justify-center">
              <span className="text-muted-foreground italic">[Добавьте изображение]</span>
            </div>
          </div>
          
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

      {/* Section 1 */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image placeholder */}
            <div className="order-2 lg:order-1">
              <div className="min-h-[400px] border-2 border-dashed border-border rounded-3xl bg-muted/20 flex items-center justify-center">
                <span className="text-muted-foreground italic">[Добавьте изображение или карточку]</span>
              </div>
            </div>

            {/* Right - Text content placeholder */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/20">
                <p className="text-muted-foreground text-sm uppercase tracking-wider italic">
                  [Подзаголовок секции]
                </p>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-6 bg-muted/20">
                <h2 className="section-title italic text-muted-foreground">
                  [Заголовок секции]
                </h2>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-6 bg-muted/20 min-h-[200px]">
                <p className="text-muted-foreground italic">
                  [Добавьте описание или список функций]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text content placeholder */}
            <div className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/20">
                <p className="text-muted-foreground text-sm uppercase tracking-wider italic">
                  [Подзаголовок секции]
                </p>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-6 bg-muted/20">
                <h2 className="section-title italic text-muted-foreground">
                  [Заголовок секции]
                </h2>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-6 bg-muted/20 min-h-[200px]">
                <p className="text-muted-foreground italic">
                  [Добавьте описание или список функций]
                </p>
              </div>
            </div>

            {/* Right - Image placeholder */}
            <div>
              <div className="min-h-[400px] border-2 border-dashed border-border rounded-3xl bg-muted/20 flex items-center justify-center">
                <span className="text-muted-foreground italic">[Добавьте изображение или карточку]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image placeholder */}
            <div>
              <div className="min-h-[400px] border-2 border-dashed border-border rounded-3xl bg-muted/20 flex items-center justify-center">
                <span className="text-muted-foreground italic">[Добавьте изображение или карточку]</span>
              </div>
            </div>

            {/* Right - Text content placeholder */}
            <div className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/20">
                <p className="text-muted-foreground text-sm uppercase tracking-wider italic">
                  [Подзаголовок секции]
                </p>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-6 bg-muted/20">
                <h2 className="section-title italic text-muted-foreground">
                  [Заголовок секции]
                </h2>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-6 bg-muted/20 min-h-[200px]">
                <p className="text-muted-foreground italic">
                  [Добавьте описание или список функций]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/20 mb-4 inline-block">
            <p className="text-muted-foreground text-sm uppercase tracking-wider italic">
              [Подзаголовок CTA]
            </p>
          </div>
          <div className="border-2 border-dashed border-border rounded-lg p-6 bg-muted/20 mb-4">
            <h2 className="section-title italic text-muted-foreground">
              [Заголовок CTA]
            </h2>
          </div>
          <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/20 mb-8">
            <p className="text-lg text-muted-foreground italic">
              [Описание CTA]
            </p>
          </div>
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
