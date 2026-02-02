import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { WalletModal } from './WalletModal';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, Search, ChevronDown, Triangle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { 
    key: 'features', 
    label: { en: 'Features', ru: 'Функции' },
    hasDropdown: true,
    items: [
      { key: 'wallet', label: { en: 'Wallet', ru: 'Кошелек' }, path: '/' },
      { key: 'swap', label: { en: 'Swap', ru: 'Обмен' }, path: '/' },
      { key: 'staking', label: { en: 'Staking', ru: 'Стейкинг' }, path: '/' },
    ]
  },
  { 
    key: 'learn', 
    label: { en: 'Learn', ru: 'Обучение' },
    hasDropdown: true,
    items: [
      { key: 'guides', label: { en: 'Guides', ru: 'Руководства' }, path: '/' },
      { key: 'blog', label: { en: 'Blog', ru: 'Блог' }, path: '/' },
    ]
  },
  { key: 'explore', label: { en: 'Explore', ru: 'Обзор' }, path: '/deals' },
  { 
    key: 'company', 
    label: { en: 'Company', ru: 'Компания' },
    hasDropdown: true,
    items: [
      { key: 'about', label: { en: 'About', ru: 'О нас' }, path: '/' },
      { key: 'careers', label: { en: 'Careers', ru: 'Карьера' }, path: '/' },
    ]
  },
  { key: 'support', label: { en: 'Support', ru: 'Поддержка' }, path: '/support' },
];

export const Header = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnect = (walletId: string) => {
    console.log('Connecting wallet:', walletId);
    setIsWalletConnected(true);
  };

  const handleDisconnect = () => {
    setIsWalletConnected(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
              <Triangle className="h-4 w-4 text-primary-foreground fill-current" />
            </div>
            <span className="text-xl font-bold text-foreground">Triangle</span>
          </Link>

          {/* Desktop Navigation - Phantom-style pill */}
          <nav className="hidden lg:flex items-center">
            <div className="nav-pill">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <DropdownMenu key={link.key}>
                    <DropdownMenuTrigger asChild>
                      <button className="nav-pill-item flex items-center gap-1">
                        {link.label[language]}
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="min-w-[160px]">
                      {link.items?.map((item) => (
                        <DropdownMenuItem key={item.key} asChild>
                          <Link to={item.path} className="cursor-pointer">
                            {item.label[language]}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link 
                    key={link.key} 
                    to={link.path || '/'}
                    className={`nav-pill-item ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label[language]}
                  </Link>
                )
              ))}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <Button variant="ghost" size="icon" className="hidden md:flex rounded-full">
              <Search className="h-5 w-5" />
            </Button>

            <LanguageSwitcher />
            
            {isWalletConnected && (
              <Link to="/profile" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-secondary transition-colors">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-xs text-primary-foreground">
                    TR
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}

            <WalletModal
              isConnected={isWalletConnected}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-6 space-y-2 border-t border-border/50 animate-fade-in">
            {navLinks.map((link) => (
              <div key={link.key}>
                {link.hasDropdown ? (
                  <div className="space-y-1">
                    <p className="px-4 py-2 text-sm font-medium text-muted-foreground">
                      {link.label[language]}
                    </p>
                    {link.items?.map((item) => (
                      <Link
                        key={item.key}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-6 py-2 text-foreground hover:bg-secondary rounded-lg"
                      >
                        {item.label[language]}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={link.path || '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    {link.label[language]}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
