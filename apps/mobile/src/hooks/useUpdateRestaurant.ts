// hooks/useUpdateRestaurant.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { router } from "expo-router";
import {
  restaurantsApi,
  restaurantKeys,
  UpdateRestaurantPayload,
} from "@/lib/api/restaurants";

export function useUpdateRestaurant(restaurantId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateRestaurantPayload) =>
      restaurantsApi.update(restaurantId!, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.mine });
      router.back();
    },
    onError: (e: any) => {
      Alert.alert(
        "Error",
        e?.response?.data?.message ?? "Something went wrong",
      );
    },
  });
}
