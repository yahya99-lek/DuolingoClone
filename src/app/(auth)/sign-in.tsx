import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState, useCallback } from "react";
import { useSignIn, useSSO } from "@clerk/expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { images } from "@/constants/images";
import VerificationModal from "@/components/VerificationModal";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
                                
  const handleOAuth = useCallback(
    async (strategy: "oauth_google" | "oauth_facebook" | "oauth_apple") => {
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy,
          redirectUrl: Linking.createURL("/oauth-callback"),
        });
        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
          router.replace("/");
        }
      } catch (err: any) {
        setError(err?.errors?.[0]?.longMessage ?? err?.message ?? "Social sign in failed.");
      }
    },
    [startSSOFlow],
  );

  const clerkMsg = (err: any) =>
    err?.longMessage ?? err?.message ?? "Something went wrong.";

  const handleSignIn = async () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!signIn) return;

    setLoading(true);
    setError("");

    const { error: createError } = await signIn.create({ identifier: email });
    if (createError) {
      setError(clerkMsg(createError));
      setLoading(false);
      return;
    }

    const { error: sendError } = await signIn.emailCode.sendCode();
    if (sendError) {
      setError(clerkMsg(sendError));
      setLoading(false);
      return;
    }

    setLoading(false);
    setModalVisible(true);
  };

  const handleVerify = async (code: string) => {
    if (!signIn) return;
    const { error: verifyError } = await signIn.emailCode.verifyCode({ code });
    if (verifyError) throw verifyError;

    const { error: finalizeError } = await signIn.finalize();
    if (finalizeError) throw finalizeError;

    setModalVisible(false);
    router.replace("/");
  };

  const handleResend = async () => {
    if (!signIn) return;
    const { error } = await signIn.emailCode.sendCode();
    if (error) throw error;
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text className="h1 mt-2">Welcome back!</Text>
        <Text className="body-md mt-1 text-text-secondary">
          Continue your language journey ✨
        </Text>

        {/* Mascot */}
        <View className="items-center mt-6 mb-6">
          <Image
            source={images.mascotAuth}
            style={styles.mascot}
            resizeMode="contain"
          />
        </View>

        {/* Email field */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="alex@gmail.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Sign In button */}
        <TouchableOpacity
          className="btn-primary mt-6"
          onPress={handleSignIn}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Text className="btn-text">{loading ? "Sending…" : "Sign In"}</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social buttons */}
        <SocialButton
          icon={<GoogleIcon />}
          label="Continue with Google"
          onPress={() => handleOAuth("oauth_google")}
        />
        <SocialButton
          icon={<FacebookIcon />}
          label="Continue with Facebook"
          onPress={() => handleOAuth("oauth_facebook")}
        />
        <SocialButton
          icon={<AppleIcon />}
          label="Continue with Apple"
          onPress={() => handleOAuth("oauth_apple")}
        />

        {/* Sign Up footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => router.replace("/sign-up")}
            activeOpacity={0.7}
          >
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <VerificationModal
        visible={modalVisible}
        email={email}
        onClose={() => setModalVisible(false)}
        onVerify={handleVerify}
        onResend={handleResend}
      />
    </SafeAreaView>
  );
}

function SocialButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.socialBtn} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.socialIconBox}>{icon}</View>
      <Text style={styles.socialLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function GoogleIcon() {
  return <Image source={images.iconGoogle} style={styles.socialIcon} resizeMode="contain" />;
}

function FacebookIcon() {
  return <Image source={images.iconFacebook} style={styles.socialIcon} resizeMode="contain" />;
}

function AppleIcon() {
  return <Image source={images.iconApple} style={styles.socialIcon} resizeMode="contain" />;
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  backIcon: {
    fontSize: 28,
    color: "#001328",
    fontFamily: "Poppins-Regular",
    lineHeight: 34,
  },
  mascot: {
    width: 160,
    height: 160,
  },
  inputWrapper: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
  },
  inputLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 2,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "#001328",
    padding: 0,
    margin: 0,
  },
  errorText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#EF4444",
    marginTop: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6B7280",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  socialIconBox: {
    width: 28,
    height: 28,
    marginRight: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    width: 28,
    height: 28,
  },
  socialLabel: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#001328",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6B7280",
  },
  footerLink: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#6C4EF5",
  },
});
