import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Clock, User, AlertCircle } from 'lucide-react';

interface Ticket {
  id: string;
  user: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved';
  createdAt: string;
  messages: number;
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    user: '0x1234...5678',
    subject: 'Payment not received',
    status: 'open',
    createdAt: '5 min ago',
    messages: 3,
  },
  {
    id: '2',
    user: '0xabcd...efgh',
    subject: 'Transaction stuck',
    status: 'pending',
    createdAt: '1 hour ago',
    messages: 7,
  },
  {
    id: '3',
    user: '0x9876...5432',
    subject: 'Refund request',
    status: 'resolved',
    createdAt: '2 hours ago',
    messages: 12,
  },
];

const statusColors = {
  open: 'bg-destructive/20 text-destructive border-destructive/30',
  pending: 'bg-warning/20 text-warning border-warning/30',
  resolved: 'bg-success/20 text-success border-success/30',
};

const Support = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {language === 'en' ? 'Support Dashboard' : 'Панель поддержки'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage support tickets from users' 
                : 'Управление тикетами поддержки'}
            </p>
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/30 border">
            {language === 'en' ? 'Support Staff' : 'Сотрудник поддержки'}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="gradient-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-destructive mb-1">
              {mockTickets.filter((t) => t.status === 'open').length}
            </p>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Open' : 'Открытые'}
            </p>
          </div>
          <div className="gradient-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-warning mb-1">
              {mockTickets.filter((t) => t.status === 'pending').length}
            </p>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Pending' : 'В ожидании'}
            </p>
          </div>
          <div className="gradient-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-success mb-1">
              {mockTickets.filter((t) => t.status === 'resolved').length}
            </p>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Resolved' : 'Решенные'}
            </p>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {mockTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="gradient-border rounded-xl p-5 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{ticket.subject}</span>
                      {ticket.status === 'open' && (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-mono">{ticket.user}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {ticket.createdAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {ticket.messages}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={`${statusColors[ticket.status]} border`}>
                  {ticket.status === 'open' && (language === 'en' ? 'Open' : 'Открыт')}
                  {ticket.status === 'pending' && (language === 'en' ? 'Pending' : 'В ожидании')}
                  {ticket.status === 'resolved' && (language === 'en' ? 'Resolved' : 'Решен')}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
