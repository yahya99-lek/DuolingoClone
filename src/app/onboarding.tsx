import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { images } from "@/constants/images";

export default function Onboarding() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View className="flex-1 px-6">
          {/* Header: mascot logo + app name */}
          <View className="flex-row items-center mt-4">
            <Image
              source={images.mascotLogo}
              className="w-9 h-9"
              resizeMode="contain"
            />
            <Text className="font-poppins-bold text-[22px] text-text-primary ml-2">
              linguo
            </Text>
          </View>

          {/* Hero heading */}
          <View className="mt-8">
            <Text className="h1">Your AI language</Text>
            <Text className="font-poppins-bold text-[32px] leading-9.5 text-primary">
              teacher.
            </Text>
            <Text className="body-md mt-2 text-text-secondary">
              Real conversations, personalized{"\n"}lessons, anytime, anywhere.
            </Text>
          </View>

          {/* Mascot illustration + floating speech bubbles */}
          <View className="flex-1 items-center justify-center relative">
            <Image
              source={images.mascotWelcome}
              className="w-75 h-75"
              resizeMode="contain"
            />

            {/* "Hello!" — left side */}
            <View
              className="absolute bg-white rounded-3xl px-4.5 py-2.5 border-[1.5px] border-border left-0 top-[30%]"
              style={[styles.shadow, styles.rotateNeg5]}
            >
              <Text className="font-poppins-semibold text-[14px] text-text-primary">
                Hello!
              </Text>
            </View>

            {/* "¡Hola!" — upper right, purple tint */}
            <View
              className="absolute bg-[#ede9fe] rounded-3xl px-4.5 py-2.5 border-[1.5px] border-[#ddd6fe] right-0 top-[8%]"
              style={[styles.shadow, styles.rotate5]}
            >
              <Text className="font-poppins-semibold text-[14px] text-primary">
                ¡Hola!
              </Text>
            </View>

            {/* "你好!" — lower right */}
            <View
              className="absolute bg-white rounded-3xl px-4.5 py-2.5 border-[1.5px] border-border right-2 top-[58%]"
              style={[styles.shadow, styles.rotate3]}
            >
              <Text className="font-poppins-semibold text-[14px] text-[#ef4444]">
                你好!
              </Text>
            </View>
          </View>

          {/* Get Started CTA */}
          <TouchableOpacity
            className="btn-primary mb-8"
            onPress={() => router.push("/sign-up")}
            activeOpacity={0.85}
          >
            <View className="flex-row items-center gap-2">
              <Text className="btn-text">Get Started</Text>
              <Text className="font-poppins-bold text-[20px] text-white leading-6">
                ›
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  rotateNeg5: {
    transform: [{ rotate: "-5deg" }],
  },
  rotate5: {
    transform: [{ rotate: "5deg" }],
  },
  rotate3: {
    transform: [{ rotate: "3deg" }],
  },
});
