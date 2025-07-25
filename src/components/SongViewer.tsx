import { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Music, Clock, Key, Gauge, Languages } from 'lucide-react';
import { Song, SongLanguageVersion, LanguageCode } from '@/types/song';
import { collections, languages } from '@/data/songs';

interface SongViewerProps {
  song: Song | null;
  open: boolean;
  onClose: () => void;
}

export const SongViewer = ({ song, open, onClose }: SongViewerProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | ''>('');

  // Get available languages for the song
  const availableLanguages = useMemo(() => {
    if (!song) return [];
    
    const langs: LanguageCode[] = [song.language];
    if (song.languageVersions) {
      langs.push(...(Object.keys(song.languageVersions) as LanguageCode[]));
    }
    return [...new Set(langs)];
  }, [song]);

  // Get current song data based on selected language
  const currentSongData = useMemo((): Song | SongLanguageVersion | null => {
    if (!song) return null;
    
    if (!selectedLanguage || selectedLanguage === song.language) {
      return song;
    }
    
    return song.languageVersions?.[selectedLanguage] || song;
  }, [song, selectedLanguage]);

  // Reset selected language when song changes
  useEffect(() => {
    if (song) {
      setSelectedLanguage(song.language);
    }
  }, [song]);

  if (!song || !currentSongData) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Music className="h-6 w-6 text-primary" />
            {currentSongData.title}
          </DialogTitle>
          <p className="text-lg text-muted-foreground">{currentSongData.artist}</p>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-6 p-1">
            {/* Language Selector */}
            {availableLanguages.length > 1 && (
              <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Language:</span>
                <div className="flex gap-2">
                  {availableLanguages.map(langCode => {
                    const language = languages.find(l => l.code === langCode);
                    return (
                      <Button
                        key={langCode}
                        variant={selectedLanguage === langCode ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedLanguage(langCode)}
                      >
                        {language?.flag} {language?.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Song Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {song.key && (
                <div className="flex items-center gap-2 text-sm">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Key:</span>
                  <span>{song.key}</span>
                </div>
              )}
              {song.tempo && (
                <div className="flex items-center gap-2 text-sm">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Tempo:</span>
                  <span>{song.tempo} BPM</span>
                </div>
              )}
              {song.difficulty && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Level:</span>
                  <Badge variant="secondary" className="capitalize">
                    {song.difficulty}
                  </Badge>
                </div>
              )}
              {song.genre && (
                <div className="flex items-center gap-2 text-sm">
                  <Music className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Genre:</span>
                  <span>{song.genre}</span>
                </div>
              )}
            </div>

            {/* Collections and Tags */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {song.collections.map(collectionId => {
                  const collection = collections.find(c => c.id === collectionId);
                  return (
                    <Badge key={collectionId} variant="outline">
                      {collection?.name || collectionId}
                    </Badge>
                  );
                })}
              </div>
              {song.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {song.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Lyrics */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Lyrics</h3>
              <div className="bg-muted/30 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                  {currentSongData.lyrics}
                </pre>
              </div>
            </div>

            {/* Chords */}
            {currentSongData.chords && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Chords</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                    {currentSongData.chords}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};