import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode } from '@/types/song';
import { languages } from '@/data/gospelSongs';

interface AppLanguageContextType {
  appLanguage: LanguageCode;
  setAppLanguage: (language: LanguageCode) => void;
  getTranslation: (key: string) => string;
}

const AppLanguageContext = createContext<AppLanguageContextType | undefined>(undefined);

// Basic translations for the app interface
const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    'app.title': 'Melody Muse',
    'app.description': 'Your personal songbook collection',
    'nav.songs': 'Songs',
    'nav.settings': 'Settings',
    'nav.admin': 'Admin',
    'search.placeholder': 'Search songs...',
    'language.all': 'All Languages',
    'collection.all': 'All Collections',
    'difficulty.all': 'All Difficulties',
    'button.back': 'Back',
    'button.close': 'Close',
    'settings.appearance': 'Appearance',
    'settings.darkMode': 'Dark Mode',
    'settings.appLanguage': 'App Language',
    'toast.languageUpdated': 'Language Updated',
    'toast.themeUpdated': 'Theme Updated'
  },
  hi: {
    'app.title': 'मेलोडी म्यूज़',
    'app.description': 'आपका व्यक्तिगत गीत संग्रह',
    'nav.songs': 'गाने',
    'nav.settings': 'सेटिंग्स',
    'nav.admin': 'एडमिन',
    'search.placeholder': 'गाने खोजें...',
    'language.all': 'सभी भाषाएं',
    'collection.all': 'सभी संग्रह',
    'difficulty.all': 'सभी कठिनाई',
    'button.back': 'वापस',
    'button.close': 'बंद करें',
    'settings.appearance': 'दिखावट',
    'settings.darkMode': 'डार्क मोड',
    'settings.appLanguage': 'ऐप भाषा',
    'toast.languageUpdated': 'भाषा अपडेट हुई',
    'toast.themeUpdated': 'थीम अपडेट हुई'
  },
  mr: {
    'app.title': 'मेलोडी म्यूझ',
    'app.description': 'तुमचा वैयक्तिक गीत संग्रह',
    'nav.songs': 'गाणी',
    'nav.settings': 'सेटिंग्ज',
    'nav.admin': 'अॅडमिन',
    'search.placeholder': 'गाणी शोधा...',
    'language.all': 'सर्व भाषा',
    'collection.all': 'सर्व संग्रह',
    'difficulty.all': 'सर्व अडचणी',
    'button.back': 'परत',
    'button.close': 'बंद करा',
    'settings.appearance': 'देखावा',
    'settings.darkMode': 'डार्क मोड',
    'settings.appLanguage': 'अॅप भाषा',
    'toast.languageUpdated': 'भाषा अद्यतनित केली',
    'toast.themeUpdated': 'थीम अद्यतनित केली'
  },
  te: {
    'app.title': 'మెలోడీ మ్యూజ్',
    'app.description': 'మీ వ్యక్తిగత పాట సేకరణ',
    'nav.songs': 'పాటలు',
    'nav.settings': 'సెట్టింగ్‌లు',
    'nav.admin': 'అడ్మిన్',
    'search.placeholder': 'పాటలను వెతకండి...',
    'language.all': 'అన్ని భాషలు',
    'collection.all': 'అన్ని సేకరణలు',
    'difficulty.all': 'అన్ని కష్టాలు',
    'button.back': 'వెనుకకు',
    'button.close': 'మూసివేయండి',
    'settings.appearance': 'కనిపించే విధం',
    'settings.darkMode': 'డార్క్ మోడ్',
    'settings.appLanguage': 'యాప్ భాష',
    'toast.languageUpdated': 'భాష నవీకరించబడింది',
    'toast.themeUpdated': 'థీమ్ నవీకరించబడింది'
  },
  kn: {
    'app.title': 'ಮೆಲೋಡಿ ಮ್ಯೂಸ್',
    'app.description': 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಹಾಡುಗಳ ಸಂಗ್ರಹ',
    'nav.songs': 'ಹಾಡುಗಳು',
    'nav.settings': 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'nav.admin': 'ಅಡ್ಮಿನ್',
    'search.placeholder': 'ಹಾಡುಗಳನ್ನು ಹುಡುಕಿ...',
    'language.all': 'ಎಲ್ಲಾ ಭಾಷೆಗಳು',
    'collection.all': 'ಎಲ್ಲಾ ಸಂಗ್ರಹಗಳು',
    'difficulty.all': 'ಎಲ್ಲಾ ಕಷ್ಟತೆಗಳು',
    'button.back': 'ಹಿಂದೆ',
    'button.close': 'ಮುಚ್ಚಿ',
    'settings.appearance': 'ನೋಟ',
    'settings.darkMode': 'ಡಾರ್ಕ್ ಮೋಡ್',
    'settings.appLanguage': 'ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆ',
    'toast.languageUpdated': 'ಭಾಷೆ ನವೀಕರಿಸಲಾಗಿದೆ',
    'toast.themeUpdated': 'ಥೀಮ್ ನವೀಕರಿಸಲಾಗಿದೆ'
  }
};

interface AppLanguageProviderProps {
  children: ReactNode;
}

export const AppLanguageProvider: React.FC<AppLanguageProviderProps> = ({ children }) => {
  const [appLanguage, setAppLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    // Load saved app language from localStorage
    const savedLanguage = localStorage.getItem('appLanguage') as LanguageCode;
    if (savedLanguage && languages.find(l => l.code === savedLanguage)) {
      setAppLanguageState(savedLanguage);
    }
  }, []);

  const setAppLanguage = (language: LanguageCode) => {
    setAppLanguageState(language);
    localStorage.setItem('appLanguage', language);
  };

  const getTranslation = (key: string): string => {
    return translations[appLanguage]?.[key] || translations['en'][key] || key;
  };

  return (
    <AppLanguageContext.Provider value={{ appLanguage, setAppLanguage, getTranslation }}>
      {children}
    </AppLanguageContext.Provider>
  );
};

export const useAppLanguage = () => {
  const context = useContext(AppLanguageContext);
  if (context === undefined) {
    throw new Error('useAppLanguage must be used within an AppLanguageProvider');
  }
  return context;
};