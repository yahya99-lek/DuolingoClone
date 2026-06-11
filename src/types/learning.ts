export type LanguageCode = "es" | "fr" | "de" | "ja" | "pt" | "ko" | "zh";

export type Language = {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  color: string;
  description: string;
  learners: string;
};

export type ActivityType =
  | "multiple_choice"
  | "translation"
  | "fill_in_blank"
  | "match_pairs"
  | "listen_and_select";

export type VocabItem = {
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
};

export type Phrase = {
  text: string;
  translation: string;
  pronunciation?: string;
};

export type MultipleChoiceActivity = {
  type: "multiple_choice";
  question: string;
  options: string[];
  correctIndex: number;
};

export type TranslationActivity = {
  type: "translation";
  prompt: string;
  answer: string;
  hint?: string;
};

export type FillInBlankActivity = {
  type: "fill_in_blank";
  sentence: string;
  answer: string;
  options: string[];
};

export type MatchPairsActivity = {
  type: "match_pairs";
  pairs: { left: string; right: string }[];
};

export type ListenAndSelectActivity = {
  type: "listen_and_select";
  audioText: string;
  options: string[];
  correctIndex: number;
};

export type Activity =
  | MultipleChoiceActivity
  | TranslationActivity
  | FillInBlankActivity
  | MatchPairsActivity
  | ListenAndSelectActivity;

export type LessonGoal = {
  description: string;
};

export type AITeacherPrompt = {
  intro: string;
  explanation: string;
  encouragement: string;
};

export type Lesson = {
  id: string;
  unitId: string;
  title: string;
  description: string;
  xpReward: number;
  durationMinutes: number;
  goals: LessonGoal[];
  vocabulary: VocabItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacherPrompt: AITeacherPrompt;
};

export type Unit = {
  id: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  order: number;
  color: string;
  lessonIds: string[];
};
