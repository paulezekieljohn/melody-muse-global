import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageCards } from './LanguageCards';
import { SongCategory, LanguageCode } from '@/types/song';
import { categories } from '@/data/categories';
import { gospelSongs } from '@/data/gospelSongs';

interface CategoryTabsProps {
  onLanguageSelect: (category: SongCategory, language: LanguageCode) => void;
}

export const CategoryTabs = ({ onLanguageSelect }: CategoryTabsProps) => {
  const [activeCategory, setActiveCategory] = useState<SongCategory>('hymns');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as SongCategory)}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <span className="text-3xl">{category.icon}</span>
                {category.name}
              </h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
            
            <LanguageCards 
              category={category.id}
              onLanguageSelect={(language) => onLanguageSelect(category.id, language)}
              songs={gospelSongs}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};