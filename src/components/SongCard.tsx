import { Song } from '@/types/song';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Music, Clock, Key, Trash2, Edit } from 'lucide-react';

interface SongCardProps {
  song: Song;
  onClick: () => void;
  isAdmin?: boolean;
  onDelete?: (songId: string, title: string) => void;
}

export const SongCard = ({ song, onClick, isAdmin = false, onDelete }: SongCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(song.id, song.title);
  };

  return (
    <Card 
      className="cursor-pointer card-music hover-lift glow-effect transition-all duration-300 border-2 relative group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
          <Music className="h-5 w-5 text-primary music-pulse" />
          {song.title}
        </CardTitle>
        <p className="text-muted-foreground font-medium">{song.artist}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {song.collections.map(collection => (
            <Badge key={collection} variant="secondary" className="text-xs">
              {collection}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {song.key && (
            <div className="flex items-center gap-1">
              <Key className="h-4 w-4" />
              {song.key}
            </div>
          )}
          {song.tempo && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {song.tempo} BPM
            </div>
          )}
          {song.difficulty && (
            <Badge 
              variant={song.difficulty === 'beginner' ? 'default' : 
                     song.difficulty === 'intermediate' ? 'secondary' : 'destructive'}
              className="text-xs"
            >
              {song.difficulty}
            </Badge>
          )}
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex gap-1 mt-3">
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDelete}
              className="flex-1 text-xs h-7"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};