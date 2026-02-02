import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Edit2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { t, language } = useLanguage();
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState('CryptoTrader');
  const [tempName, setTempName] = useState(userName);
  const [copied, setCopied] = useState(false);

  const walletAddress = '0x1234567890abcdef1234567890abcdef12345678';
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

  const stats = {
    completedDeals: 47,
    cancelledDeals: 3,
    successRate: 94,
    isOnline: true,
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success(language === 'en' ? 'Address copied!' : 'Адрес скопирован!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveName = () => {
    setUserName(tempName);
    setIsEditingName(false);
    toast.success(language === 'en' ? 'Name updated!' : 'Имя обновлено!');
  };

  const handleCancelEdit = () => {
    setTempName(userName);
    setIsEditingName(false);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="gradient-border rounded-2xl p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-primary text-2xl font-bold text-primary-foreground">
                {userName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              {/* Name */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="h-9 w-40"
                      autoFocus
                    />
                    <Button variant="ghost" size="icon" onClick={handleSaveName}>
                      <Save className="h-4 w-4 text-success" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold">{userName}</h1>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setIsEditingName(true)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                <div className={stats.isOnline ? 'status-online' : 'status-offline'} />
                <span className="text-sm text-muted-foreground">
                  {stats.isOnline ? t('online') : t('offline')}
                </span>
              </div>

              {/* Wallet Address */}
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Badge variant="outline" className="font-mono text-xs py-1.5">
                  {shortAddress}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleCopyAddress}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="gradient-border rounded-xl p-6 text-center">
            <p className="text-3xl font-bold gradient-text mb-1">{stats.completedDeals}</p>
            <p className="text-sm text-muted-foreground">{t('completedDeals')}</p>
          </div>
          <div className="gradient-border rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-destructive mb-1">{stats.cancelledDeals}</p>
            <p className="text-sm text-muted-foreground">{t('cancelledDeals')}</p>
          </div>
          <div className="gradient-border rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-success mb-1">{stats.successRate}%</p>
            <p className="text-sm text-muted-foreground">{t('successRate')}</p>
          </div>
        </div>

        {/* Full Wallet Address */}
        <div className="gradient-border rounded-xl p-6">
          <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-3">
            {t('walletAddress')}
          </h3>
          <div className="flex items-center gap-3">
            <p className="font-mono text-sm break-all flex-1 bg-secondary/30 rounded-lg p-3">
              {walletAddress}
            </p>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyAddress}
              className="shrink-0"
            >
              {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
