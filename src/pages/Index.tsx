import { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Song, LanguageCode } from '@/types/song';
import { SongCard } from '@/components/SongCard';
import { SongViewer } from '@/components/SongViewer';  
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Music, Settings, Plus, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
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
  
  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [showAddSong, setShowAddSong] = useState(false);
  const { toast } = useToast();
  
  const ADMIN_PASSWORD = 'admin123';

  // Load songs from database
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

  useEffect(() => {
    loadSongs();
    // Check if user was previously authenticated as admin
    const wasAdminAuth = localStorage.getItem('adminAuthenticated');
    if (wasAdminAuth === 'true') {
      setIsAdmin(true);
    }
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

  // Admin functions
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminError('');
      setAdminPassword('');
      localStorage.setItem('adminAuthenticated', 'true');
      toast({
        title: "Admin Access Granted",
        description: "You can now manage songs directly from this page.",
      });
    } else {
      setAdminError('Invalid password');
      setAdminPassword('');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setShowAdminLogin(false);
    setAdminPassword('');
    setAdminError('');
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Admin Logged Out",
      description: "Admin controls have been disabled.",
    });
  };

  const handleDeleteSong = async (songId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('songs')
        .delete()
        .eq('id', songId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete song. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Song Deleted",
          description: `"${title}" has been deleted successfully.`,
        });
        // Reload songs
        loadSongs();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete song. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Show language selector if no primary language is selected
  if (primaryLanguage === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <LanguageSelector onLanguageSelect={handleLanguageSelect} />
        
        {/* Admin Login Option */}
        {!isAdmin && (
          <div className="fixed bottom-4 right-4">
            <Button
              onClick={() => setShowAdminLogin(true)}
              variant="outline"
              size="sm"
              className="shadow-lg"
            >
              <Lock className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </div>
        )}

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Lock className="h-5 w-5" />
                  Admin Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className={adminError ? 'border-destructive' : ''}
                  />
                  {adminError && (
                    <p className="text-destructive text-sm">{adminError}</p>
                  )}
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Login</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAdminLogin(false);
                        setAdminPassword('');
                        setAdminError('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
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
            
            {/* Admin Controls */}
            <div className="sm:absolute sm:right-0 order-last sm:order-none flex gap-2">
              {isAdmin ? (
                <>
                  <Link to="/admin">
                    <Button
                      variant="default"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Song
                    </Button>
                  </Link>
                  <Button
                    onClick={handleAdminLogout}
                    variant="outline"
                    size="sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setShowAdminLogin(true)}
                  variant="outline"
                  size="sm"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              )}
            </div>
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
                  isAdmin={isAdmin}
                  onDelete={handleDeleteSong}
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

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Lock className="h-5 w-5" />
                  Admin Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className={adminError ? 'border-destructive' : ''}
                  />
                  {adminError && (
                    <p className="text-destructive text-sm">{adminError}</p>
                  )}
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Login</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAdminLogin(false);
                        setAdminPassword('');
                        setAdminError('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
};

export default Index;
