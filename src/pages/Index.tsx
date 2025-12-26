import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Login from './Login';

const Index: React.FC = () => {
  return (
    <LanguageProvider>
      <Login />
    </LanguageProvider>
  );
};

export default Index;
