import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { languages } from "@/data/languages";
import { images } from "@/constants/images";
import { useLanguageStore } from "@/store/languageStore";
import type { LanguageCode } from "@/types/learning";

export default function LanguageSelection() {
  const [selected, setSelected] = useState<LanguageCode>("es");
  const [search, setSearch] = useState("");
  const { setSelectedLanguage } = useLanguageStore();

  const filtered = languages.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    setSelectedLanguage(selected);
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text className="h3 flex-1 text-center" style={{ marginRight: 44 }}>
          Choose a language
        </Text>
      </View>

      {/* Search bar */}
      <View className="px-5 mb-4">
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search languages"
            placeholderTextColor="#9ca3af"
            underlineColorAndroid="transparent"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Section header */}
      <Text className="h4 px-5 mb-2">Popular</Text>

      {/* Language list */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 8 }}
      >
        {filtered.map((lang) => {
          const isSelected = selected === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              onPress={() => setSelected(lang.code)}
              activeOpacity={0.75}
              style={[
                styles.languageItem,
                isSelected ? styles.languageItemSelected : styles.languageItemDefault,
              ]}
            >
              <Image source={{ uri: lang.flag }} style={styles.flag} />
              <View className="flex-1 ml-3">
                <Text className="h4">{lang.name}</Text>
                <Text className="caption">{lang.learners}</Text>
              </View>
              {isSelected ? (
                <View style={styles.checkCircle}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
              ) : (
                <Text style={styles.chevron}>›</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Confirm button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          className="btn-primary"
          onPress={handleConfirm}
          activeOpacity={0.85}
        >
          <Text className="btn-text">Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Earth illustration */}
      <Image source={images.earth} style={styles.earthImage} resizeMode="cover" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    color: "#001328",
    lineHeight: 28,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f7fb",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#001328",
    padding: 0,
    margin: 0,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1.5,
  },
  languageItemSelected: {
    backgroundColor: "#f5f3ff",
    borderColor: "#6c4ef5",
  },
  languageItemDefault: {
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
  },
  flag: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#6c4ef5",
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: {
    color: "#ffffff",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    lineHeight: 18,
  },
  chevron: {
    fontFamily: "Poppins-Regular",
    fontSize: 22,
    color: "#9ca3af",
    lineHeight: 26,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  earthImage: {
    width: "100%",
    height: 130,
  },
});
