import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Song, SongCategory, LanguageCode } from '@/types/song';
import { languages } from '@/data/gospelSongs';

interface LanguageCardsProps {
  category: SongCategory;
  onLanguageSelect: (language: LanguageCode) => void;
  songs: Song[];
}

export const LanguageCards = ({ category, onLanguageSelect, songs }: LanguageCardsProps) => {
  // Get songs count for each language in this category
  const getLanguageStats = (languageCode: LanguageCode) => {
    return songs.filter(song => song.language === languageCode && song.category === category).length;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {languages.map((language) => {
        const songCount = getLanguageStats(language.code);
        
        return (
          <Card 
            key={language.code}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/50"
            onClick={() => onLanguageSelect(language.code)}
          >
            <CardHeader className="text-center pb-2">
              <CardTitle className="flex flex-col items-center gap-2">
                <span className="text-4xl">{language.flag}</span>
                <span className="text-lg">{language.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Badge variant="secondary" className="text-sm">
                {songCount} songs
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};