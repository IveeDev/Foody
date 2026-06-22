// hooks/useCreateRestaurant.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";
import { restaurantsApi } from "@/lib/api/restaurants";

export function useCreateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restaurantsApi.create,
    onSuccess: (restaurant) => {
      queryClient.setQueryData(["my-restaurant"], restaurant);
      router.replace("/(owner)/(index)");
    },
    onError: (e: any) => {
      Alert.alert(
        "Error",
        e?.response?.data?.message ?? "Something went wrong",
      );
    },
  });
}
