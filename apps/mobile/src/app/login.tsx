import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/auth-context";
import { router } from "expo-router";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) return Alert.alert("Please fill in all fields");
    setIsLoading(true);

    try {
      await login(email, password);
      router.replace("/");
    } catch {
      Alert.alert("Login failed", "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text className="text-3xl font-black mb-8">Welcome Back</Text>

        <TextInput
          className="border border-[#ddd] rounded-lg p-3.5 mb-4 text-base"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="border border-[#ddd] rounded-lg p-3.5 mb-4 text-base"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          className="bg-primary rounded-lg p-4 items-center mb-4"
          onPress={() => {
            void handleLogin();
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-bold">Login</Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.push("/register")}>
          <Text className="text-center text-primary">
            Don't have an account? Register
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 32 },
});
