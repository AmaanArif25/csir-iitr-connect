import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Header
  'nav.home': { en: 'Home', hi: 'मुख्य पृष्ठ' },
  'nav.notices': { en: 'Notices', hi: 'सूचनाएं' },
  'nav.forms': { en: 'Official Forms', hi: 'आधिकारिक प्रपत्र' },
  'nav.directory': { en: 'Directory', hi: 'निर्देशिका' },
  'nav.itc': { en: 'ITC Portal', hi: 'आईटीसी पोर्टल' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफ़ाइल' },
  'nav.archive': { en: 'Archive', hi: 'संग्रह' },
  'nav.contact': { en: 'Contact Us', hi: 'संपर्क करें' },
  'nav.login': { en: 'Login', hi: 'लॉगिन' },
  'nav.logout': { en: 'Logout', hi: 'लॉगआउट' },

  // Login
  'login.title': { en: 'CSIR-IITR Intranet Portal', hi: 'सीएसआईआर-आईआईटीआर इंट्रानेट पोर्टल' },
  'login.welcome': { en: 'Welcome Back', hi: 'पुनः स्वागत है' },
  'login.subtitle': { en: 'Sign in to access the intranet', hi: 'इंट्रानेट तक पहुंचने के लिए साइन इन करें' },
  'login.userTab': { en: 'User Login', hi: 'उपयोगकर्ता लॉगिन' },
  'login.adminTab': { en: 'Admin Login', hi: 'व्यवस्थापक लॉगिन' },
  'login.employeeId': { en: 'Employee ID', hi: 'कर्मचारी आईडी' },
  'login.password': { en: 'Password', hi: 'पासवर्ड' },
  'login.remember': { en: 'Remember me', hi: 'मुझे याद रखें' },
  'login.forgot': { en: 'Forgot Password?', hi: 'पासवर्ड भूल गए?' },
  'login.button': { en: 'Sign In', hi: 'साइन इन करें' },
  'login.adminId': { en: 'Admin ID', hi: 'व्यवस्थापक आईडी' },

  // Hero
  'hero.welcome': { en: 'Welcome to CSIR-IITR Intranet', hi: 'सीएसआईआर-आईआईटीआर इंट्रानेट में आपका स्वागत है' },
  'hero.subtitle': { en: 'Your gateway to institutional resources and communication', hi: 'संस्थागत संसाधनों और संचार का आपका प्रवेश द्वार' },

  // Notice Board
  'notices.title': { en: 'Notice Board', hi: 'सूचना पट्ट' },
  'notices.search': { en: 'Search notices...', hi: 'सूचनाएं खोजें...' },
  'notices.current': { en: 'Current', hi: 'वर्तमान' },
  'notices.archived': { en: 'Archived', hi: 'पुरालेख' },
  'notices.viewAll': { en: 'View All Notices', hi: 'सभी सूचनाएं देखें' },
  'notices.download': { en: 'Download', hi: 'डाउनलोड' },
  'notices.urgent': { en: 'Urgent', hi: 'अत्यावश्यक' },
  'notices.normal': { en: 'Normal', hi: 'सामान्य' },

  // Quick Links
  'quick.forms': { en: 'Official Forms', hi: 'आधिकारिक प्रपत्र' },
  'quick.formsDesc': { en: 'Download and submit official documents', hi: 'आधिकारिक दस्तावेज़ डाउनलोड और जमा करें' },
  'quick.directory': { en: 'Staff Directory', hi: 'कर्मचारी निर्देशिका' },
  'quick.directoryDesc': { en: 'Find contact information', hi: 'संपर्क जानकारी खोजें' },
  'quick.itc': { en: 'ITC Portal', hi: 'आईटीसी पोर्टल' },
  'quick.itcDesc': { en: 'IT services and support', hi: 'आईटी सेवाएं और सहायता' },
  'quick.archive': { en: 'Archive', hi: 'संग्रह' },
  'quick.archiveDesc': { en: 'Past notices and documents', hi: 'पिछली सूचनाएं और दस्तावेज़' },

  // Footer
  'footer.importantLinks': { en: 'Important Links', hi: 'महत्वपूर्ण लिंक्स' },
  'footer.quickLinks': { en: 'Quick Links', hi: 'त्वरित लिंक' },
  'footer.contact': { en: 'Contact Information', hi: 'संपर्क जानकारी' },
  'footer.address': { en: 'CSIR-Indian Institute of Toxicology Research', hi: 'सीएसआईआर-भारतीय विषविज्ञान अनुसंधान संस्थान' },
  'footer.city': { en: 'Lucknow, Uttar Pradesh, India', hi: 'लखनऊ, उत्तर प्रदेश, भारत' },
  'footer.rights': { en: 'All Rights Reserved', hi: 'सर्वाधिकार सुरक्षित' },

  // Common
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },
  'common.error': { en: 'An error occurred', hi: 'एक त्रुटि हुई' },
  'common.submit': { en: 'Submit', hi: 'जमा करें' },
  'common.cancel': { en: 'Cancel', hi: 'रद्द करें' },
  'common.save': { en: 'Save', hi: 'सहेजें' },
  'common.delete': { en: 'Delete', hi: 'हटाएं' },
  'common.edit': { en: 'Edit', hi: 'संपादित करें' },
  'common.view': { en: 'View', hi: 'देखें' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
