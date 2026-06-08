import { View, Text, TouchableOpacity } from "react-native";
import { Stack, router } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center items-center bg-white px-6 gap-4">
        <Text className="h1 text-center">Welcome to Duolingo</Text>
        <TouchableOpacity
          className="btn-primary w-full"
          onPress={() => router.push("/onboarding")}
          activeOpacity={0.85}
        >
          <Text className="btn-text">View Onboarding</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
