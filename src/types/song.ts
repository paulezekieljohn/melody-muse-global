export interface SongLanguageVersion {
  title: string;
  artist: string;
  lyrics: string;
  chords?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
  chords?: string;
  key?: string;
  tempo?: number;
  genre?: string;
  language: LanguageCode;
  category: SongCategory;
  collections: string[];
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  languageVersions?: {
    [languageCode: string]: SongLanguageVersion;
  };
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  songIds: string[];
  color: string;
}

export type SongCategory = 'hymns' | 'psalms' | 'praise' | 'worship';
export type LanguageCode = 'hi' | 'en' | 'te' | 'mr' | 'kn';

export interface CategoryData {
  id: SongCategory;
  name: string;
  description: string;
  icon: string;
}

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}