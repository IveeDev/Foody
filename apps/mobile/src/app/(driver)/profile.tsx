import { Pressable, Text, View } from "react-native";

import { useAuth } from "@/context/auth-context";

const DriverProfileScreen = () => {
  const { user, logout } = useAuth();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-4xl font-bold">DriverProfileScreen</Text>
      <Text className="text-xl font-semibold">
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

export default DriverProfileScreen;
