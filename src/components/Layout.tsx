import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Content */}
      <Header />
      <main className="relative z-10 pt-16">
        {children}
      </main>
    </div>
  );
};
