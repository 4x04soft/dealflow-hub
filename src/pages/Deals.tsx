import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, ArrowRight, MessageSquare } from 'lucide-react';

interface Deal {
  id: string;
  asset: string;
  network: string;
  amount: string;
  status: 'pending' | 'inProgress' | 'completed' | 'cancelled';
  counterparty: string;
  createdAt: string;
}

const mockDeals: Deal[] = [
  {
    id: '1',
    asset: 'USDT',
    network: 'TRC20',
    amount: '1,500',
    status: 'inProgress',
    counterparty: '0x1234...5678',
    createdAt: '2 min ago',
  },
  {
    id: '2',
    asset: 'ETH',
    network: 'ERC20',
    amount: '0.5',
    status: 'pending',
    counterparty: '0xabcd...efgh',
    createdAt: '15 min ago',
  },
  {
    id: '3',
    asset: 'USDC',
    network: 'BEP20',
    amount: '2,000',
    status: 'completed',
    counterparty: '0x9876...5432',
    createdAt: '1 hour ago',
  },
];

const statusColors = {
  pending: 'bg-warning/20 text-warning border-warning/30',
  inProgress: 'bg-primary/20 text-primary border-primary/30',
  completed: 'bg-success/20 text-success border-success/30',
  cancelled: 'bg-destructive/20 text-destructive border-destructive/30',
};

const Deals = () => {
  const { t, language } = useLanguage();
  const [deals] = useState<Deal[]>(mockDeals);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('activeDeals')}</h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? `${deals.length} active trades` 
                : `${deals.length} активных сделок`}
            </p>
          </div>
          <Link to="/make-deal">
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              {t('newDeal')}
            </Button>
          </Link>
        </div>

        {/* Deals List */}
        {deals.length === 0 ? (
          <div className="gradient-border rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('noDeals')}</h3>
            <p className="text-muted-foreground mb-6">{t('createFirstDeal')}</p>
            <Link to="/make-deal">
              <Button variant="gradient" className="gap-2">
                <Plus className="h-4 w-4" />
                {t('createDeal')}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {deals.map((deal) => (
              <Link
                key={deal.id}
                to={`/deal/${deal.id}`}
                className="block gradient-border rounded-xl p-5 hover:scale-[1.02] transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
                      {deal.asset.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-lg">{deal.amount} {deal.asset}</span>
                        <Badge variant="outline" className="text-xs">
                          {deal.network}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{deal.counterparty}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {deal.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Badge className={`${statusColors[deal.status]} border`}>
                      {t(deal.status)}
                    </Badge>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;
