import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru';

interface Translations {
  [key: string]: {
    en: string;
    ru: string;
  };
}

const translations: Translations = {
  // Navigation
  deals: { en: 'Deals', ru: 'Сделки' },
  makeADeal: { en: 'Make a Deal', ru: 'Создать сделку' },
  support: { en: 'Support', ru: 'Поддержка' },
  connectWallet: { en: 'Connect Wallet', ru: 'Подключить кошелек' },
  
  // Hero
  heroTitle: { en: 'Secure P2P Crypto Trading', ru: 'Безопасная P2P торговля криптовалютой' },
  heroSubtitle: { en: 'Trade directly with other users through our secure escrow system', ru: 'Торгуйте напрямую с другими пользователями через нашу безопасную систему эскроу' },
  getStarted: { en: 'Get Started', ru: 'Начать' },
  learnMore: { en: 'Learn More', ru: 'Узнать больше' },
  
  // Deals
  activeDeals: { en: 'Active Deals', ru: 'Активные сделки' },
  noDeals: { en: 'No active deals', ru: 'Нет активных сделок' },
  createFirstDeal: { en: 'Create your first deal to get started', ru: 'Создайте первую сделку, чтобы начать' },
  
  // Make a Deal
  newDeal: { en: 'New Deal', ru: 'Новая сделка' },
  clearAll: { en: 'Clear All', ru: 'Очистить все' },
  selectNetwork: { en: 'Select Network', ru: 'Выберите сеть' },
  selectAsset: { en: 'Select Asset', ru: 'Выберите актив' },
  amount: { en: 'Amount', ru: 'Сумма' },
  createDeal: { en: 'Create Deal', ru: 'Создать сделку' },
  
  // Deal Chat
  asset: { en: 'Asset', ru: 'Актив' },
  network: { en: 'Network', ru: 'Сеть' },
  status: { en: 'Status', ru: 'Статус' },
  payment: { en: 'Payment', ru: 'Оплата' },
  proxyAddress: { en: 'Proxy Address', ru: 'Прокси адрес' },
  timeLeft: { en: 'Time Left', ru: 'Осталось времени' },
  sendAssetToProxy: { en: 'Send your asset to the proxy address above', ru: 'Отправьте ваш актив на прокси адрес выше' },
  checkPayment: { en: 'Check Payment', ru: 'Проверить оплату' },
  allDeals: { en: 'All Deals', ru: 'Все сделки' },
  
  // Profile
  profile: { en: 'Profile', ru: 'Профиль' },
  completedDeals: { en: 'Completed Deals', ru: 'Завершенные сделки' },
  cancelledDeals: { en: 'Cancelled Deals', ru: 'Отмененные сделки' },
  successRate: { en: 'Success Rate', ru: 'Успешность' },
  online: { en: 'Online', ru: 'Онлайн' },
  offline: { en: 'Offline', ru: 'Оффлайн' },
  walletAddress: { en: 'Wallet Address', ru: 'Адрес кошелька' },
  editName: { en: 'Edit Name', ru: 'Изменить имя' },
  
  // Wallet
  chooseWallet: { en: 'Choose your wallet', ru: 'Выберите кошелек' },
  popularWallets: { en: 'Popular wallets', ru: 'Популярные кошельки' },
  
  // Status
  pending: { en: 'Pending', ru: 'В ожидании' },
  completed: { en: 'Completed', ru: 'Завершено' },
  cancelled: { en: 'Cancelled', ru: 'Отменено' },
  inProgress: { en: 'In Progress', ru: 'В процессе' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
