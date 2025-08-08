import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Song, SongCategory, LanguageCode } from '@/types/song';
import { categories } from '@/data/categories';
import { languages } from '@/data/gospelSongs';

interface SongListProps {
  category: SongCategory;
  language: LanguageCode;
  songs: Song[];
  onBack: () => void;
  onSongSelect: (song: Song) => void;
}

export const SongList = ({ category, language, songs, onBack, onSongSelect }: SongListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const categoryData = categories.find(c => c.id === category);
  const languageData = languages.find(l => l.code === language);
  
  const filteredSongs = songs.filter(song => 
    song.category === category && 
    song.language === language &&
    (searchTerm === '' || 
     song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
     song.lyrics.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center gap-3">
          <span className="text-2xl">{categoryData?.icon}</span>
          <h1 className="text-2xl font-bold">{categoryData?.name}</h1>
          <span className="text-xl">{languageData?.flag}</span>
          <span className="text-xl font-semibold">{languageData?.name}</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Song Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredSongs.length} of {songs.filter(s => s.category === category && s.language === language).length} songs
        </p>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSongs.map((song) => (
          <Card 
            key={song.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/50"
            onClick={() => onSongSelect(song)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg leading-tight">{song.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {song.key && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Key: {song.key}</Badge>
                  {song.tempo && (
                    <Badge variant="outline" className="text-xs">Tempo: {song.tempo}</Badge>
                  )}
                </div>
              )}
              {song.difficulty && (
                <Badge 
                  variant={song.difficulty === 'beginner' ? 'default' : song.difficulty === 'intermediate' ? 'secondary' : 'destructive'}
                  className="text-xs"
                >
                  {song.difficulty}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredSongs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-2">No songs found</p>
          <p className="text-muted-foreground">Try adjusting your search term</p>
        </div>
      )}
    </div>
  );
};