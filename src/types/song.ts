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

export type LanguageCode = 'hi' | 'en' | 'ta' | 'te' | 'mr' | 'kn' | 'bn' | 'gu' | 'ml' | 'pa' | 'or' | 'as';

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}