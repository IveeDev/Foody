import React from "react";
import { Pressable, Text, View } from "react-native";

import { useAuth } from "@/context/auth-context";

const OwnerProfileScreen = () => {
  const { user, logout } = useAuth();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>OwnerProfileScreen</Text>
      <Text>
        Welcome {user?.firstName} {user?.lastName}
      </Text>
      <Pressable
        className="bg-red-500 px-4 py-2 rounded-lg mt-4"
        onPress={() => {
          void logout();
        }}
      >
        <Text className="text-white font-bold">Logout</Text>
      </Pressable>
    </View>
  );
};

export default OwnerProfileScreen;
