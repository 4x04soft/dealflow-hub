import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Trash2, ArrowRight, Coins, Network } from 'lucide-react';

const networks = [
  { id: 'trc20', name: 'TRC20 (Tron)', icon: '🔴' },
  { id: 'erc20', name: 'ERC20 (Ethereum)', icon: '💎' },
  { id: 'bep20', name: 'BEP20 (BSC)', icon: '💛' },
  { id: 'polygon', name: 'Polygon', icon: '💜' },
  { id: 'solana', name: 'Solana', icon: '🟣' },
];

const assets = [
  { id: 'usdt', name: 'USDT', fullName: 'Tether USD' },
  { id: 'usdc', name: 'USDC', fullName: 'USD Coin' },
  { id: 'eth', name: 'ETH', fullName: 'Ethereum' },
  { id: 'btc', name: 'BTC', fullName: 'Bitcoin' },
  { id: 'bnb', name: 'BNB', fullName: 'Binance Coin' },
];

const MakeDeal = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [showNewDealModal, setShowNewDealModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [amount, setAmount] = useState('');

  const handleClearAll = () => {
    setSelectedNetwork('');
    setSelectedAsset('');
    setAmount('');
  };

  const handleCreateDeal = () => {
    // Here you would create the deal and get an ID back
    const newDealId = Math.random().toString(36).substring(7);
    setShowNewDealModal(false);
    navigate(`/deal/${newDealId}`);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">{t('makeADeal')}</h1>
          <p className="text-muted-foreground">
            {language === 'en'
              ? 'Create a new P2P trade with secure escrow'
              : 'Создайте новую P2P сделку с безопасным эскроу'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Button
            variant="outline"
            size="lg"
            onClick={handleClearAll}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {t('clearAll')}
          </Button>
          <Button
            variant="gradient"
            size="lg"
            onClick={() => setShowNewDealModal(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            {t('newDeal')}
          </Button>
        </div>

        {/* New Deal Modal */}
        <Dialog open={showNewDealModal} onOpenChange={setShowNewDealModal}>
          <DialogContent className="glass-strong border-border/50 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Plus className="h-4 w-4 text-primary-foreground" />
                </div>
                {t('newDeal')}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Network Selection */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  {t('selectNetwork')}
                </Label>
                <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                  <SelectTrigger className="h-12 bg-secondary/50 border-border/50">
                    <SelectValue placeholder={t('selectNetwork')} />
                  </SelectTrigger>
                  <SelectContent className="glass-strong">
                    {networks.map((network) => (
                      <SelectItem key={network.id} value={network.id}>
                        <span className="flex items-center gap-2">
                          <span>{network.icon}</span>
                          <span>{network.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Asset Selection */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  {t('selectAsset')}
                </Label>
                <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                  <SelectTrigger className="h-12 bg-secondary/50 border-border/50">
                    <SelectValue placeholder={t('selectAsset')} />
                  </SelectTrigger>
                  <SelectContent className="glass-strong">
                    {assets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        <span className="flex items-center gap-2">
                          <span className="font-semibold">{asset.name}</span>
                          <span className="text-muted-foreground">- {asset.fullName}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">{t('amount')}</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 bg-secondary/50 border-border/50 text-lg"
                />
              </div>

              {/* Create Button */}
              <Button
                variant="gradient"
                size="lg"
                className="w-full gap-2 mt-4"
                onClick={handleCreateDeal}
                disabled={!selectedNetwork || !selectedAsset || !amount}
              >
                {t('createDeal')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="gradient-border rounded-2xl p-6">
            <h3 className="font-semibold mb-3">
              {language === 'en' ? 'How it works' : 'Как это работает'}
            </h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">1</span>
                {language === 'en' ? 'Select network and asset' : 'Выберите сеть и актив'}
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">2</span>
                {language === 'en' ? 'Enter the amount you want to trade' : 'Введите сумму для сделки'}
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">3</span>
                {language === 'en' ? 'Send funds to the proxy address' : 'Отправьте средства на прокси адрес'}
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">4</span>
                {language === 'en' ? 'Wait for payment confirmation' : 'Дождитесь подтверждения оплаты'}
              </li>
            </ol>
          </div>

          <div className="gradient-border rounded-2xl p-6">
            <h3 className="font-semibold mb-3">
              {language === 'en' ? 'Supported Networks' : 'Поддерживаемые сети'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {networks.map((network) => (
                <div
                  key={network.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50"
                >
                  <span>{network.icon}</span>
                  <span className="text-sm">{network.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeDeal;
