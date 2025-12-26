import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import NoticeBoard from '@/components/NoticeBoard';
import QuickLinks from '@/components/QuickLinks';

const DashboardContent: React.FC = () => {
  const handleLogout = () => {
    // Handle logout logic
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} onLogout={handleLogout} />
      <main className="flex-1">
        <HeroCarousel />
        <QuickLinks />
        <NoticeBoard />
      </main>
      <Footer />
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  );
};

export default Dashboard;
