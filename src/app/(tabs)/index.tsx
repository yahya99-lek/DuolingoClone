import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/languageStore";
import { languages } from "@/data/languages";
import { units } from "@/data/units";
import { images } from "@/constants/images";

// ─── Constants ───────────────────────────────────────────────────────────────

const GREETINGS: Record<string, string> = {
  es: "Hola",
  fr: "Bonjour",
  de: "Hallo",
  ja: "こんにちは",
  ko: "안녕",
  zh: "你好",
  pt: "Olá",
};

const STREAK = 12;
const TODAY_XP = 15;
const GOAL_XP = 20;

const TODAY_PLAN = [
  {
    id: "lesson",
    iconName: "book-outline" as const,
    iconBg: "#EEF4FF",
    iconColor: "#4D88FF",
    title: "Lesson",
    subtitle: "At the café",
    completed: true,
  },
  {
    id: "ai-conv",
    iconName: "headset-outline" as const,
    iconBg: "#EEF4FF",
    iconColor: "#4D88FF",
    title: "AI Conversation",
    subtitle: "Talk about your day",
    completed: false,
  },
  {
    id: "words",
    iconName: "chatbubble-ellipses-outline" as const,
    iconBg: "#FFF0F0",
    iconColor: "#FF4D4F",
    title: "New words",
    subtitle: "10 words",
    completed: false,
  },
];

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguage } = useLanguageStore();

  const lang = languages.find((l) => l.code === selectedLanguage);
  const langUnits = units.filter((u) => u.languageCode === selectedLanguage);
  const currentUnit = langUnits[0];

  const firstName = user?.firstName ?? user?.username ?? "Learner";
  const greeting = selectedLanguage ? (GREETINGS[selectedLanguage] ?? "Hello") : "Hello";
  const xpPercent = Math.round((TODAY_XP / GOAL_XP) * 100);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ── Header ──────────────────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-5">
          <View className="flex-row items-center gap-2">
            {lang ? (
              <Image
                source={{ uri: lang.flag }}
                style={{ width: 30, height: 22, borderRadius: 4 }}
              />
            ) : null}
            <Text className="font-poppins-semibold text-base text-text-primary">
              {greeting}, {firstName}! 👋
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center gap-1">
              <Image
                source={images.streakFire}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
              <Text className="font-poppins-semibold text-[15px] text-streak">
                {STREAK}
              </Text>
            </View>
            <TouchableOpacity className="p-0.5">
              <Ionicons name="notifications-outline" size={24} color="#001328" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 gap-4">
          {/* ── Daily Goal Card ─────────────────────────────── */}
          <View className="bg-[#FFF8EF] rounded-[20px] p-[18px] flex-row items-center">
            <View className="flex-1">
              <Text className="font-poppins text-xs text-text-secondary mb-0.5">
                Daily goal
              </Text>
              <Text className="font-poppins-bold text-[28px] text-text-primary leading-9">
                {TODAY_XP}
                <Text className="font-poppins text-base text-text-secondary">
                  {" "}/ {GOAL_XP} XP
                </Text>
              </Text>
              {/* Progress bar — fill width is dynamic so width stays inline */}
              <View className="mt-2.5 h-2 bg-border rounded-lg overflow-hidden">
                <View
                  className="h-2 bg-warning rounded-lg"
                  style={{ width: `${xpPercent}%` }}
                />
              </View>
            </View>
            <Image
              source={images.treasure}
              style={{ width: 72, height: 72, marginLeft: 14 }}
              resizeMode="contain"
            />
          </View>

          {/* ── Continue Learning Card ───────────────────────── */}
          <View className="bg-primary rounded-[20px] p-5 flex-row items-start overflow-hidden">
            <View className="flex-1">
              <Text className="font-poppins text-xs text-white/75 mb-0.5">
                Continue learning
              </Text>
              <Text className="font-poppins-bold text-[28px] text-white leading-9">
                {lang?.name ?? "Spanish"}
              </Text>
              <Text className="font-poppins text-[13px] text-white/75 mb-[18px]">
                A1 • {currentUnit ? `Unit ${currentUnit.order}` : "Unit 1"}
              </Text>
              <TouchableOpacity className="bg-white rounded-xl py-2.5 px-6 self-start">
                <Text className="font-poppins-semibold text-sm text-primary">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
            {/* Palace image has a negative marginTop so it stays inline */}
            <Image
              source={images.palace}
              style={{ width: 105, height: 120, marginLeft: 8, marginTop: -8 }}
              resizeMode="contain"
            />
          </View>

          {/* ── Today's Plan ────────────────────────────────── */}
          <View>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-poppins-semibold text-lg text-text-primary">
                Today's plan
              </Text>
              <TouchableOpacity>
                <Text className="font-poppins-semibold text-sm text-primary">
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <View className="gap-2.5">
              {TODAY_PLAN.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="bg-white rounded-2xl border border-border p-[14px] flex-row items-center gap-3"
                >
                  {/* iconBg is data-driven so backgroundColor stays inline */}
                  <View
                    className="w-11 h-11 rounded-xl items-center justify-center"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <Ionicons name={item.iconName} size={20} color={item.iconColor} />
                  </View>

                  <View className="flex-1">
                    <Text className="font-poppins-medium text-[15px] text-text-primary">
                      {item.title}
                    </Text>
                    <Text className="font-poppins text-xs text-text-secondary mt-px">
                      {item.subtitle}
                    </Text>
                  </View>

                  {item.completed ? (
                    <View className="w-[26px] h-[26px] rounded-full bg-primary items-center justify-center">
                      <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                    </View>
                  ) : (
                    <View className="w-[26px] h-[26px] rounded-full border-2 border-border" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
