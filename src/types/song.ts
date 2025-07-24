export interface Song {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
  chords?: string;
  key?: string;
  tempo?: number;
  genre?: string;
  language: 'en' | 'es' | 'fr';
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
  code: 'en' | 'es' | 'fr';
  name: string;
  flag: string;
}