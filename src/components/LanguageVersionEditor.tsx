import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Plus, Languages, FileText, Globe, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { languages } from '@/data/songs';
import { SongLanguageVersion, LanguageCode } from '@/types/song';
import { DocumentScanner } from '@/components/DocumentScanner';

interface LanguageVersionEditorProps {
  languageVersions: { [key: string]: SongLanguageVersion };
  onVersionsChange: (versions: { [key: string]: SongLanguageVersion }) => void;
  excludeLanguages?: LanguageCode[];
  currentSong?: {
    title: string;
    artist: string;
    lyrics: string;
    language: LanguageCode;
  };
}

export const LanguageVersionEditor = ({ 
  languageVersions, 
  onVersionsChange, 
  excludeLanguages = [],
  currentSong
}: LanguageVersionEditorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | ''>('');
  const [editingVersion, setEditingVersion] = useState<SongLanguageVersion>({
    title: '',
    artist: '',
    lyrics: '',
    chords: '',
  });
  const [showScanner, setShowScanner] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedTranslateLanguages, setSelectedTranslateLanguages] = useState<LanguageCode[]>([]);
  const { toast } = useToast();

  const availableLanguages = languages.filter(
    lang => !excludeLanguages.includes(lang.code) && !languageVersions[lang.code]
  );

  const addLanguageVersion = () => {
    if (!selectedLanguage || !editingVersion.title || !editingVersion.lyrics) {
      toast({
        title: "Missing information",
        description: "Please fill in language, title, and lyrics.",
        variant: "destructive",
      });
      return;
    }

    const updatedVersions = {
      ...languageVersions,
      [selectedLanguage]: editingVersion,
    };

    onVersionsChange(updatedVersions);
    
    // Reset form
    setSelectedLanguage('');
    setEditingVersion({
      title: '',
      artist: '',
      lyrics: '',
      chords: '',
    });

    toast({
      title: "Language version added",
      description: `Added ${languages.find(l => l.code === selectedLanguage)?.name} version.`,
    });
  };

  const removeLanguageVersion = (langCode: string) => {
    const updatedVersions = { ...languageVersions };
    delete updatedVersions[langCode];
    onVersionsChange(updatedVersions);

    toast({
      title: "Language version removed",
      description: `Removed ${languages.find(l => l.code === langCode)?.name} version.`,
    });
  };

  const translateText = async (text: string, targetLang: LanguageCode): Promise<string> => {
    // Simple translation API call using Google Translate API
    // For demo purposes, this is a placeholder implementation
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
      const data = await response.json();
      return data.responseData?.translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text if translation fails
    }
  };

  const handleBulkTranslate = async () => {
    if (!currentSong || selectedTranslateLanguages.length === 0) {
      toast({
        title: "Missing information",
        description: "Please select languages to translate to.",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    const newVersions = { ...languageVersions };

    try {
      for (const targetLang of selectedTranslateLanguages) {
        if (newVersions[targetLang]) continue; // Skip if version already exists

        const translatedTitle = await translateText(currentSong.title, targetLang);
        const translatedLyrics = await translateText(currentSong.lyrics, targetLang);
        
        newVersions[targetLang] = {
          title: translatedTitle,
          artist: currentSong.artist,
          lyrics: translatedLyrics,
          chords: '', // Chords typically don't need translation
        };
      }

      onVersionsChange(newVersions);
      setSelectedTranslateLanguages([]);

      toast({
        title: "Translation completed",
        description: `Translated song to ${selectedTranslateLanguages.length} language(s).`,
      });
    } catch (error) {
      toast({
        title: "Translation failed",
        description: "There was an error translating the song. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTextExtracted = (text: string) => {
    setEditingVersion(prev => ({ ...prev, lyrics: text }));
  };

  const availableTranslateLanguages = languages.filter(
    lang => !excludeLanguages.includes(lang.code) && 
             !languageVersions[lang.code] && 
             lang.code !== currentSong?.language
  );

  return (
    <div className="space-y-4">
      {/* Bulk Translation Section */}
      {currentSong && availableTranslateLanguages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Auto Translate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Select languages to translate to:
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTranslateLanguages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedTranslateLanguages.includes(lang.code) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedTranslateLanguages(prev =>
                        prev.includes(lang.code)
                          ? prev.filter(code => code !== lang.code)
                          : [...prev, lang.code]
                      );
                    }}
                  >
                    {lang.flag} {lang.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {selectedTranslateLanguages.length > 0 && (
              <Button 
                onClick={handleBulkTranslate} 
                disabled={isTranslating}
                className="w-full"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Translate to {selectedTranslateLanguages.length} Language(s)
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Existing Language Versions */}
      {Object.keys(languageVersions).length > 0 && (
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Language Versions
          </h4>
          <div className="space-y-2">
            {Object.entries(languageVersions).map(([langCode, version]) => {
              const language = languages.find(l => l.code === langCode);
              return (
                <div key={langCode} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">
                      {language?.flag} {language?.name}
                    </Badge>
                    <div>
                      <p className="font-medium">{version.title}</p>
                      <p className="text-sm text-muted-foreground">{version.artist}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeLanguageVersion(langCode)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add New Language Version */}
      {availableLanguages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Language Version
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as LanguageCode | '')}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map(language => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.flag} {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedLanguage && (
              <>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Title *</label>
                    <Input
                      placeholder="Song title in selected language"
                      value={editingVersion.title}
                      onChange={(e) => setEditingVersion(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Artist</label>
                    <Input
                      placeholder="Artist name"
                      value={editingVersion.artist}
                      onChange={(e) => setEditingVersion(prev => ({ ...prev, artist: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium">Lyrics *</label>
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
                  <Textarea
                    placeholder="Enter lyrics in selected language..."
                    className="min-h-[120px]"
                    value={editingVersion.lyrics}
                    onChange={(e) => setEditingVersion(prev => ({ ...prev, lyrics: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Chords</label>
                  <Textarea
                    placeholder="Enter chord progression..."
                    className="min-h-[80px]"
                    value={editingVersion.chords}
                    onChange={(e) => setEditingVersion(prev => ({ ...prev, chords: e.target.value }))}
                  />
                </div>

                <Button onClick={addLanguageVersion} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add This Version
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Document Scanner Modal */}
      {showScanner && (
        <DocumentScanner
          onTextExtracted={handleTextExtracted}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};
