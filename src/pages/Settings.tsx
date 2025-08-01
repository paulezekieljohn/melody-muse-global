import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Settings as SettingsIcon, Sun, Moon, Globe, ArrowLeft, Palette } from 'lucide-react';
import { languages } from '@/data/songs';
import { LanguageCode } from '@/types/song';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [appLanguage, setAppLanguage] = useState<LanguageCode>('en');

  useEffect(() => {
    setMounted(true);
    // Load saved app language from localStorage
    const savedLanguage = localStorage.getItem('appLanguage') as LanguageCode;
    if (savedLanguage && languages.find(l => l.code === savedLanguage)) {
      setAppLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode: LanguageCode) => {
    setAppLanguage(languageCode);
    localStorage.setItem('appLanguage', languageCode);
    toast({
      title: "Language Updated",
      description: `App language changed to ${languages.find(l => l.code === languageCode)?.name}`,
    });
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast({
      title: "Theme Updated",
      description: `Switched to ${newTheme} mode`,
    });
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Songs
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Theme Settings */}
          <Card className="card-gradient border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="dark-mode" className="text-base font-medium text-white">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-white/80">
                    Switch between light and dark themes
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Sun className="h-4 w-4 text-white/60" />
                  <Switch
                    id="dark-mode"
                    checked={theme === 'dark'}
                    onCheckedChange={handleThemeToggle}
                  />
                  <Moon className="h-4 w-4 text-white/60" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card className="card-music border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="h-5 w-5" />
                App Language
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-base font-medium text-white">
                    Choose your preferred language for the app interface
                  </Label>
                  <p className="text-sm text-white/80 mt-1">
                    This changes the language of menus, buttons, and interface text
                  </p>
                </div>
                <Separator className="bg-white/20" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {languages.map((language) => (
                    <Button
                      key={language.code}
                      variant={appLanguage === language.code ? "default" : "outline"}
                      className={`p-4 h-auto flex items-center gap-3 justify-start ${
                        appLanguage === language.code 
                          ? 'bg-white/20 text-white border-white/40 hover:bg-white/30' 
                          : 'bg-white/5 text-white border-white/20 hover:bg-white/10'
                      }`}
                      onClick={() => handleLanguageChange(language.code)}
                    >
                      <span className="text-2xl">{language.flag}</span>
                      <div className="text-left">
                        <div className="font-medium">{language.name}</div>
                        <div className="text-xs opacity-80 uppercase">
                          {language.code}
                        </div>
                      </div>
                      {appLanguage === language.code && (
                        <Badge variant="secondary" className="ml-auto bg-white/30 text-white border-0">
                          Active
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-primary">Melody Muse</h3>
                <p className="text-sm text-muted-foreground">
                  Your personal songbook collection for Indian music
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <Badge variant="outline" className="text-xs">
                    Version 1.0.0
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Made in India 🇮🇳
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;