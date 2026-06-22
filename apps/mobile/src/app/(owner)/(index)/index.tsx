import React from "react";
import { router } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useMyRestaurant } from "@/hooks/useMyRestaurant";
import { useToggleRestaurant } from "@/hooks/useToggleRestaurant";

const OwnerHomeScreen = () => {
  const { data: restaurant, isLoading: isLoadingRestaurant } =
    useMyRestaurant();
  const { mutate: toggleOpen, isPending } = useToggleRestaurant(restaurant);

  useEffect(() => {
    if (isLoadingRestaurant) return;
    if (!restaurant)
      return router.replace("/(owner)/(index)/create-restaurant");
  }, [restaurant, isLoadingRestaurant]);

  if (isLoadingRestaurant) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ff6b35" />
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-center">OwnerHomeScreen</Text>
      <Pressable
        className={`rounded-full py-3 px-6 ${
          restaurant?.isOpen ? "bg-red-500" : "bg-green-500"
        } ${isPending ? "opacity-50" : ""}`}
        onPress={() => toggleOpen()}
        disabled={isPending}
      >
        <Text className="text-center text-white font-semibold">
          {isPending
            ? "Updating..."
            : restaurant?.isOpen
              ? "Open - tap to close"
              : "Closed - tap to open"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/(owner)/(index)/edit-restaurant")}
        className="rounded-full p-4 mt-4 bg-green-500"
      >
        <Text className="text-center text-white underline font-semibold">
          Edit Restaurant
        </Text>
      </Pressable>
    </View>
  );
};

export default OwnerHomeScreen;
