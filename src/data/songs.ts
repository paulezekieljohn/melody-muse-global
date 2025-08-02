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
  },
  {
    id: 'vande-mataram',
    title: 'वंदे मातरम्',
    artist: 'बंकिम चंद्र चट्टोपाध्याय',
    language: 'hi',
    genre: 'देशभक्ति गीत',
    key: 'C',
    tempo: 100,
    difficulty: 'intermediate',
    collections: ['worship'],
    tags: ['देशभक्ति', 'राष्ट्रगान', 'पारंपरिक'],
    lyrics: `वंदे मातरम्
सुजलां सुफलां मलयजशीतलाम्
शस्यश्यामलां मातरम्
वंदे मातरम्

शुभ्रज्योत्स्नापुलकितयामिनीम्
फुल्लकुसुमितद्रुमदलशोभिनीम्
सुहासिनीं सुमधुरभाषिणीम्
सुखदां वरदां मातरम्
वंदे मातरम्`,
    chords: `C    F    C    G
C    F    G    C
C    F    C    Am
F    G    C`
  },
  {
    id: 'raghupati-raghav',
    title: 'रघुपति राघव राजा राम',
    artist: 'पारंपरिक',
    language: 'hi',
    genre: 'भजन',
    key: 'D',
    tempo: 110,
    difficulty: 'beginner',
    collections: ['worship'],
    tags: ['भजन', 'राम', 'पारंपरिक'],
    lyrics: `रघुपति राघव राजा राम
पतित पावन सीता राम
सीता राम सीता राम
भज प्यारे तू सीता राम

ईश्वर अल्लाह तेरो नाम
सब को सन्मति दे भगवान
सब को सन्मति दे भगवान
रघुपति राघव राजा राम`,
    chords: `D    G    D    A
D    G    A    D
D    G    D    Bm
G    A    D`
  },
  {
    id: 'ganpati-bappa',
    title: 'गणपति बप्पा मोरया',
    artist: 'पारंपरिक',
    language: 'mr',
    genre: 'आरती',
    key: 'E',
    tempo: 130,
    difficulty: 'beginner',
    collections: ['worship'],
    tags: ['गणेश', 'आरती', 'उत्सव'],
    lyrics: `गणपति बप्पा मोरया
मंगलमूर्ति मोरया
गणपति बप्पा मोरया
मोरया रे

आपल्या घरी आला गं
आनंदाची वाटाशी आला गं
सकळ विघ्न हरता गं
गणपति बप्पा मोरया`,
    chords: `E    A    E    B
E    A    B    E
E    A    E    C#m
A    B    E`
  },
  {
    id: 'sahana-vavatu',
    title: 'సహన వవతు',
    artist: 'వేద మంత్రం',
    language: 'te',
    genre: 'శ్లోకం',
    key: 'C',
    tempo: 80,
    difficulty: 'intermediate',
    collections: ['worship'],
    tags: ['శాంతి', 'మంత్రం', 'వేదం'],
    lyrics: `సహన వవతు
సహనౌ భునక్తు
సహ వీర్యం కరవావహై
తేజస్వి నావధీతమస్తు
మా విద్విషావహై

ఓం శాంతి శాంతి శాంతిః
సహన వవతు సహనౌ భునక్తు
సహ వీర్యం కరవావహై
మా విద్విషావహై`,
    chords: `C    F    C    G
C    F    G    C
C    F    C    Am
F    G    C`
  },
  {
    id: 'karagada-guruvina',
    title: 'ಕರಗದ ಗುರುವಿನ',
    artist: 'ಪುರಂದರ ದಾಸ',
    language: 'kn',
    genre: 'ಕೃತಿ',
    key: 'D',
    tempo: 95,
    difficulty: 'intermediate',
    collections: ['worship'],
    tags: ['ಗುರು', 'ಭಕ್ತಿ', 'ಕರ್ನಾಟಕ ಸಂಗೀತ'],
    lyrics: `ಕರಗದ ಗುರುವಿನ
ಕಾಕ್ಷಿ ಇರುವವರೆಗೆ
ಮರೆಯದು ಮನಸ್ಸಿನಲ್ಲಿ
ಮಾಧವ ನಿನ್ನ ರೂಪ

ಗುರುವಿನ ಮಾತು ಚೆನ್ನಾಗಿ
ಗಾನ ಮಾಡುವವರಿಗೆ
ಹರಿಯ ಕೃಪೆ ಸದಾ
ಹೃದಯದಲ್ಲಿ ಇರುವುದು`,
    chords: `D    G    D    A
D    G    A    D
D    G    D    Bm
G    A    D`
  },
  {
    id: 'suprabhatam',
    title: 'श्री वेंकटेश सुप्रभातम्',
    artist: 'श्री प्रतिवादी भयंकरम् अण्णा',
    language: 'hi',
    genre: 'स्तोत्र',
    key: 'G',
    tempo: 70,
    difficulty: 'advanced',
    collections: ['worship'],
    tags: ['तिरुपति', 'वेंकटेश', 'सुप्रभात'],
    lyrics: `कौसल्यासुप्रजाराम पूर्वसन्ध्या प्रवर्तते
उत्तिष्ठ नरशार्दूल कर्तव्यं देव पूजनम्

कौसल्यासुप्रजाराम पूर्वसन्ध्या प्रवर्तते
उत्तिष्ठ नरशार्दूल कर्तव्यं देव पूजनम्

वेंकटेश प्रभो वेंकटेश प्रभो
वेंकटेश प्रभो वेंकटेश प्रभो`,
    chords: `G    C    G    D
G    C    D    G
G    C    G    Em
C    D    G`
  },
  {
    id: 'vitthala-vitthala',
    title: 'विठ्ठला विठ्ठला',
    artist: 'संत तुकाराम',
    language: 'mr',
    genre: 'अभंग',
    key: 'F',
    tempo: 110,
    difficulty: 'beginner',
    collections: ['worship'],
    tags: ['विठोबा', 'पंढरपूर', 'भक्ति'],
    lyrics: `विठ्ठला विठ्ठला जय हरि विठ्ठला
पांडुरंग हरि विठ्ठला
जय जय राम कृष्ण हरि
जय जय राम कृष्ण हरि

माझे मन आहे पंढरीचे राजा
विठोबा माझे प्राण विठोबा
माझे मन आहे पंढरीचे राजा`,
    chords: `F    Bb   F    C
F    Bb   C    F
F    Bb   F    Dm
Bb   C    F`
  },
  {
    id: 'namami-shamishan',
    title: 'నమామి శమీశాన్',
    artist: 'ఆదిశంకరాచార్య',
    language: 'te',
    genre: 'స్తోత్రం',
    key: 'A',
    tempo: 85,
    difficulty: 'advanced',
    collections: ['worship'],
    tags: ['శివ', 'స్తోత్రం', 'భక్తి'],
    lyrics: `నమామి శమీశాన్ నిర్వాణరూపం
విభుం వ్యాపకం బ్రహ్మవేదస్వరూపం
నిజం నిర్గుణం నిర్వికల్పం నిరీహం
చిదాకాశమాకాశవాసం భజేఽహం

నిరాకారమోంకారమూలం తురీయం
గిరా జ్ఞాన గోతీతమీశం గిరీశం
కరాలం మహాకాల కాలం కృపాలం
గుణాగార సంసారపారం నతోఽహం`,
    chords: `A    D    A    E
A    D    E    A
A    D    A    F#m
D    E    A`
  },
  {
    id: 'hari-om-tatsat',
    title: 'हरि ॐ तत्सत्',
    artist: 'पारंपरिक',
    language: 'hi',
    genre: 'मंत्र',
    key: 'C',
    tempo: 60,
    difficulty: 'beginner',
    collections: ['worship'],
    tags: ['मंत्र', 'ध्यान', 'शांति'],
    lyrics: `हरि ॐ तत्सत्
हरि ॐ तत्सत्
सच्चिदानंद रूप
हरि ॐ तत्सत्

ॐ शांति शांति शांति
ॐ शांति शांति शांति
हरि ॐ तत्सत्`,
    chords: `C    F    C    G
C    F    G    C
C    F    C    Am
F    G    C`
  },
  {
    id: 'govinda-ala-re',
    title: 'गोविंदा आला रे',
    artist: 'पारंपरिक',
    language: 'mr',
    genre: 'भजन',
    key: 'B',
    tempo: 140,
    difficulty: 'beginner',
    collections: ['contemporary'],
    tags: ['कृष्ण', 'उत्सव', 'दही हांडी'],
    lyrics: `गोविंदा आला रे आला
गोपाल आला रे आला
माखन चोरा आला रे
गोकुळचा राजा आला रे

देव रे देवकी नंदना
आला रे आला गोविंदा
यशोदा ने लाल आला रे
वृंदावनचा राजा आला रे`,
    chords: `B    E    B    F#
B    E    F#   B
B    E    B    G#m
E    F#   B`
  },
  {
    id: 'jagadananda-karaka',
    title: 'ಜಗದಾನಂದ ಕಾರಕ',
    artist: 'ಪುರಂದರ ದಾಸ',
    language: 'kn',
    genre: 'ಕೃತಿ',
    key: 'E',
    tempo: 100,
    difficulty: 'intermediate',
    collections: ['worship'],
    tags: ['ಕೃಷ್ಣ', 'ಭಕ್ತಿ', 'ಕರ್ನಾಟಕ ಸಂಗೀತ'],
    lyrics: `ಜಗದಾನಂದ ಕಾರಕ
ಜಯ ಜಗದೀಶ ಹರೇ
ಶ್ರೀ ಪುರಂದರ ವಿಠಲ
ಪ್ರಾಣನಾಥ ಹರೇ

ಬೇಗನೆ ಬಾರೋ ರಂಗ
ಬಿದುವ ಬಾಗಿಲಲ್ಲಿ
ತೋಗಿ ತೋರಿಸೋ ದರ್ಶನ
ತುಮ್ಮಿ ತುಮ್ಮಿ ಹರೇ`,
    chords: `E    A    E    B
E    A    B    E
E    A    E    C#m
A    B    E`
  }
];