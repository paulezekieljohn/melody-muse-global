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
    'app.title': 'Gospel Songbook',
    'app.description': 'Multi-language Christian hymns, psalms, and worship songs',
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
    'toast.themeUpdated': 'Theme Updated',
    'category.hymns': 'Hymns',
    'category.psalms': 'Psalms',
    'category.praise': 'Praise',
    'category.worship': 'Worship',
    'category.hymns.description': 'Traditional Christian hymns',
    'category.psalms.description': 'Biblical psalms set to music',
    'category.praise.description': 'Praise songs and choruses',
    'category.worship.description': 'Worship and devotional songs'
  },
  hi: {
    'app.title': 'गॉस्पल गीत संग्रह',
    'app.description': 'बहुभाषीय ईसाई भजन, स्तुति और आराधना गीत',
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
    'toast.themeUpdated': 'थीम अपडेट हुई',
    'category.hymns': 'भजन',
    'category.psalms': 'स्तुति गीत',
    'category.praise': 'प्रशंसा',
    'category.worship': 'आराधना',
    'category.hymns.description': 'पारंपरिक ईसाई भजन',
    'category.psalms.description': 'संगीत के साथ बाइबिल के स्तुति गीत',
    'category.praise.description': 'प्रशंसा गीत और कोरस',
    'category.worship.description': 'आराधना और भक्ति गीत'
  },
  mr: {
    'app.title': 'गॉस्पेल गीत संग्रह',
    'app.description': 'बहुभाषीय ख्रिश्चन स्तुति, भजन आणि उपासना गीते',
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
    'toast.themeUpdated': 'थीम अद्यतनित केली',
    'category.hymns': 'स्तुति गीत',
    'category.psalms': 'स्तोत्र',
    'category.praise': 'स्तुति',
    'category.worship': 'उपासना',
    'category.hymns.description': 'पारंपरिक ख्रिश्चन स्तुति गीत',
    'category.psalms.description': 'संगीतासह बायबलमधील स्तोत्र',
    'category.praise.description': 'स्तुति गीते आणि कोरस',
    'category.worship.description': 'उपासना आणि भक्ती गीते'
  },
  te: {
    'app.title': 'గాస్పెల్ పాట సంకలనం',
    'app.description': 'బహుభాషా క్రైస్తవ భజనలు, కీర్తనలు మరియు ఆరాధన పాటలు',
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
    'toast.themeUpdated': 'థీమ్ నవీకరించబడింది',
    'category.hymns': 'స్తోత్రలు',
    'category.psalms': 'కీర్తనలు',
    'category.praise': 'స్తుతి',
    'category.worship': 'ఆరాధన',
    'category.hymns.description': 'సాంప్రదాయ క్రైస్తవ స్తోత్రలు',
    'category.psalms.description': 'సంగీతంతో బైబిల్ కీర్తనలు',
    'category.praise.description': 'స్తుతి పాటలు మరియు కోరస్',
    'category.worship.description': 'ఆరాధన మరియు భక్తి పాటలు'
  },
  kn: {
    'app.title': 'ಗಾಸ್ಪೆಲ್ ಹಾಡುಗಳ ಸಂಗ್ರಹ',
    'app.description': 'ಬಹುಭಾಷಾ ಕ್ರೈಸ್ತವ ಭಜನೆಗಳು, ಕೀರ್ತನೆಗಳು ಮತ್ತು ಆರಾಧನೆ ಹಾಡುಗಳು',
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
    'toast.themeUpdated': 'ಥೀಮ್ ನವೀಕರಿಸಲಾಗಿದೆ',
    'category.hymns': 'ಸ್ತೋತ್ರಗಳು',
    'category.psalms': 'ಕೀರ್ತನೆಗಳು',
    'category.praise': 'ಸ್ತುತಿ',
    'category.worship': 'ಆರಾಧನೆ',
    'category.hymns.description': 'ಸಾಂಪ್ರದಾಯಿಕ ಕ್ರೈಸ್ತವ ಸ್ತೋತ್ರಗಳು',
    'category.psalms.description': 'ಸಂಗೀತದೊಂದಿಗೆ ಬೈಬಲ್ ಕೀರ್ತನೆಗಳು',
    'category.praise.description': 'ಸ್ತುತಿ ಹಾಡುಗಳು ಮತ್ತು ಕೋರಸ್',
    'category.worship.description': 'ಆರಾಧನೆ ಮತ್ತು ಭಕ್ತಿ ಹಾಡುಗಳು'
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