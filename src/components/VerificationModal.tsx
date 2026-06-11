import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRef, useState, useEffect } from "react";

interface VerificationModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
}

export default function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
  onResend,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      setError("");
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [visible]);

  useEffect(() => {
    if (code.length === 6 && !loading) {
      handleVerify(code);
    }
  }, [code]);

  const handleVerify = async (digits: string) => {
    setLoading(true);
    setError("");
    try {
      await onVerify(digits);
    } catch (err: any) {
      setError(err?.longMessage ?? err?.errors?.[0]?.longMessage ?? "Invalid code. Please try again.");
      setCode("");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (isResending) return;

    setCode("");
    setError("");
    setIsResending(true);

    try {
      await onResend();
    } catch (err: any) {
      setError(err?.longMessage ?? err?.errors?.[0]?.longMessage ?? "Failed to resend code.");
    } finally {
      setIsResending(false);
    }
  };

  const handleChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(digits);
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + "*".repeat(b.length) + c)
    : "your email";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.sheet}>
          {/* Handle bar */}
          <View style={styles.handle} />

          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to{"\n"}
            <Text style={styles.emailHighlight}>{maskedEmail}</Text>
          </Text>

          {/* Code boxes — tap anywhere to open keyboard */}
          <Pressable onPress={() => inputRef.current?.focus()} style={styles.boxRow}>
            {Array.from({ length: 6 }).map((_, i) => {
              const isActive = code.length === i && !loading;
              const filled = code[i] !== undefined;
              return (
                <View
                  key={i}
                  style={[
                    styles.box,
                    filled && styles.boxFilled,
                    isActive && styles.boxActive,
                  ]}
                >
                  {loading && i === 0 ? (
                    <ActivityIndicator size="small" color="#6C4EF5" />
                  ) : (
                    <Text style={styles.boxText}>{code[i] ?? ""}</Text>
                  )}
                </View>
              );
            })}
          </Pressable>

          {/* Hidden input that drives the code state */}
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleChange}
            keyboardType="number-pad"
            maxLength={6}
            style={styles.hiddenInput}
            caretHidden
            autoComplete="one-time-code"
            editable={!loading}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.resendRow} activeOpacity={0.7} onPress={handleResend}>
            <Text style={styles.resendText}>
              Didn't receive it?{" "}
              <Text style={styles.resendLink}>Resend code</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 12,
    paddingBottom: 48,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E5E7EB",
    marginBottom: 24,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: "#001328",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  emailHighlight: {
    fontFamily: "Poppins-SemiBold",
    color: "#001328",
  },
  boxRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },
  box: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#F6F7FB",
    alignItems: "center",
    justifyContent: "center",
  },
  boxFilled: {
    borderColor: "#6C4EF5",
    backgroundColor: "#EDE9FE",
  },
  boxActive: {
    borderColor: "#6C4EF5",
    borderWidth: 2,
    backgroundColor: "#ffffff",
  },
  boxText: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: "#001328",
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  errorText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 8,
  },
  resendRow: {
    marginTop: 4,
  },
  resendText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  resendLink: {
    fontFamily: "Poppins-SemiBold",
    color: "#6C4EF5",
  },
});
