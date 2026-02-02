import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Copy, Check, Clock, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const DealChat = () => {
  const { dealId } = useParams();
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  // Mock deal data
  const deal = {
    id: dealId,
    asset: 'USDT',
    network: 'TRC20',
    amount: '1,500',
    status: 'pending',
    payment: 'Waiting',
    proxyAddress: 'TRC20Kj8dQY7R3mXxVFE2ZqT9sN6LpWv4cA1b',
    counterparty: '0x1234...5678',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(deal.proxyAddress);
    setCopied(true);
    toast.success(language === 'en' ? 'Address copied!' : 'Адрес скопирован!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckPayment = () => {
    toast.info(language === 'en' ? 'Checking payment...' : 'Проверка оплаты...');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        {/* Back Button */}
        <Link to="/deals" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          {t('allDeals')}
        </Link>

        {/* Deal Header */}
        <div className="gradient-border rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-xl font-bold text-primary-foreground">
                {deal.asset.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{deal.amount} {deal.asset}</h1>
                <p className="text-muted-foreground">{deal.network}</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-warning/20 text-warning border-warning/30 text-sm px-3 py-1">
              {t('pending')}
            </Badge>
          </div>

          {/* Deal Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-secondary/30 rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t('asset')}</p>
              <p className="font-semibold">{deal.asset}</p>
            </div>
            <div className="bg-secondary/30 rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t('amount')}</p>
              <p className="font-semibold">{deal.amount}</p>
            </div>
            <div className="bg-secondary/30 rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t('network')}</p>
              <p className="font-semibold">{deal.network}</p>
            </div>
            <div className="bg-secondary/30 rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t('status')}</p>
              <p className="font-semibold text-warning">{t('pending')}</p>
            </div>
          </div>

          {/* Counterparty */}
          <div className="bg-secondary/30 rounded-xl p-4 mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {language === 'en' ? 'Trading with' : 'Сделка с'}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-primary" />
              <p className="font-mono text-sm">{deal.counterparty}</p>
            </div>
          </div>
        </div>

        {/* Proxy Address Card */}
        <div className="gradient-border rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t('proxyAddress')}</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm break-all">{deal.proxyAddress}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyAddress}
              className="shrink-0"
            >
              {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          {/* Time Left */}
          <div className="flex items-center gap-2 text-warning mb-4">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">{t('timeLeft')}: {formatTime(timeLeft)}</span>
          </div>

          {/* Instructions */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-primary flex items-center gap-2">
              <ExternalLink className="h-4 w-4 shrink-0" />
              {t('sendAssetToProxy')}
            </p>
          </div>

          {/* Check Payment Button */}
          <Button
            variant="gradient"
            size="lg"
            className="w-full gap-2"
            onClick={handleCheckPayment}
          >
            {t('checkPayment')}
          </Button>
        </div>

        {/* Chat Messages Area (placeholder) */}
        <div className="gradient-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">
            {language === 'en' ? 'Chat' : 'Чат'}
          </h3>
          <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
            {language === 'en' 
              ? 'Messages will appear here...' 
              : 'Сообщения появятся здесь...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealChat;
