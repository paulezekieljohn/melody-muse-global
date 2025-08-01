import { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Music, Clock, Key, Gauge, Languages, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Song, SongLanguageVersion, LanguageCode } from '@/types/song';
import { collections, languages } from '@/data/songs';

interface SongViewerProps {
  song: Song | null;
  open: boolean;
  onClose: () => void;
}

export const SongViewer = ({ song, open, onClose }: SongViewerProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | ''>('');
  const [lyricsZoom, setLyricsZoom] = useState(100); // Zoom percentage

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

  // Reset selected language and zoom when song changes
  useEffect(() => {
    if (song) {
      setSelectedLanguage(song.language);
      setLyricsZoom(100);
    }
  }, [song]);

  const handleZoomIn = () => {
    setLyricsZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setLyricsZoom(prev => Math.max(prev - 10, 50));
  };

  const resetZoom = () => {
    setLyricsZoom(100);
  };

  if (!song || !currentSongData) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-[95vw] sm:w-full">
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Language:</span>
                </div>
                <div className="flex flex-wrap gap-2">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Lyrics</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={lyricsZoom <= 50}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetZoom}
                    disabled={lyricsZoom === 100}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={lyricsZoom >= 200}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-[3rem]">
                    {lyricsZoom}%
                  </span>
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <pre 
                  className="whitespace-pre-wrap leading-relaxed font-mono"
                  style={{ 
                    fontSize: `${lyricsZoom}%`,
                    lineHeight: lyricsZoom > 120 ? '1.4' : '1.6'
                  }}
                >
                  {currentSongData.lyrics}
                </pre>
              </div>
            </div>

            {/* Chords */}
            {currentSongData.chords && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Chords</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <pre 
                    className="whitespace-pre-wrap leading-relaxed font-mono"
                    style={{ 
                      fontSize: `${Math.max(lyricsZoom * 0.9, 80)}%`,
                      lineHeight: '1.6'
                    }}
                  >
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