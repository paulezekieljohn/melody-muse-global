import { Song, Collection, Language } from '@/types/song';

export const languages: Language[] = [
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'en', name: 'English', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
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
    id: "hindi-1",
    title: "Yesu Mera Raja",
    artist: "Hindi Gospel Collective",
    lyrics: `यीशु मेरा राजा है\nवह मेरा मुक्तिदाता है\nउसकी महिमा सदा रहे\nउसका प्रेम अमर रहे\n\nहर दिन मैं गाऊंगा\nउसकी स्तुति करूंगा\nयीशु मेरा प्रभु है\nवह मेरा सब कुछ है`,
    chords: "G - D - Em - C - G - D - C - G",
    key: "G",
    tempo: 110,
    genre: "Gospel",
    language: "hi",
    category: "hymns",
    collections: ["worship"],
    tags: ["praise", "worship", "jesus"],
    difficulty: "beginner"
  },
  {
    id: "english-1",
    title: "Amazing Grace",
    artist: "Traditional Gospel",
    lyrics: `Amazing grace, how sweet the sound\nThat saved a wretch like me\nI once was lost, but now am found\nWas blind, but now I see\n\n'Twas grace that taught my heart to fear\nAnd grace my fears relieved\nHow precious did that grace appear\nThe hour I first believed`,
    chords: "G - G7 - C - G - Em - G - D - G",
    key: "G",
    tempo: 80,
    genre: "Traditional Gospel",
    language: "en",
    category: "hymns",
    collections: ["classic", "worship"],
    tags: ["grace", "salvation", "traditional"],
    difficulty: "beginner",
    languageVersions: {
      "hi": {
        title: "अद्भुत कृपा",
        artist: "Traditional Gospel",
        lyrics: `अद्भुत कृपा, कितनी मधुर ध्वनि\nजिसने मुझ पापी को बचाया\nमैं खो गया था, अब मिल गया\nअंधा था, अब देखता हूं\n\nकृपा ने सिखाया मेरे दिल को डरना\nऔर कृपा ने मेरे डर को दूर किया\nकितनी बहुमूल्य लगी वह कृपा\nजिस घड़ी मैंने पहली बार विश्वास किया`,
        chords: "G - G7 - C - G - Em - G - D - G"
      }
    }
  }
];