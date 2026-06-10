import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/expo";
import { router } from "expo-router";

export default function Home() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/onboarding");
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
        <TouchableOpacity
          className="btn-primary w-full"
          onPress={handleSignOut}
          activeOpacity={0.85}
        >
          <Text className="btn-text">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
