import { Song, Language } from '@/types/song';

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
];

export const gospelSongs: Song[] = [
  // HYMNS - English
  {
    id: "hymn-amazing-grace",
    title: "Amazing Grace",
    artist: "John Newton",
    lyrics: `Amazing grace, how sweet the sound\nThat saved a wretch like me\nI once was lost, but now am found\nWas blind, but now I see\n\n'Twas grace that taught my heart to fear\nAnd grace my fears relieved\nHow precious did that grace appear\nThe hour I first believed\n\nThrough many dangers, toils and snares\nI have already come\n'Tis grace hath brought me safe thus far\nAnd grace will lead me home`,
    chords: "G - G7 - C - G - Em - G - D - G",
    key: "G",
    tempo: 80,
    genre: "Traditional Hymn",
    language: "en",
    category: "hymns",
    collections: [],
    tags: ["grace", "salvation", "traditional"],
    difficulty: "beginner",
    languageVersions: {
      "hi": {
        title: "अद्भुत कृपा",
        artist: "John Newton",
        lyrics: `अद्भुत कृपा, कितनी मधुर ध्वनि\nजिसने मुझ पापी को बचाया\nमैं खो गया था, अब मिल गया\nअंधा था, अब देखता हूं\n\nकृपा ने सिखाया मेरे दिल को डरना\nऔर कृपा ने मेरे डर को दूर किया\nकितनी बहुमूल्य लगी वह कृपा\nजिस घड़ी मैंने पहली बार विश्वास किया\n\nकई खतरों, कष्टों और जालों से\nमैं पहले से ही आया हूं\nकृपा ने मुझे यहां तक सुरक्षित लाया है\nऔर कृपा मुझे घर ले जाएगी`,
        chords: "G - G7 - C - G - Em - G - D - G"
      },
      "mr": {
        title: "अद्भुत कृपा",
        artist: "John Newton", 
        lyrics: `अद्भुत कृपा, किती गोड आवाज\nज्याने माझ्या पापी आत्म्याला वाचवले\nमी हरवलो होतो, आता सापडलो\nआंधळा होतो, आता दिसते\n\nकृपेने माझ्या हृदयाला भीती शिकवली\nआणि कृपेने माझी भीती दूर केली\nती कृपा किती मोलाची दिसली\nज्या क्षणी मी पहिल्यांदा विश्वास ठेवला\n\nअनेक धोके, कष्ट आणि सापळे\nमी आधीच पार केले आहेत\nकृपेने मला इथपर्यंत सुरक्षित आणले\nआणि कृपा मला घरी घेऊन जाईल`,
        chords: "G - G7 - C - G - Em - G - D - G"
      },
      "kn": {
        title: "ಅದ್ಭುತ ಕೃಪೆ",
        artist: "John Newton",
        lyrics: `ಅದ್ಭುತ ಕೃಪೆ, ಎಷ್ಟು ಮಧುರ ಧ್ವನಿ\nಅದು ನನ್ನಂತಹ ಪಾಪಿಯನ್ನು ರಕ್ಷಿಸಿತು\nನಾನು ಕಳೆದುಹೋಗಿದ್ದೆ, ಈಗ ಸಿಕ್ಕಿದ್ದೇನೆ\nಕುರುಡನಾಗಿದ್ದೆ, ಈಗ ನೋಡುತ್ತೇನೆ\n\nಕೃಪೆಯೇ ನನ್ನ ಹೃದಯಕ್ಕೆ ಭಯವನ್ನು ಕಲಿಸಿತು\nಮತ್ತು ಕೃಪೆಯೇ ನನ್ನ ಭಯಗಳನ್ನು ನಿವಾರಿಸಿತು\nಆ ಕೃಪೆ ಎಷ್ಟು ಅಮೂಲ್ಯವಾಗಿ ಕಾಣಿಸಿತು\nನಾನು ಮೊದಲ ಬಾರಿಗೆ ನಂಬಿದ ಆ ಕ್ಷಣದಲ್ಲಿ\n\nಅನೇಕ ಅಪಾಯಗಳು, ಕಷ್ಟಗಳು ಮತ್ತು ಬಲೆಗಳ ಮೂಲಕ\nನಾನು ಈಗಾಗಲೇ ಬಂದಿದ್ದೇನೆ\nಕೃಪೆಯೇ ನನ್ನನ್ನು ಇಲ್ಲಿಯವರೆಗೆ ಸುರಕ್ಷಿತವಾಗಿ ತಂದಿದೆ\nಮತ್ತು ಕೃಪೆಯೇ ನನ್ನನ್ನು ಮನೆಗೆ ಕರೆದೊಯ್ಯುತ್ತದೆ`,
        chords: "G - G7 - C - G - Em - G - D - G"
      },
      "te": {
        title: "అద్భుత కృప",
        artist: "John Newton",
        lyrics: `అద్భుత కృప, ఎంత మధుర ధ్వని\nఅది నాలాంటి పాపిని రక్షించింది\nనేను కోల్పోయాను, ఇప్పుడు దొరికాను\nగుడ్డివాడిని, ఇప్పుడు చూస్తున్నాను\n\nకృప నా హృదయానికి భయాన్ని నేర్పింది\nమరియు కృప నా భయాలను తొలగించింది\nఆ కృప ఎంత విలువైనదిగా కనిపించింది\nనేను మొదట విశ్వసించిన గంటలో\n\nఅనేక ప్రమాదాలు, కష్టాలు మరియు ఉచ్చుల ద్వారా\nనేను ఇప్పటికే వచ్చాను\nకృప నన్ను ఇప్పటివరకు సురక్షితంగా తీసుకొచ్చింది\nమరియు కృప నన్ను ఇంటికి తీసుకుపోతుంది`,
        chords: "G - G7 - C - G - Em - G - D - G"
      }
    }
  },
  {
    id: "hymn-how-great-thou-art",
    title: "How Great Thou Art",
    artist: "Carl Boberg",
    lyrics: `O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made\nI see the stars, I hear the rolling thunder\nThy power throughout the universe displayed\n\nThen sings my soul, my Saviour God, to Thee\nHow great Thou art, how great Thou art\nThen sings my soul, my Saviour God, to Thee\nHow great Thou art, how great Thou art`,
    chords: "G - C - G - D - G - C - G - D - G",
    key: "G",
    tempo: 75,
    genre: "Traditional Hymn",
    language: "en",
    category: "hymns",
    collections: [],
    tags: ["worship", "majesty", "creation"],
    difficulty: "intermediate"
  },

  // PSALMS - English
  {
    id: "psalm-23",
    title: "The Lord is My Shepherd (Psalm 23)",
    artist: "Traditional",
    lyrics: `The Lord is my shepherd, I shall not want\nHe makes me lie down in green pastures\nHe leads me beside the still waters\nHe restores my soul\n\nHe guides me in paths of righteousness\nFor His name's sake\nEven though I walk through the valley\nOf the shadow of death\nI will fear no evil\nFor You are with me`,
    chords: "D - G - A - D - Bm - G - A - D",
    key: "D",
    tempo: 70,
    genre: "Psalm",
    language: "en",
    category: "psalms",
    collections: [],
    tags: ["shepherd", "comfort", "protection"],
    difficulty: "beginner"
  },

  // PRAISE & WORSHIP - English
  {
    id: "praise-how-great-is-our-god",
    title: "How Great Is Our God",
    artist: "Chris Tomlin",
    lyrics: `The splendor of the King\nClothed in majesty\nLet all the earth rejoice\nAll the earth rejoice\n\nHe wraps Himself in light\nAnd darkness tries to hide\nAnd trembles at His voice\nTrembles at His voice\n\nHow great is our God\nSing with me\nHow great is our God\nAnd all will see\nHow great, how great is our God`,
    chords: "G - Em - C - D - G - Em - C - D",
    key: "G",
    tempo: 140,
    genre: "Contemporary Worship",
    language: "en",
    category: "praise",
    collections: [],
    tags: ["praise", "majesty", "contemporary"],
    difficulty: "intermediate"
  },
  {
    id: "praise-blessed-be-your-name",
    title: "Blessed Be Your Name", 
    artist: "Matt Redman",
    lyrics: `Blessed be Your name\nIn the land that is plentiful\nWhere Your streams of abundance flow\nBlessed be Your name\n\nBlessed be Your name\nWhen I'm found in the desert place\nThough I walk through the wilderness\nBlessed be Your name\n\nEvery blessing You pour out I'll\nTurn back to praise\nWhen the darkness closes in Lord\nStill I will say\n\nBlessed be the name of the Lord\nBlessed be Your name`,
    chords: "A - E - F#m - D - A - E - D - A",
    key: "A",
    tempo: 130,
    genre: "Contemporary Worship",
    language: "en",
    category: "worship",
    collections: [],
    tags: ["blessing", "praise", "faith"],
    difficulty: "intermediate"
  },

  // HINDI SONGS
  {
    id: "hymn-yesu-mera-raja-hi",
    title: "यीशु मेरा राजा",
    artist: "Traditional Hindi",
    lyrics: `यीशु मेरा राजा है\nवह मेरा मुक्तिदाता है\nउसकी महिमा सदा रहे\nउसका प्रेम अमर रहे\n\nहर दिन मैं गाऊंगा\nउसकी स्तुति करूंगा\nयीशु मेरा प्रभु है\nवह मेरा सब कुछ है`,
    chords: "G - D - Em - C - G - D - C - G",
    key: "G",
    tempo: 110,
    genre: "Hindi Hymn",
    language: "hi",
    category: "hymns",
    collections: [],
    tags: ["यीशु", "राजा", "स्तुति"],
    difficulty: "beginner"
  },
  {
    id: "psalm-prabhu-mera-charwaha-hi",
    title: "प्रभु मेरा चरवाहा (भजन 23)",
    artist: "Traditional Hindi",
    lyrics: `प्रभु मेरा चरवाहा है\nमुझे कमी नहीं होगी\nवह मुझे हरी घास में लिटाता है\nशांत पानी के पास ले जाता है\n\nवह मेरी आत्मा को ताज़ा करता है\nअपने नाम की खातिर\nधर्म के मार्गों में ले चलता है\nचाहे मैं मृत्यु की छाया की घाटी में चलूं\nमैं किसी बुराई से नहीं डरूंगा\nक्योंकि तू मेरे साथ है`,
    chords: "D - G - A - D - Bm - G - A - D",
    key: "D",
    tempo: 70,
    genre: "Hindi Psalm",
    language: "hi",
    category: "psalms",
    collections: [],
    tags: ["चरवाहा", "सुरक्षा", "भजन"],
    difficulty: "beginner"
  },
  {
    id: "praise-prabhu-ki-mahima-hi",
    title: "प्रभु की महिमा",
    artist: "Contemporary Hindi",
    lyrics: `प्रभु की महिमा हो\nउसका नाम महान है\nस्वर्ग और पृथ्वी पर\nउसकी स्तुति हो\n\nहलेलुयाह, हलेलुयाह\nप्रभु की जय हो\nहलेलुयाह, हलेलुयाह\nयीशु की विजय हो`,
    chords: "C - G - Am - F - C - G - F - C",
    key: "C",
    tempo: 125,
    genre: "Hindi Contemporary",
    language: "hi",
    category: "praise",
    collections: [],
    tags: ["महिमा", "स्तुति", "हलेलुयाह"],
    difficulty: "intermediate"
  },

  // MARATHI SONGS
  {
    id: "hymn-yesu-majha-taaranhaar-mr",
    title: "येसू माझा तारणहार",
    artist: "Traditional Marathi",
    lyrics: `येसू माझा तारणहार\nतो माझा रक्षक आहे\nत्याचे प्रेम अपार आहे\nत्याची कृपा महान आहे\n\nहल्लेलुया, हल्लेलुया\nयेसूची स्तुती करा\nहल्लेलुया, हल्लेलुया\nत्याला गौरव द्या`,
    chords: "G - D - Em - C - G - D - C - G",
    key: "G",
    tempo: 110,
    genre: "Marathi Hymn",
    language: "mr",
    category: "hymns",
    collections: [],
    tags: ["तारणहार", "स्तुती", "गौरव"],
    difficulty: "beginner"
  },
  {
    id: "psalm-prabhu-majha-menda-mr",
    title: "प्रभु माझा मेंढपाळ (स्तोत्र 23)",
    artist: "Traditional Marathi",
    lyrics: `प्रभु माझा मेंढपाळ आहे\nमला कमतरता नाही\nतो मला हिरव्या कुरणात विसावतो\nशांत पाण्याजवळ नेतो\n\nतो माझा जीव ताजातवाना करतो\nआपल्या नावाच्या फायद्यासाठी\nन्यायाच्या वाटेत चालवतो\nजरी मी मृत्यूच्या सावलीच्या दरीत चालत असलो\nमी कोणत्याही वाईटाला घाबरणार नाही\nकारण तू माझ्याबरोबर आहेस`,
    chords: "D - G - A - D - Bm - G - A - D",
    key: "D",
    tempo: 70,
    genre: "Marathi Psalm",
    language: "mr",
    category: "psalms",
    collections: [],
    tags: ["मेंढपाळ", "संरक्षण", "स्तोत्र"],
    difficulty: "beginner"
  },
  {
    id: "praise-prabhu-tuzhya-naam-mr",
    title: "प्रभु तुझ्या नामात",
    artist: "Contemporary Marathi",
    lyrics: `प्रभु तुझ्या नामात\nशक्ती आहे\nतुझ्या प्रेमात\nमुक्ती आहे\n\nयेसू, येसू\nतूच आमचा राजा\nयेसू, येसू\nतूच आमचा मित्र\n\nस्तुती तुला, गौरव तुला\nयेसू आमच्या हृदयात\nस्तुती तुला, गौरव तुला\nसदैव तू आमच्या साथ`,
    chords: "D - A - Bm - G - D - A - G - D",
    key: "D",
    tempo: 125,
    genre: "Marathi Contemporary",
    language: "mr",
    category: "praise",
    collections: [],
    tags: ["शक्ती", "प्रेम", "मुक्ती"],
    difficulty: "intermediate"
  },

  // KANNADA SONGS
  {
    id: "hymn-yesu-nanna-rakshaka-kn",
    title: "ಯೇಸು ನನ್ನ ರಕ್ಷಕ",
    artist: "Traditional Kannada",
    lyrics: `ಯೇಸು ನನ್ನ ರಕ್ಷಕ\nಆತ ನನ್ನ ದೇವ\nಆತನ ಪ್ರೀತಿ ಅಪಾರ\nಆತನ ಕೃಪೆ ಮಹಾನ್\n\nಹಲ್ಲೆಲೂಯಾ, ಹಲ್ಲೆಲೂಯಾ\nಯೇಸು ರಾಜ\nಹಲ್ಲೆಲೂಯಾ, ಹಲ್ಲೆಲೂಯಾ\nಆತನೇ ವಿಜೇತ`,
    chords: "G - C - D - Em - G - C - D - G",
    key: "G",
    tempo: 115,
    genre: "Kannada Hymn",
    language: "kn",
    category: "hymns",
    collections: [],
    tags: ["ರಕ್ಷಕ", "ಸ್ತುತಿ", "ಹಲ್ಲೆಲೂಯಾ"],
    difficulty: "beginner"
  },
  {
    id: "psalm-prabhu-nanna-kuri-kn",
    title: "ಪ್ರಭು ನನ್ನ ಕುರಿಗಾರ (ಕೀರ್ತನೆ 23)",
    artist: "Traditional Kannada",
    lyrics: `ಪ್ರಭು ನನ್ನ ಕುರಿಗಾರ\nನನಗೆ ಕೊರತೆಯಿಲ್ಲ\nಆತ ನನ್ನನ್ನು ಹಸಿರು ಹುಲ್ಲುಗಾವಲಿನಲ್ಲಿ ಮಲಗಿಸುತ್ತಾನೆ\nಶಾಂತ ನೀರಿನ ಬಳಿಗೆ ನಡೆಸುತ್ತಾನೆ\n\nಆತ ನನ್ನ ಆತ್ಮವನ್ನು ಚೈತನ್ಯಗೊಳಿಸುತ್ತಾನೆ\nತನ್ನ ನಾಮದ ನಿಮಿತ್ತ\nಧರ್ಮದ ಮಾರ್ಗಗಳಲ್ಲಿ ನಡೆಸುತ್ತಾನೆ\nನಾನು ಮರಣದ ನೆರಳಿನ ತಗ್ಗಿನಲ್ಲಿ ನಡೆದರೂ\nನಾನು ಯಾವ ಕೆಟ್ಟತನಕ್ಕೂ ಹೆದರುವುದಿಲ್ಲ\nಏಕೆಂದರೆ ನೀನು ನನ್ನೊಂದಿಗಿರುವೆ`,
    chords: "D - G - A - D - Bm - G - A - D",
    key: "D",
    tempo: 70,
    genre: "Kannada Psalm",
    language: "kn",
    category: "psalms",
    collections: [],
    tags: ["ಕುರಿಗಾರ", "ರಕ್ಷಣೆ", "ಕೀರ್ತನೆ"],
    difficulty: "beginner"
  },
  {
    id: "praise-paavana-prema-kn",
    title: "ಪಾವನ ಪ್ರೇಮ",
    artist: "Contemporary Kannada",
    lyrics: `ಪಾವನ ಪ್ರೇಮ ಅದ್ಭುತ\nಯೇಸು ಪ್ರೇಮ ಶಾಶ್ವತ\nನಮ್ಮ ಹೃದಯದಲ್ಲಿ\nಆತ ವಾಸಿಸುತ್ತಾನೆ\n\nಸ್ತುತಿ, ಸ್ತುತಿ ಯೇಸುವಿಗೆ\nಮಹಿಮೆ, ಮಹಿಮೆ ಆತನಿಗೆ\nಸ್ತುತಿ, ಸ್ತುತಿ ಯೇಸುವಿಗೆ\nಆತನೇ ನಮ್ಮ ರಕ್ಷಕ`,
    chords: "D - A - Bm - G - D - A - G - D",
    key: "D",
    tempo: 105,
    genre: "Kannada Contemporary",
    language: "kn",
    category: "worship",
    collections: [],
    tags: ["ಪ್ರೇಮ", "ಸ್ತುತಿ", "ಮಹಿಮೆ"],
    difficulty: "intermediate"
  },

  // TELUGU SONGS
  {
    id: "hymn-yesu-naa-rakshakudu-te",
    title: "యేసు నా రక్షకుడు",
    artist: "Traditional Telugu",
    lyrics: `యేసు నా రక్షకుడు\nవాడే నా దేవుడు\nవాడి ప్రేమ అపారం\nవాడి కృప గొప్పది\n\nహల్లెలూయా, హల్లెలూయా\nయేసు రాజు\nహల్లెలూయా, హల్లెలూయా\nవాడే విజేత`,
    chords: "D - A - Bm - G - D - A - G - D",
    key: "D",
    tempo: 115,
    genre: "Telugu Hymn",
    language: "te",
    category: "hymns",
    collections: [],
    tags: ["రక్షకుడు", "స్తుతి", "హల్లెలూయా"],
    difficulty: "beginner"
  },
  {
    id: "psalm-prabhu-naa-golla-te",
    title: "ప్రభు నా గొల్లవాడు (కీర్తన 23)",
    artist: "Traditional Telugu",
    lyrics: `ప్రభు నా గొల్లవాడు\nనాకు లోటు లేదు\nవాడు నన్ను పచ్చిక బయళ్లలో పడుకోబెట్టును\nశాంత నీళ్ళ దగ్గరకు తోసుకుపోవును\n\nవాడు నా ప్రాణాన్ని తెరిపించును\nతన నామము కొరకు\nనీతి దోవలలో నడిపించును\nనేను మృత్యు నీడ లోయలో నడిచినా\nఏ కీడుకు భయపడను\nఎందుకంటే నువ్వు నాతో ఉన్నావు`,
    chords: "D - G - A - D - Bm - G - A - D",
    key: "D",
    tempo: 70,
    genre: "Telugu Psalm",
    language: "te",
    category: "psalms",
    collections: [],
    tags: ["గొల్లవాడు", "రక్షణ", "కీర్తన"],
    difficulty: "beginner"
  },
  {
    id: "praise-divya-prema-te",
    title: "దివ్య ప్రేమ",
    artist: "Contemporary Telugu",
    lyrics: `దివ్య ప్రేమ అద్భుతం\nయేసు ప్రేమ శాశ్వతం\nమన హృదయాల్లో\nవాడు వసించాడు\n\nస్తుతి, స్తుతి, యేసుకు\nమహిమ, మహిమ, వాడికే\nస్తుతి, స్తుతి, యేసుకు\nవాడే మన రక్షకుడు`,
    chords: "G - C - D - Em - G - C - D - G",
    key: "G",
    tempo: 105,
    genre: "Telugu Contemporary",
    language: "te",
    category: "worship",
    collections: [],
    tags: ["ప్రేమ", "స్తుతి", "మహిమ"],
    difficulty: "intermediate"
  }
];