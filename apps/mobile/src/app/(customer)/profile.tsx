import { Pressable, Text, View } from "react-native";

import { useAuth } from "@/context/auth-context";

const CustomerProfileScreen = () => {
  const { user, logout } = useAuth();
  return (
    <View className="flex-1 items-center justify-center gap-6 bg-slate-100">
      <Text className="text-4xl font-bold text-slate-900">
        CustomerProfileScreen
      </Text>
      <Text className="text-xl font-semibold">
        Welcome {user?.firstName} {user?.lastName}
      </Text>
      <Pressable
        className="bg-red-500 px-8 py-4 rounded-2xl"
        onPress={() => {
          void logout();
        }}
      >
        <Text className="text-white font-bold">Logout</Text>
      </Pressable>
    </View>
  );
};

export default CustomerProfileScreen;
