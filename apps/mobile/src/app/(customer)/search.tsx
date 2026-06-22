import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomerSearchScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <Text className="text-4xl font-bold text-black text-center mt-10">
        CustomerSearchScreen
      </Text>
    </SafeAreaView>
  );
};

export default CustomerSearchScreen;
