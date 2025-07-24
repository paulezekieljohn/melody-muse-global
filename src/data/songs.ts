import { Song, Collection, Language } from '@/types/song';

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

export const collections: Collection[] = [
  {
    id: 'worship',
    name: 'Worship',
    description: 'Songs for worship and praise',
    songIds: ['amazing-grace', 'how-great'],
    color: 'hsl(280, 65%, 60%)'
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    description: 'Modern Christian songs',
    songIds: ['awesome-god', 'cornerstone'],
    color: 'hsl(200, 70%, 50%)'
  },
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Classic hymns and traditional songs',
    songIds: ['amazing-grace'],
    color: 'hsl(25, 75%, 55%)'
  }
];

export const songs: Song[] = [
  {
    id: 'amazing-grace',
    title: 'Amazing Grace',
    artist: 'John Newton',
    language: 'en',
    genre: 'Hymn',
    key: 'G',
    tempo: 90,
    difficulty: 'beginner',
    collections: ['worship', 'traditional'],
    tags: ['classic', 'hymn', 'salvation'],
    lyrics: `Amazing grace, how sweet the sound
That saved a wretch like me
I once was lost, but now am found
Was blind, but now I see

'Twas grace that taught my heart to fear
And grace my fears relieved
How precious did that grace appear
The hour I first believed`,
    chords: `G    C    G    Em
G    D    G    D
G    C    G    Em  
G    D    G`
  },
  {
    id: 'how-great',
    title: 'How Great Thou Art',
    artist: 'Carl Boberg',
    language: 'en',
    genre: 'Hymn',
    key: 'C',
    tempo: 85,
    difficulty: 'intermediate',
    collections: ['worship'],
    tags: ['praise', 'creation', 'worship'],
    lyrics: `O Lord my God, when I in awesome wonder
Consider all the worlds thy hands have made
I see the stars, I hear the rolling thunder
Thy power throughout the universe displayed

Then sings my soul, my Savior God, to thee
How great thou art, how great thou art
Then sings my soul, my Savior God, to thee
How great thou art, how great thou art`,
    chords: `C    F    C    G
C    F    G    C
C    F    C    Am
F    G    C`
  },
  {
    id: 'awesome-god',
    title: 'Awesome God',
    artist: 'Rich Mullins',
    language: 'en',
    genre: 'Contemporary',
    key: 'A',
    tempo: 120,
    difficulty: 'beginner',
    collections: ['contemporary'],
    tags: ['praise', 'contemporary', 'upbeat'],
    lyrics: `Our God is an awesome God
He reigns from heaven above
With wisdom, power and love
Our God is an awesome God

Our God is an awesome God
He reigns from heaven above
With wisdom, power and love
Our God is an awesome God`,
    chords: `A    D    A    E
A    D    E    A
A    D    A    E
A    D    E    A`
  },
  {
    id: 'cornerstone',
    title: 'Cornerstone',
    artist: 'Hillsong',
    language: 'en',
    genre: 'Contemporary',
    key: 'E',
    tempo: 75,
    difficulty: 'advanced',
    collections: ['contemporary'],
    tags: ['worship', 'jesus', 'foundation'],
    lyrics: `My hope is built on nothing less
Than Jesus' blood and righteousness
I dare not trust the sweetest frame
But wholly trust in Jesus' name

Christ alone, cornerstone
Weak made strong in the Savior's love
Through the storm, He is Lord
Lord of all`,
    chords: `E    A    E    B
E    A    B    E
E    A    E    C#m
A    B    E`
  }
];