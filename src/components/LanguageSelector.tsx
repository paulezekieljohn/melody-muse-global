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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 relative">
            {showBackButton && onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="sm:absolute sm:left-0 order-first sm:order-none">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <div className="flex items-center gap-3">
              <Globe className="h-8 sm:h-10 w-8 sm:w-10 text-primary" />
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Select Language
              </h1>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground">Choose your preferred language for songs</p>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-2 sm:px-0">
          {/* All Languages Option */}
          <Card 
            className="cursor-pointer card-gradient hover:shadow-glow transition-all duration-300 hover:scale-105 hover-lift border-0 overflow-hidden group"
            onClick={() => onLanguageSelect('all')}
          >
            <CardContent className="p-6 text-center relative">
              <div className="text-5xl mb-4 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">🌍</div>
              <h3 className="text-xl font-bold mb-2 text-white">All Languages</h3>
              <p className="text-white/80 text-sm">View songs in all languages</p>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </CardContent>
          </Card>

          {/* Individual Language Cards */}
          {languages.map((language, index) => {
            const gradients = [
              'bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-pink-500/20',
              'bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20',
              'bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20',
              'bg-gradient-to-br from-orange-500/20 via-red-500/20 to-pink-500/20',
              'bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20',
              'bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20'
            ];
            const gradientClass = gradients[index % gradients.length];
            
            return (
              <Card 
                key={language.code}
                className={`cursor-pointer card-music hover:shadow-glow transition-all duration-300 hover:scale-105 hover-lift border-0 overflow-hidden group ${gradientClass}`}
                onClick={() => onLanguageSelect(language.code)}
              >
                <CardContent className="p-6 text-center relative">
                  <div className="text-5xl mb-4 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{language.flag}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{language.name}</h3>
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30 hover:bg-white/30">
                    {language.code.toUpperCase()}
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};