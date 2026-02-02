import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { WalletModal } from './WalletModal';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, Triangle } from 'lucide-react';

const navLinks = [
  { key: 'deals', path: '/deals' },
  { key: 'makeADeal', path: '/make-deal' },
  { key: 'support', path: '/support' },
];

export const Header = () => {
  const { t } = useLanguage();
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
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Triangle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">Triangle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.key} to={link.path}>
                <Button
                  variant="ghost"
                  className={`px-4 ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground'
                  }`}
                >
                  {t(link.key)}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            {isWalletConnected && (
              <Link to="/profile" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary/50 transition-colors">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-primary text-xs text-primary-foreground">
                    TR
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Trader</span>
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
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-1 border-t border-border/30 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground'
                  }`}
                >
                  {t(link.key)}
                </Button>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
