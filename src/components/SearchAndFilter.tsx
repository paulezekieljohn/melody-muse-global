import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { collections, languages } from '@/data/songs';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  selectedCollection: string;
  onCollectionChange: (value: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  selectedLanguage,
  onLanguageChange,
  selectedCollection,
  onCollectionChange,
  selectedDifficulty,
  onDifficultyChange,
  onClearFilters,
  hasActiveFilters
}: SearchAndFilterProps) => {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search songs by title, artist, or lyrics..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {languages.map(lang => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCollection} onValueChange={onCollectionChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Collections</SelectItem>
            {collections.map(collection => (
              <SelectItem key={collection.id} value={collection.id}>
                {collection.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedLanguage !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Language: {languages.find(l => l.code === selectedLanguage)?.name}
            </Badge>
          )}
          {selectedCollection !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Collection: {collections.find(c => c.id === selectedCollection)?.name}
            </Badge>
          )}
          {selectedDifficulty !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Difficulty: {selectedDifficulty}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};