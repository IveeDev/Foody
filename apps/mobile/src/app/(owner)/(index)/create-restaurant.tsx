import { openSettings } from "expo-linking";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  Image,
} from "react-native";
import { useImageUploader } from "@/lib/uploadthing";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateRestaurant } from "@/hooks/useCreateRestaurants";

export default function CreateRestaurantScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { openImagePicker, isUploading } = useImageUploader("restaurantImage", {
    onClientUploadComplete: (res) => {
      setImageUrl(res[0].ufsUrl);
      Alert.alert("Image uploaded successfully");
    },
    onUploadError: (error) => {
      Alert.alert("Upload failed", error.message);
    },
  });

  const { mutate: createRestaurant, isPending } = useCreateRestaurant();

  function handleSubmit() {
    if (!name || !address || !cuisineType) {
      return Alert.alert("Please fill in all required fields");
    }
    createRestaurant({ name, address, cuisineType, description, imageUrl });
  }

  return (
    <SafeAreaView className="bg-white">
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="text-2xl font-extrabold mb-6">
          Create Your Restaurant
        </Text>

        <Pressable
          className="justify-center items-center mb-4 overflow-hidden border-2 border-dashed border-gray-300 h-[180px] rounded-xl"
          onPress={() =>
            void openImagePicker({
              source: "library",
              onInsufficientPermissions: () => {
                Alert.alert(
                  "No permissions",
                  "You need to grant permission to your phone",
                  [
                    { text: "Dismiss" },
                    { text: "Open Settings", onPress: void openSettings },
                  ],
                );
              },
            })
          }
          disabled={isUploading}
        >
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} className="w-full h-full" />
          ) : (
            <Text className="text-gray-400 text-center text-sm">
              {isUploading ? "Uploading..." : "Tap to upload restaurant image"}
            </Text>
          )}
        </Pressable>

        <TextInput
          className="border border-[#ddd] rounded-[8px] p-4 mb-4 text-base"
          placeholder="Restaurant name *"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="border border-[#ddd] rounded-[8px] p-4 mb-4 text-base"
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />
        <TextInput
          className="border border-[#ddd] rounded-[8px] p-4 mb-4 text-base"
          placeholder="Address *"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          className="border border-[#ddd] rounded-[8px] p-4 mb-4 text-base"
          placeholder="Cuisine type * (e.g. Italian, Chinese)"
          value={cuisineType}
          onChangeText={setCuisineType}
        />

        <Pressable
          className="bg-[#FF6B35] rounded-xl p-4 items-center mt-4"
          onPress={() => {
            handleSubmit();
          }}
          disabled={isPending || isUploading}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-base">
              Create Restaurant
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
