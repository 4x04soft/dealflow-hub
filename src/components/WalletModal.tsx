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
import { Wallet } from 'lucide-react';

const wallets = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect with MetaMask',
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Scan with WalletConnect',
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '💙',
    description: 'Connect with Coinbase',
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    icon: '🛡️',
    description: 'Connect with Trust Wallet',
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: '👻',
    description: 'Connect with Phantom',
  },
];

interface WalletModalProps {
  isConnected: boolean;
  onConnect: (walletId: string) => void;
  onDisconnect: () => void;
}

export const WalletModal = ({ isConnected, onConnect, onDisconnect }: WalletModalProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleConnect = (walletId: string) => {
    onConnect(walletId);
    setOpen(false);
  };

  if (isConnected) {
    return (
      <Button variant="outline" size="sm" onClick={onDisconnect} className="gap-2">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-xs">0x1234...5678</span>
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="wallet" size="default" className="gap-2">
          <Wallet className="h-4 w-4" />
          <span>{t('connectWallet')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{t('chooseWallet')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            {t('popularWallets')}
          </p>
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleConnect(wallet.id)}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-200 group"
            >
              <span className="text-2xl">{wallet.icon}</span>
              <div className="text-left">
                <p className="font-medium group-hover:text-primary transition-colors">
                  {wallet.name}
                </p>
                <p className="text-xs text-muted-foreground">{wallet.description}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
