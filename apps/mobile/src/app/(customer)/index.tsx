import { useAuth } from "@/context/auth-context";
import { Text, View } from "react-native";

const CustomerHomeScreen = () => {
  const { user } = useAuth();
  return (
    <View className="flex-1 items-center justify-center gap-6">
      <Text className="text-4xl font-bold">CustomerHomeScreen</Text>
      <Text className="text-xl font-semibold">
        Welcome {user?.firstName} {user?.lastName}
      </Text>
    </View>
  );
};

export default CustomerHomeScreen;
