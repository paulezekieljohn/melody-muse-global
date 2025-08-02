import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Settings, ArrowLeft, FileText, Lock, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { collections } from '@/data/songs';
import { DocumentScanner } from '@/components/DocumentScanner';
import { LanguageVersionEditor } from '@/components/LanguageVersionEditor';
import { SongLanguageVersion } from '@/types/song';
import { supabase } from '@/integrations/supabase/client';

const songSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  lyrics: z.string().min(1, 'Lyrics are required'),
  chords: z.string().optional(),
  key: z.string().optional(),
  tempo: z.number().min(1).max(300).optional(),
  genre: z.string().optional(),
  language: z.enum(['hi', 'en', 'te', 'mr', 'kn'] as const),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
});

type SongFormData = z.infer<typeof songSchema>;

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [languageVersions, setLanguageVersions] = useState<{ [key: string]: SongLanguageVersion }>({});
  const [existingSongs, setExistingSongs] = useState<any[]>([]);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const { toast } = useToast();

  // Move useForm to top to avoid hooks order issues
  const form = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      title: '',
      artist: '',
      lyrics: '',
      chords: '',
      key: '',
      genre: '',
      language: 'en',
    },
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      setAuthError('Invalid password');
      setPassword('');
    }
  };

  useEffect(() => {
    // Check if user was previously authenticated
    const wasAuthenticated = localStorage.getItem('adminAuthenticated');
    if (wasAuthenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadExistingSongs();
    }
  }, [isAuthenticated]);

  const loadExistingSongs = async () => {
    setLoadingSongs(true);
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading songs:', error);
        toast({
          title: "Error",
          description: "Failed to load existing songs.",
          variant: "destructive",
        });
      } else {
        setExistingSongs(data || []);
      }
    } catch (error) {
      console.error('Error loading songs:', error);
    } finally {
      setLoadingSongs(false);
    }
  };

  const deleteSong = async (songId: string, title: string) => {
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
        console.error('Error deleting song:', error);
      } else {
        toast({
          title: "Song Deleted",
          description: `"${title}" has been deleted from the songbook.`,
        });
        // Reload the songs list
        loadExistingSongs();
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      toast({
        title: "Error",
        description: "Failed to delete song. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setPassword('');
  };

  // Show password form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Admin Access</CardTitle>
            </div>
            <p className="text-muted-foreground">Enter password to access admin panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={authError ? 'border-destructive' : ''}
                />
                {authError && (
                  <p className="text-destructive text-sm mt-1">{authError}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                Access Admin Panel
              </Button>
              <div className="text-center">
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Songs
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleCollection = (collectionId: string) => {
    setSelectedCollections(prev => 
      prev.includes(collectionId)
        ? prev.filter(id => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  const onSubmit = async (data: SongFormData) => {
    try {
      const { data: insertData, error } = await supabase
        .from('songs')
        .insert({
          title: data.title,
          artist: data.artist,
          language: data.language,
          genre: data.genre || null,
          key: data.key || null,
          tempo: data.tempo || null,
          difficulty: data.difficulty || null,
          collections: selectedCollections,
          tags,
          lyrics: data.lyrics || '',
          chords: data.chords || '',
          language_versions: Object.keys(languageVersions).length > 0 ? languageVersions as any : null,
        })
        .select();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add song. Please try again.",
          variant: "destructive",
        });
        console.error('Error adding song:', error);
        return;
      }

      toast({
        title: "Song Added",
        description: `"${data.title}" has been added to the songbook.`,
      });

      // Reset form
      form.reset();
      setSelectedCollections([]);
      setTags([]);
      setLanguageVersions({});
      // Reload songs to show the new one
      loadExistingSongs();
    } catch (error) {
      console.error('Error adding song:', error);
      toast({
        title: "Error",
        description: "Failed to add song. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTextExtracted = (text: string) => {
    form.setValue('lyrics', text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 relative">
            <Link to="/" className="sm:absolute sm:left-0 order-first sm:order-none">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Songs
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Settings className="h-8 sm:h-10 w-8 sm:w-10 text-primary" />
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="sm:absolute sm:right-0 order-last sm:order-none">
              <Lock className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground">Add and manage your song collection</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Song
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Song title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="artist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Artist *</FormLabel>
                        <FormControl>
                          <Input placeholder="Artist name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Musical Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key</FormLabel>
                        <FormControl>
                          <Input placeholder="C, G, Am..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tempo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempo (BPM)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="120" 
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hi">🇮🇳 हिंदी</SelectItem>
                            <SelectItem value="en">🇮🇳 English</SelectItem>
                            <SelectItem value="te">🇮🇳 తెలుగు</SelectItem>
                            <SelectItem value="mr">🇮🇳 मराठी</SelectItem>
                            <SelectItem value="kn">🇮🇳 ಕನ್ನಡ</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Input placeholder="Contemporary, Hymn, Gospel..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Collections */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Collections</label>
                  <div className="flex flex-wrap gap-2">
                    {collections.map(collection => (
                      <Badge
                        key={collection.id}
                        variant={selectedCollections.includes(collection.id) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleCollection(collection.id)}
                      >
                        {collection.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <FormField
                  control={form.control}
                  name="lyrics"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Lyrics *</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowScanner(true)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Scan Document
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter song lyrics or scan from a document..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chords</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter chord progression..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Song
                </Button>
              </form>
            </Form>

            {/* Language Versions Section */}
            <div className="mt-8 pt-6 border-t">
              <LanguageVersionEditor
                languageVersions={languageVersions}
                onVersionsChange={setLanguageVersions}
                excludeLanguages={[form.watch('language')].filter(Boolean)}
                currentSong={{
                  title: form.watch('title'),
                  artist: form.watch('artist'),
                  lyrics: form.watch('lyrics'),
                  language: form.watch('language')
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Existing Songs Management */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Manage Existing Songs ({existingSongs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSongs ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading songs...</p>
              </div>
            ) : existingSongs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No songs added yet. Add your first song above!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {existingSongs.map((song) => (
                  <div key={song.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{song.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {song.artist} • {song.language} • {song.genre || 'No genre'}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {song.collections?.map((collection: string) => (
                          <Badge key={collection} variant="outline" className="text-xs">
                            {collections.find(c => c.id === collection)?.name || collection}
                          </Badge>
                        ))}
                        {song.tags?.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteSong(song.id, song.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Document Scanner Modal */}
        {showScanner && (
          <DocumentScanner
            onTextExtracted={handleTextExtracted}
            onClose={() => setShowScanner(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;