import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translationService } from '@/services/translationService';
import type { Language } from '@/types/translation.types';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('learnhub_language');
    return (stored as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('learnhub_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'krio' : 'en');
  };

  const t = (text: string): string => {
    if (language === 'krio') {
      return translationService.translateToKrio(text);
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
