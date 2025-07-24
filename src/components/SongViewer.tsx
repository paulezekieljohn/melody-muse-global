import { Song } from '@/types/song';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Music, User, Key, Clock, Volume2 } from 'lucide-react';

interface SongViewerProps {
  song: Song | null;
  open: boolean;
  onClose: () => void;
}

export const SongViewer = ({ song, open, onClose }: SongViewerProps) => {
  if (!song) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Music className="h-6 w-6 text-primary" />
            {song.title}
          </DialogTitle>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            {song.artist}
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Song Info */}
          <div className="flex flex-wrap gap-2">
            {song.collections.map(collection => (
              <Badge key={collection} variant="secondary">
                {collection}
              </Badge>
            ))}
            {song.difficulty && (
              <Badge 
                variant={song.difficulty === 'beginner' ? 'default' : 
                        song.difficulty === 'intermediate' ? 'secondary' : 'destructive'}
              >
                {song.difficulty}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {song.key && (
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-muted-foreground" />
                <span>Key: {song.key}</span>
              </div>
            )}
            {song.tempo && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{song.tempo} BPM</span>
              </div>
            )}
            {song.genre && (
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <span>{song.genre}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-2xl">{song.language === 'en' ? '🇺🇸' : song.language === 'es' ? '🇪🇸' : '🇫🇷'}</span>
              <span>{song.language.toUpperCase()}</span>
            </div>
          </div>

          <Separator />

          <ScrollArea className="h-[400px] pr-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Lyrics */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-primary">Lyrics</h3>
                <div className="whitespace-pre-line text-foreground leading-relaxed font-mono text-sm">
                  {song.lyrics}
                </div>
              </div>

              {/* Chords */}
              {song.chords && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-primary">Chords</h3>
                  <div className="whitespace-pre-line text-foreground leading-relaxed font-mono text-sm bg-muted/50 p-4 rounded-lg">
                    {song.chords}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};