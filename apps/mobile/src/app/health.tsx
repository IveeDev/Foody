import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { HealthCheckResponse } from "@food-delivery/types";

export default function Index() {
  const {
    data: health,
    error,
    isLoading,
  } = useQuery<HealthCheckResponse>({
    queryKey: ["health"],
    queryFn: () =>
      api.get<HealthCheckResponse>("/health").then((res) => res.data),
  });
  return (
    <View style={styles.container}>
      <Text>Welcome To foody!!!</Text>
      <Text>Connection Status</Text>
      {isLoading && <ActivityIndicator color="#ff6b35" size="large" />}

      {health && (
        <View>
          <Text className="text-green-600">API status : {health.status}</Text>
          <Text className="text-green-600">
            {new Date(health.timestamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      )}

      {error && (
        <View className="bg-amber-500">
          <Text className="text-red-600">
            Could not reach the API : {error.message}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
