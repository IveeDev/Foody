import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { menuApi, menuKeys } from "@/lib/api/menu";
import { Alert } from "react-native";

export function useMenuItems(restaurantId: string) {
  return useQuery({
    queryKey: menuKeys.items(restaurantId ?? ""),
    queryFn: () => menuApi.getItems(restaurantId!),
    enabled: !!restaurantId,
  });
}

export function useMenuItemMutations(restaurantId: string | undefined) {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: menuKeys.items(restaurantId ?? ""),
    });

  const add = useMutation({
    mutationFn: menuApi.createItem,
    onSuccess: invalidate,
    onError: (e: any) =>
      Alert.alert(
        "Error",
        e?.response?.data?.message ?? "Could not create item",
      ),
  });

  const remove = useMutation({
    mutationFn: menuApi.deleteItem,
    onSuccess: invalidate,
    onError: (e: any) =>
      Alert.alert(
        "Error",
        e?.response?.data?.message ?? "Could not delete item",
      ),
  });

  const toggle = useMutation({
    mutationFn: ({ id, isAvailable }: { id: string; isAvailable: boolean }) =>
      menuApi.updateItem(id, { isAvailable }),
    onSuccess: invalidate,
    onError: (e: any) =>
      Alert.alert(
        "Error",
        e?.response?.data?.message ?? "Could not update availability",
      ),
  });

  return { add, toggle, remove };
}
