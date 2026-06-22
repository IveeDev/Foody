// lib/api/restaurants.ts
import { api } from "@/lib/axios";
import { RestaurantType } from "@food-delivery/types";

export type UpdateRestaurantPayload = Partial<
  Pick<
    RestaurantType,
    "name" | "description" | "address" | "cuisineType" | "imageUrl" | "isOpen"
  >
>;

export const restaurantsApi = {
  create: (dto: Omit<UpdateRestaurantPayload, "isOpen">) =>
    api.post<RestaurantType>("/restaurants", dto).then((res) => res.data),

  update: (id: string, dto: UpdateRestaurantPayload) =>
    api
      .patch<RestaurantType>(`/restaurants/${id}`, dto)
      .then((res) => res.data),

  findMine: () =>
    api.get<RestaurantType | null>("/restaurants/mine").then((res) => res.data),
};

export const restaurantKeys = {
  mine: ["my-restaurant"] as const,
};
