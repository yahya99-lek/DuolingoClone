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
import { useSignUp, useSSO } from "@clerk/expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { images } from "@/constants/images";
import VerificationModal from "@/components/VerificationModal";

WebBrowser.maybeCompleteAuthSession();

export default function SignUp() {
  const { signUp } = useSignUp();
  const { startSSOFlow } = useSSO();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
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
        setError(err?.errors?.[0]?.longMessage ?? err?.message ?? "Social sign up failed.");
      }
    },
    [startSSOFlow],
  );

  const clerkMsg = (err: unknown) => {
    if (err instanceof Error) {
      const maybeErr = err as Error & { longMessage?: unknown };
      return typeof maybeErr.longMessage === "string"
        ? maybeErr.longMessage
        : maybeErr.message || "Something went wrong.";
    }

    if (typeof err === "object" && err !== null) {
      const maybeErr = err as { longMessage?: unknown; message?: unknown };
      if (typeof maybeErr.longMessage === "string") {
        return maybeErr.longMessage;
      }
      if (typeof maybeErr.message === "string") {
        return maybeErr.message;
      }
    }

    return "Something went wrong.";
  };

  const handleSignUp = async () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    if (!signUp) return;

    setLoading(true);
    setError("");

    try {
      const { error: pwError } = await signUp.password({ emailAddress: email, password });
      if (pwError) {
        setError(clerkMsg(pwError));
        return;
      }

      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) {
        setError(clerkMsg(sendError));
        return;
      }

      setModalVisible(true);
    } catch (err: unknown) {
      setError(clerkMsg(err) || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    if (!signUp) return;
    const { error: verifyError } = await signUp.verifications.verifyEmailCode({ code });
    if (verifyError) throw verifyError;

    const { error: finalizeError } = await signUp.finalize();
    if (finalizeError) throw finalizeError;

    setModalVisible(false);
    router.replace("/");
  };

  const handleResend = async () => {
    if (!signUp) return;
    const { error } = await signUp.verifications.sendEmailCode();
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
        <Text className="h1 mt-2">Create your account</Text>
        <Text className="body-md mt-1 text-text-secondary">
          Start your language journey today ✨
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

        {/* Password field */}
        <View style={[styles.inputWrapper, { marginTop: 12 }]}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!passwordVisible}
              autoComplete="new-password"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible((v) => !v)}
              activeOpacity={0.7}
              style={styles.eyeBtn}
            >
              <Text style={styles.eyeIcon}>{passwordVisible ? "🙈" : "👁"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Sign Up button */}
        <TouchableOpacity
          className="btn-primary mt-6"
          onPress={handleSignUp}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Text className="btn-text">{loading ? "Creating…" : "Sign Up"}</Text>
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

        {/* Sign In footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => router.replace("/sign-in")}
            activeOpacity={0.7}
          >
            <Text style={styles.footerLink}>Log in</Text>
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
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  eyeBtn: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 18,
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
