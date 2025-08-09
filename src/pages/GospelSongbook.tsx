import { useState } from 'react';
import { Music, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryTabs } from '@/components/CategoryTabs';
import { SongList } from '@/components/SongList';
import { SongViewer } from '@/components/SongViewer';
import { Song, SongCategory, LanguageCode } from '@/types/song';
import { gospelSongs } from '@/data/gospelSongs';
import { Link } from 'react-router-dom';
import { useAppLanguage } from '@/contexts/AppLanguageContext';

type ViewState = 'categories' | 'songs' | 'viewer';

interface ViewData {
  category?: SongCategory;
  language?: LanguageCode;
  song?: Song;
}

const GospelSongbook = () => {
  const [viewState, setViewState] = useState<ViewState>('categories');
  const [viewData, setViewData] = useState<ViewData>({});
  const { getTranslation } = useAppLanguage();

  const handleLanguageSelect = (category: SongCategory, language: LanguageCode) => {
    setViewData({ category, language });
    setViewState('songs');
  };

  const handleSongSelect = (song: Song) => {
    setViewData(prev => ({ ...prev, song }));
    setViewState('viewer');
  };

  const handleBackToCategories = () => {
    setViewData({});
    setViewState('categories');
  };

  const handleBackToSongs = () => {
    setViewData(prev => ({ ...prev, song: undefined }));
    setViewState('songs');
  };

  const handleCloseSongViewer = () => {
    setViewState('songs');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 relative">
            <div className="flex items-center gap-3">
              <Music className="h-8 sm:h-10 w-8 sm:w-10 text-primary" />
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {getTranslation('app.title')}
              </h1>
            </div>
            
            {/* Settings and Admin */}
            <div className="sm:absolute sm:right-0 flex gap-2">
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  {getTranslation('nav.settings')}
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {getTranslation('app.description')}
          </p>
        </div>

        {/* Main Content */}
        {viewState === 'categories' && (
          <CategoryTabs onLanguageSelect={handleLanguageSelect} />
        )}

        {viewState === 'songs' && viewData.category && viewData.language && (
          <SongList
            category={viewData.category}
            language={viewData.language}
            songs={gospelSongs}
            onBack={handleBackToCategories}
            onSongSelect={handleSongSelect}
          />
        )}

        {/* Song Viewer Modal */}
        <SongViewer
          song={viewData.song || null}
          open={viewState === 'viewer'}
          onClose={handleCloseSongViewer}
        />
      </div>
    </div>
  );
};

export default GospelSongbook;