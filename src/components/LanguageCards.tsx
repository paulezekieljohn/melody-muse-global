import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SongCategory, LanguageCode } from '@/types/song';
import { languages, gospelSongs } from '@/data/gospelSongs';

interface LanguageCardsProps {
  category: SongCategory;
  onLanguageSelect: (language: LanguageCode) => void;
}

export const LanguageCards = ({ category, onLanguageSelect }: LanguageCardsProps) => {
  // Get songs count for each language in this category
  const getLanguageStats = (languageCode: LanguageCode) => {
    return gospelSongs.filter(song => song.language === languageCode && song.category === category).length;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {languages.map((language) => {
        const songCount = getLanguageStats(language.code);
        
        return (
          <Card 
            key={language.code}
            className="cursor-pointer hover-lift glow-effect bg-gradient-to-br from-card via-card/95 to-primary/5 border-primary/20 hover:border-primary/60 backdrop-blur-sm"
            onClick={() => onLanguageSelect(language.code)}
          >
            <CardHeader className="text-center pb-3">
              <CardTitle className="flex flex-col items-center gap-3">
                <div className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                  {language.name}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Badge variant="secondary" className="text-sm bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
                {songCount} songs
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};