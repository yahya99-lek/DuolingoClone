import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/expo";
import { router } from "expo-router";
import { useLanguageStore } from "@/store/languageStore";
import { languages } from "@/data/languages";

export default function Home() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const { selectedLanguage, clearSelectedLanguage } = useLanguageStore();
  const activeLang = languages.find((l) => l.code === selectedLanguage);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err: any) {
      console.error("Sign out failed:", err);
    }

    router.replace("/onboarding");
  };

  const handleClearLanguage = () => {
    clearSelectedLanguage();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-1 justify-center items-center px-6 gap-6">
        <Text className="h1 text-center">Welcome back!</Text>
        {user?.primaryEmailAddress?.emailAddress ? (
          <Text className="body-md text-text-secondary text-center">
            {user.primaryEmailAddress.emailAddress}
          </Text>
        ) : null}
        {activeLang ? (
          <View className="items-center gap-2">
            <Image
              source={{ uri: activeLang.flag }}
              style={{ width: 56, height: 56, borderRadius: 28 }}
            />
            <Text className="body-md font-semibold">{activeLang.name}</Text>
          </View>
        ) : null}
        <TouchableOpacity
          className="btn-primary w-full"
          onPress={() => router.push("/language-selection")}
          activeOpacity={0.85}
        >
          <Text className="btn-text">Choose a Language</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="btn-secondary w-full"
          onPress={handleSignOut}
          activeOpacity={0.85}
        >
          <Text className="btn-text-secondary">Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full items-center py-3"
          onPress={handleClearLanguage}
          activeOpacity={0.7}
        >
          <Text className="caption text-red-400">Clear language (test)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
