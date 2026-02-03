import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const wallets = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    description: { en: 'Connect with MetaMask', ru: 'Подключить MetaMask' },
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '🔗',
    description: { en: 'Scan with WalletConnect', ru: 'Сканировать WalletConnect' },
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '💙',
    description: { en: 'Connect with Coinbase', ru: 'Подключить Coinbase' },
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    icon: '🛡️',
    description: { en: 'Connect with Trust Wallet', ru: 'Подключить Trust Wallet' },
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: '👻',
    description: { en: 'Connect with Phantom', ru: 'Подключить Phantom' },
  },
];

interface WalletModalProps {
  isConnected: boolean;
  onConnect: (walletId: string) => void;
  onDisconnect: () => void;
}

export const WalletModal = ({ isConnected, onConnect, onDisconnect }: WalletModalProps) => {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleConnect = (walletId: string) => {
    onConnect(walletId);
    setOpen(false);
  };

  if (isConnected) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onDisconnect} 
        className="gap-2 rounded-full px-4"
      >
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-xs font-medium">0x1234...5678</span>
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="default" 
          className="rounded-full px-6 font-semibold bg-foreground text-background hover:bg-foreground/90"
        >
          {language === 'en' ? 'Connect' : 'Подключить'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl border-border/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {language === 'en' ? 'Connect your wallet' : 'Подключите кошелек'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 text-center">
            {language === 'en' ? 'Popular wallets' : 'Популярные кошельки'}
          </p>
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleConnect(wallet.id)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 hover:bg-secondary 
                         transition-all duration-200 group border border-transparent hover:border-border"
            >
              <span className="text-2xl">{wallet.icon}</span>
              <div className="text-left flex-1">
                <p className="font-semibold group-hover:text-primary transition-colors">
                  {wallet.name}
                </p>
                <p className="text-xs text-muted-foreground">{wallet.description[language]}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
