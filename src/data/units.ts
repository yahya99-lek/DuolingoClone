import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish units
  {
    id: "es-unit-1",
    languageCode: "es",
    title: "Greetings & Basics",
    description: "Learn how to say hello, introduce yourself, and be polite",
    order: 1,
    color: "#6C4EF5",
    lessonIds: ["es-lesson-1", "es-lesson-2"],
  },
  {
    id: "es-unit-2",
    languageCode: "es",
    title: "Numbers & Colors",
    description: "Count from 1–20 and name common colors",
    order: 2,
    color: "#21C16B",
    lessonIds: ["es-lesson-3"],
  },

  // French units
  {
    id: "fr-unit-1",
    languageCode: "fr",
    title: "Greetings & Basics",
    description: "Learn how to greet people and start a conversation",
    order: 1,
    color: "#4D88FF",
    lessonIds: ["fr-lesson-1", "fr-lesson-2"],
  },

  // Japanese units
  {
    id: "ja-unit-1",
    languageCode: "ja",
    title: "Hiragana Basics",
    description: "Learn the first 10 hiragana characters",
    order: 1,
    color: "#FF8A00",
    lessonIds: ["ja-lesson-1"],
  },
];
