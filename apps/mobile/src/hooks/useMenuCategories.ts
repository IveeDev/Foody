import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { menuApi, menuKeys } from "@/lib/api/menu";
import { Alert } from "react-native";

export function useCategories(restaurantId: string) {
  return useQuery({
    queryKey: menuKeys.categories(restaurantId ?? ""),
    queryFn: () => menuApi.getCategories(restaurantId!),
    enabled: !!restaurantId,
  });
}

export function useCategoryMutations(restaurantId: string | undefined) {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: menuKeys.categories(restaurantId ?? ""),
    });

  const add = useMutation({
    mutationFn: menuApi.createCategory,
    onSuccess: invalidate,
    onError: (e: any) =>
      Alert.alert(
        "Error",
        e?.response?.data?.message ?? "Could not create category",
      ),
  });

  const remove = useMutation({
    mutationFn: menuApi.deleteCategory,
    onSuccess: () => {
      invalidate();
      queryClient.invalidateQueries({
        queryKey: menuKeys.items(restaurantId ?? ""),
      });
    },
    onError: (e: any) =>
      Alert.alert(
        "Error",
        e?.response?.data?.message ?? "Could not delete category",
      ),
  });

  return { add, remove };
}
