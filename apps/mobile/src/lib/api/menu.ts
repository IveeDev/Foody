// lib/api/menu.ts
import { api } from "@/lib/axios";
import { MenuCategory, MenuItem } from "@food-delivery/types";

export interface CreateCategoryPayload {
  name: string;
}

export interface CreateMenuItemPayload {
  categoryId: string;
  name: string;
  price: string;
  imageUrl: string | null;
}

export const menuApi = {
  getCategories: (restaurantId: string) =>
    api
      .get<MenuCategory[]>(`/menu/categories/${restaurantId}`)
      .then((r) => r.data),

  createCategory: (dto: CreateCategoryPayload) =>
    api.post<MenuCategory>("/menu/categories", dto).then((r) => r.data),

  deleteCategory: (id: string) => api.delete(`/menu/categories/${id}`),

  getItems: (restaurantId: string) =>
    api.get<MenuItem[]>(`/menu/items/${restaurantId}`).then((r) => r.data),

  createItem: (dto: CreateMenuItemPayload) =>
    api.post<MenuItem>("/menu/items", dto).then((r) => r.data),

  updateItem: (id: string, dto: Partial<MenuItem>) =>
    api.patch<MenuItem>(`/menu/items/${id}`, dto).then((r) => r.data),

  deleteItem: (id: string) => api.delete(`/menu/items/${id}`),
};

export const menuKeys = {
  categories: (restaurantId: string) => ["categories", restaurantId] as const,
  items: (restaurantId: string) => ["menu-items", restaurantId] as const,
};
