import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ─── Spanish ──────────────────────────────────────────────────────────────

  {
    id: "es-lesson-1",
    unitId: "es-unit-1",
    title: "Hello & Goodbye",
    description: "Master the most common Spanish greetings",
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Say hello and goodbye in Spanish" },
      { description: "Ask how someone is doing" },
    ],
    vocabulary: [
      { word: "Hola", translation: "Hello", pronunciation: "OH-lah" },
      { word: "Adiós", translation: "Goodbye", pronunciation: "ah-DYOS" },
      { word: "Buenos días", translation: "Good morning", pronunciation: "BWEH-nos DEE-as" },
      { word: "Buenas noches", translation: "Good night", pronunciation: "BWEH-nas NOH-ches" },
      { word: "Por favor", translation: "Please", pronunciation: "por fah-VOR" },
      { word: "Gracias", translation: "Thank you", pronunciation: "GRAH-syahs" },
    ],
    phrases: [
      { text: "¿Cómo estás?", translation: "How are you?", pronunciation: "KOH-mo es-TAHS" },
      { text: "Estoy bien, gracias.", translation: "I'm fine, thanks.", pronunciation: "es-TOY BYEN GRAH-syahs" },
      { text: "Mucho gusto.", translation: "Nice to meet you.", pronunciation: "MOO-cho GOOS-toh" },
    ],
    activities: [
      {
        type: "multiple_choice",
        question: "How do you say 'Hello' in Spanish?",
        options: ["Adiós", "Hola", "Gracias", "Por favor"],
        correctIndex: 1,
      },
      {
        type: "translation",
        prompt: "Translate: Good morning",
        answer: "Buenos días",
        hint: "Think about the time of day",
      },
      {
        type: "fill_in_blank",
        sentence: "¿Cómo ___?",
        answer: "estás",
        options: ["estás", "bien", "hola", "adiós"],
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "Hola", right: "Hello" },
          { left: "Gracias", right: "Thank you" },
          { left: "Adiós", right: "Goodbye" },
          { left: "Por favor", right: "Please" },
        ],
      },
    ],
    aiTeacherPrompt: {
      intro:
        "Hi! Today we're going to learn the most important Spanish greetings. These are words you'll use every single day.",
      explanation:
        "In Spanish, greetings change based on the time of day. 'Buenos días' is for the morning, 'Buenas tardes' for the afternoon, and 'Buenas noches' for the evening. 'Hola' works any time!",
      encouragement:
        "You're doing great! Native Spanish speakers will be so impressed when you greet them properly.",
    },
  },

  {
    id: "es-lesson-2",
    unitId: "es-unit-1",
    title: "Introducing Yourself",
    description: "Learn to tell people your name and where you're from",
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Say your name in Spanish" },
      { description: "Ask someone's name" },
      { description: "Say where you are from" },
    ],
    vocabulary: [
      { word: "Me llamo", translation: "My name is", pronunciation: "meh YAH-mo" },
      { word: "¿Cómo te llamas?", translation: "What is your name?", pronunciation: "KOH-mo teh YAH-mas" },
      { word: "Soy de", translation: "I am from", pronunciation: "soy deh" },
      { word: "Encantado/a", translation: "Pleased to meet you", pronunciation: "en-kan-TAH-do" },
    ],
    phrases: [
      { text: "Me llamo Ana.", translation: "My name is Ana.", pronunciation: "meh YAH-mo AH-nah" },
      { text: "Soy de España.", translation: "I am from Spain.", pronunciation: "soy deh es-PAH-nyah" },
      { text: "¿De dónde eres?", translation: "Where are you from?", pronunciation: "deh DON-deh EH-res" },
    ],
    activities: [
      {
        type: "multiple_choice",
        question: "How do you say 'My name is' in Spanish?",
        options: ["Soy de", "Me llamo", "Encantado", "¿Cómo te llamas?"],
        correctIndex: 1,
      },
      {
        type: "translation",
        prompt: "Translate: Where are you from?",
        answer: "¿De dónde eres?",
      },
      {
        type: "fill_in_blank",
        sentence: "___ llamo Carlos.",
        answer: "Me",
        options: ["Me", "Te", "Se", "Le"],
      },
    ],
    aiTeacherPrompt: {
      intro:
        "Now that you can greet people, let's learn how to introduce yourself. This is super important for making new friends!",
      explanation:
        "In Spanish, you use 'Me llamo' (literally 'I call myself') to give your name. To say where you're from, use 'Soy de' followed by the country or city name.",
      encouragement:
        "Perfect! You can now have your first real Spanish conversation. That's a huge milestone!",
    },
  },

  {
    id: "es-lesson-3",
    unitId: "es-unit-2",
    title: "Numbers 1–10",
    description: "Learn to count from one to ten in Spanish",
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Count from 1 to 10 in Spanish" },
      { description: "Recognize written Spanish numbers" },
    ],
    vocabulary: [
      { word: "uno", translation: "one", pronunciation: "OO-no" },
      { word: "dos", translation: "two", pronunciation: "dohs" },
      { word: "tres", translation: "three", pronunciation: "trehs" },
      { word: "cuatro", translation: "four", pronunciation: "KWAH-tro" },
      { word: "cinco", translation: "five", pronunciation: "SEEN-ko" },
      { word: "seis", translation: "six", pronunciation: "says" },
      { word: "siete", translation: "seven", pronunciation: "SYEH-teh" },
      { word: "ocho", translation: "eight", pronunciation: "OH-cho" },
      { word: "nueve", translation: "nine", pronunciation: "NWEH-veh" },
      { word: "diez", translation: "ten", pronunciation: "dyehs" },
    ],
    phrases: [
      { text: "Tengo cinco años.", translation: "I am five years old.", pronunciation: "TENG-go SEEN-ko AH-nyos" },
    ],
    activities: [
      {
        type: "multiple_choice",
        question: "What is 'cinco' in English?",
        options: ["three", "four", "five", "six"],
        correctIndex: 2,
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "uno", right: "1" },
          { left: "dos", right: "2" },
          { left: "tres", right: "3" },
          { left: "cuatro", right: "4" },
        ],
      },
      {
        type: "translation",
        prompt: "Translate: eight",
        answer: "ocho",
      },
    ],
    aiTeacherPrompt: {
      intro: "Let's count! Numbers are one of the most practical things to learn in any language.",
      explanation:
        "Spanish numbers 1–10 are unique words you'll need to memorize. The good news: they follow a logical pattern after 10, so once you know these you can build on them quickly.",
      encouragement: "Excellent counting! You're building a great foundation for everyday Spanish.",
    },
  },

  // ─── French ───────────────────────────────────────────────────────────────

  {
    id: "fr-lesson-1",
    unitId: "fr-unit-1",
    title: "Bonjour & Bonsoir",
    description: "Learn essential French greetings for any time of day",
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Greet people in French" },
      { description: "Say goodbye politely" },
    ],
    vocabulary: [
      { word: "Bonjour", translation: "Hello / Good day", pronunciation: "bon-ZHOOR" },
      { word: "Bonsoir", translation: "Good evening", pronunciation: "bon-SWAHR" },
      { word: "Au revoir", translation: "Goodbye", pronunciation: "oh ruh-VWAHR" },
      { word: "Merci", translation: "Thank you", pronunciation: "mair-SEE" },
      { word: "S'il vous plaît", translation: "Please", pronunciation: "seel voo PLAY" },
      { word: "Excusez-moi", translation: "Excuse me", pronunciation: "ex-koo-ZAY mwah" },
    ],
    phrases: [
      { text: "Comment allez-vous ?", translation: "How are you? (formal)", pronunciation: "ko-MON ta-lay VOO" },
      { text: "Ça va bien, merci.", translation: "I'm fine, thank you.", pronunciation: "sah vah BYAN mair-SEE" },
    ],
    activities: [
      {
        type: "multiple_choice",
        question: "How do you say 'Good evening' in French?",
        options: ["Bonjour", "Au revoir", "Bonsoir", "Merci"],
        correctIndex: 2,
      },
      {
        type: "translation",
        prompt: "Translate: Thank you",
        answer: "Merci",
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "Bonjour", right: "Hello" },
          { left: "Au revoir", right: "Goodbye" },
          { left: "Merci", right: "Thank you" },
          { left: "S'il vous plaît", right: "Please" },
        ],
      },
    ],
    aiTeacherPrompt: {
      intro: "Bienvenue! Welcome to French. Let's start with the greetings you'll use every day.",
      explanation:
        "French uses 'Bonjour' during the day and 'Bonsoir' in the evening. 'Au revoir' is the standard goodbye. Unlike English, formal and informal greetings differ — 'Comment allez-vous' is formal, while 'Ça va?' is casual.",
      encouragement: "Très bien! You just learned your first French words. Keep it up!",
    },
  },

  {
    id: "fr-lesson-2",
    unitId: "fr-unit-1",
    title: "Je m'appelle...",
    description: "Introduce yourself and ask others' names in French",
    xpReward: 10,
    durationMinutes: 5,
    goals: [
      { description: "Say your name in French" },
      { description: "Ask someone their name" },
    ],
    vocabulary: [
      { word: "Je m'appelle", translation: "My name is", pronunciation: "zhuh mah-PEL" },
      { word: "Comment vous appelez-vous ?", translation: "What is your name? (formal)", pronunciation: "ko-MON voo zah-play VOO" },
      { word: "Je suis de", translation: "I am from", pronunciation: "zhuh swee duh" },
      { word: "Enchanté(e)", translation: "Nice to meet you", pronunciation: "on-SHON-tay" },
    ],
    phrases: [
      { text: "Je m'appelle Marie.", translation: "My name is Marie.", pronunciation: "zhuh mah-PEL mah-REE" },
      { text: "Je suis de Paris.", translation: "I am from Paris.", pronunciation: "zhuh swee duh pah-REE" },
    ],
    activities: [
      {
        type: "multiple_choice",
        question: "How do you say 'My name is' in French?",
        options: ["Je suis", "Je m'appelle", "Enchanté", "Au revoir"],
        correctIndex: 1,
      },
      {
        type: "translation",
        prompt: "Translate: Nice to meet you",
        answer: "Enchanté",
      },
    ],
    aiTeacherPrompt: {
      intro: "Now let's learn how to introduce yourself in French — a must for any traveler to France!",
      explanation:
        "In French, 'Je m'appelle' means 'I call myself'. It's the standard way to give your name. 'Enchanté' (masculine) or 'Enchantée' (feminine) is said when meeting someone new.",
      encouragement: "Fantastique! You can now introduce yourself in French. You're on a roll!",
    },
  },

  // ─── Japanese ─────────────────────────────────────────────────────────────

  {
    id: "ja-lesson-1",
    unitId: "ja-unit-1",
    title: "First 5 Hiragana",
    description: "Learn あ い う え お — the foundation of Japanese writing",
    xpReward: 15,
    durationMinutes: 7,
    goals: [
      { description: "Recognize and read あ い う え お" },
      { description: "Know the romaji for each character" },
    ],
    vocabulary: [
      { word: "あ", translation: "a", pronunciation: "ah" },
      { word: "い", translation: "i", pronunciation: "ee" },
      { word: "う", translation: "u", pronunciation: "oo" },
      { word: "え", translation: "e", pronunciation: "eh" },
      { word: "お", translation: "o", pronunciation: "oh" },
    ],
    phrases: [
      { text: "おはよう", translation: "Good morning (casual)", pronunciation: "o-ha-YOH" },
      { text: "ありがとう", translation: "Thank you", pronunciation: "a-ri-ga-TOH" },
    ],
    activities: [
      {
        type: "multiple_choice",
        question: "Which hiragana makes the 'u' sound?",
        options: ["あ", "い", "う", "え"],
        correctIndex: 2,
      },
      {
        type: "match_pairs",
        pairs: [
          { left: "あ", right: "a" },
          { left: "い", right: "i" },
          { left: "う", right: "u" },
          { left: "え", right: "e" },
        ],
      },
      {
        type: "translation",
        prompt: "What does おはよう mean?",
        answer: "Good morning",
      },
    ],
    aiTeacherPrompt: {
      intro:
        "Konnichiwa! Today we start the most important step in Japanese — learning the hiragana alphabet. These 5 vowels are the building blocks of everything.",
      explanation:
        "Japanese has three writing systems: hiragana, katakana, and kanji. Hiragana is the first one to learn. The five vowels あ(a) い(i) う(u) え(e) お(o) appear in nearly every word.",
      encouragement:
        "Sugoi — amazing! Learning hiragana takes patience but you're already making great progress!",
    },
  },
];
