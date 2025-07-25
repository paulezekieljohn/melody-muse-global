export interface Song {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
  chords?: string;
  key?: string;
  tempo?: number;
  genre?: string;
  language: 'en' | 'es' | 'fr' | 'hi' | 'ta' | 'te';
  collections: string[];
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  songIds: string[];
  color: string;
}

export interface Language {
  code: 'en' | 'es' | 'fr' | 'hi' | 'ta' | 'te';
  name: string;
  flag: string;
}