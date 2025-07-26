import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { languages } from '@/data/songs';
import { LanguageCode } from '@/types/song';
import { Globe, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LanguageSelectorProps {
  onLanguageSelect: (language: LanguageCode | 'all') => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const LanguageSelector = ({ 
  onLanguageSelect, 
  onBack, 
  showBackButton = false 
}: LanguageSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4 relative">
            {showBackButton && onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="absolute left-0">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <Globe className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Select Language
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">Choose your preferred language for songs</p>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* All Languages Option */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50"
            onClick={() => onLanguageSelect('all')}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold mb-2">All Languages</h3>
              <p className="text-muted-foreground text-sm">View songs in all languages</p>
            </CardContent>
          </Card>

          {/* Individual Language Cards */}
          {languages.map((language) => (
            <Card 
              key={language.code}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50"
              onClick={() => onLanguageSelect(language.code)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{language.flag}</div>
                <h3 className="text-xl font-semibold mb-2">{language.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {language.code.toUpperCase()}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};