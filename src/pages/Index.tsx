import { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Song, LanguageCode } from '@/types/song';
import { SongCard } from '@/components/SongCard';
import { SongViewer } from '@/components/SongViewer';  
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Music, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [primaryLanguage, setPrimaryLanguage] = useState<LanguageCode | 'all' | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  // Load songs from database
  useEffect(() => {
    const loadSongs = async () => {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading songs:', error);
      } else {
        // Transform database data to match Song type
        const transformedSongs: Song[] = data.map(song => ({
          id: song.id,
          title: song.title,
          artist: song.artist,
          language: song.language as LanguageCode,
          genre: song.genre || undefined,
          key: song.key || undefined,
          tempo: song.tempo || undefined,
          difficulty: song.difficulty as Song['difficulty'] || undefined,
          collections: song.collections || [],
          tags: song.tags || [],
          lyrics: song.lyrics || '',
          chords: song.chords || '',
          languageVersions: song.language_versions && typeof song.language_versions === 'string'
            ? JSON.parse(song.language_versions)
            : undefined,
        }));
        setSongs(transformedSongs);
      }
      setLoading(false);
    };

    loadSongs();
  }, []);

  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      const matchesSearch = searchTerm === '' || 
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.lyrics.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrimaryLanguage = primaryLanguage === 'all' || primaryLanguage === null || song.language === primaryLanguage;
      const matchesLanguage = selectedLanguage === 'all' || song.language === selectedLanguage;
      const matchesCollection = selectedCollection === 'all' || song.collections.includes(selectedCollection);
      const matchesDifficulty = selectedDifficulty === 'all' || song.difficulty === selectedDifficulty;

      return matchesSearch && matchesPrimaryLanguage && matchesLanguage && matchesCollection && matchesDifficulty;
    });
  }, [searchTerm, primaryLanguage, selectedLanguage, selectedCollection, selectedDifficulty]);

  const hasActiveFilters = searchTerm !== '' || selectedLanguage !== 'all' || 
                          selectedCollection !== 'all' || selectedDifficulty !== 'all';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('all');
    setSelectedCollection('all');
    setSelectedDifficulty('all');
  };

  const handleLanguageSelect = (language: LanguageCode | 'all') => {
    setPrimaryLanguage(language);
    setSelectedLanguage('all'); // Reset secondary filter
  };

  // Show language selector if no primary language is selected
  if (primaryLanguage === null) {
    return (
      <LanguageSelector
        onLanguageSelect={handleLanguageSelect}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 relative">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setPrimaryLanguage(null)}
              className="sm:absolute sm:left-0 order-first sm:order-none"
            >
              <Music className="h-4 w-4 mr-2" />
              Change Language
            </Button>
            <div className="flex items-center gap-3">
              <Music className="h-8 sm:h-10 w-8 sm:w-10 text-primary" />
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Melody Muse
              </h1>
            </div>
            <Link to="/admin" className="sm:absolute sm:right-0 order-last sm:order-none">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground">Your personal songbook collection</p>
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
            {loading ? 'Loading songs...' : `Showing ${filteredSongs.length} of ${songs.length} songs`}
          </p>
        </div>

        {/* Song Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading songs...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
          </>
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
