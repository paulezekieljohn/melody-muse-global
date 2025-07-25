import { useState, useMemo } from 'react';
import { songs } from '@/data/songs';
import { Song } from '@/types/song';
import { SongCard } from '@/components/SongCard';
import { SongViewer } from '@/components/SongViewer';  
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { Music, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      const matchesSearch = searchTerm === '' || 
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.lyrics.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLanguage = selectedLanguage === 'all' || song.language === selectedLanguage;
      const matchesCollection = selectedCollection === 'all' || song.collections.includes(selectedCollection);
      const matchesDifficulty = selectedDifficulty === 'all' || song.difficulty === selectedDifficulty;

      return matchesSearch && matchesLanguage && matchesCollection && matchesDifficulty;
    });
  }, [searchTerm, selectedLanguage, selectedCollection, selectedDifficulty]);

  const hasActiveFilters = searchTerm !== '' || selectedLanguage !== 'all' || 
                          selectedCollection !== 'all' || selectedDifficulty !== 'all';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('all');
    setSelectedCollection('all');
    setSelectedDifficulty('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4 relative">
            <Music className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Melody Muse
            </h1>
            <Link to="/admin" className="absolute right-0">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
          <p className="text-xl text-muted-foreground">Your personal songbook collection</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            selectedCollection={selectedCollection}
            onCollectionChange={setSelectedCollection}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredSongs.length} of {songs.length} songs
          </p>
        </div>

        {/* Song Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map(song => (
            <SongCard
              key={song.id}
              song={song}
              onClick={() => setSelectedSong(song)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredSongs.length === 0 && (
          <div className="text-center py-12">
            <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground mb-2">No songs found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Song Viewer Modal */}
        <SongViewer
          song={selectedSong}
          open={!!selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      </div>
    </div>
  );
};

export default Index;
