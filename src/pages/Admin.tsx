import { useState } from 'react';
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
import { X, Plus, Settings, ArrowLeft, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { collections } from '@/data/songs';
import { DocumentScanner } from '@/components/DocumentScanner';
import { LanguageVersionEditor } from '@/components/LanguageVersionEditor';
import { SongLanguageVersion } from '@/types/song';

const songSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  lyrics: z.string().min(1, 'Lyrics are required'),
  chords: z.string().optional(),
  key: z.string().optional(),
  tempo: z.number().min(1).max(300).optional(),
  genre: z.string().optional(),
  language: z.enum(['en', 'es', 'fr', 'hi', 'ta', 'te'] as const),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
});

type SongFormData = z.infer<typeof songSchema>;

const Admin = () => {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [languageVersions, setLanguageVersions] = useState<{ [key: string]: SongLanguageVersion }>({});
  const { toast } = useToast();

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

  const onSubmit = (data: SongFormData) => {
    const newSong = {
      id: `${data.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      ...data,
      collections: selectedCollections,
      tags,
      ...(Object.keys(languageVersions).length > 0 && { languageVersions }),
    };

    // In a real app, this would save to a database
    console.log('New song:', newSong);
    
    toast({
      title: "Song Added",
      description: `"${data.title}" has been added to the songbook.`,
    });

    // Reset form
    form.reset();
    setSelectedCollections([]);
    setTags([]);
    setLanguageVersions({});
  };

  const handleTextExtracted = (text: string) => {
    form.setValue('lyrics', text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Songs
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
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
                            <SelectItem value="en">🇺🇸 English</SelectItem>
                            <SelectItem value="es">🇪🇸 Español</SelectItem>
                            <SelectItem value="fr">🇫🇷 Français</SelectItem>
                            <SelectItem value="hi">🇮🇳 हिंदी</SelectItem>
                            <SelectItem value="ta">🇮🇳 தமிழ்</SelectItem>
                            <SelectItem value="te">🇮🇳 తెలుగు</SelectItem>
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
              />
            </div>
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