// hooks/useToggleRestaurantOpen.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restaurantsApi, restaurantKeys } from "@/lib/api/restaurants";
import { RestaurantType } from "@food-delivery/types";

export function useToggleRestaurant(
  restaurant: RestaurantType | null | undefined,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      restaurantsApi.update(restaurant!.id, { isOpen: !restaurant?.isOpen }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: restaurantKeys.mine });
    },
  });
}
