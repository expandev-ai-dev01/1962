import { authenticatedClient } from '@/core/lib/api';
import type { Meal, MealListFilters } from '../types/models';
import type { MealFormOutput, MealItemFormOutput } from '../types/forms';

export const mealService = {
  async list(filters?: MealListFilters): Promise<Meal[]> {
    const { data } = await authenticatedClient.get('/meal', { params: filters });
    return data.data;
  },

  async get(id: string): Promise<Meal> {
    const { data } = await authenticatedClient.get(`/meal/${id}`);
    return data.data;
  },

  async create(meal: MealFormOutput): Promise<Meal> {
    const { data } = await authenticatedClient.post('/meal', meal);
    return data.data;
  },

  async update(id: string, meal: Partial<MealFormOutput>): Promise<Meal> {
    const { data } = await authenticatedClient.put(`/meal/${id}`, meal);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/meal/${id}`);
  },

  async addItem(mealId: string, item: MealItemFormOutput): Promise<Meal> {
    const { data } = await authenticatedClient.post(`/meal/${mealId}/item`, item);
    return data.data;
  },

  async updateItem(
    mealId: string,
    itemId: string,
    item: Partial<MealItemFormOutput>
  ): Promise<Meal> {
    const { data } = await authenticatedClient.put(`/meal/${mealId}/item/${itemId}`, item);
    return data.data;
  },

  async deleteItem(mealId: string, itemId: string): Promise<Meal> {
    const { data } = await authenticatedClient.delete(`/meal/${mealId}/item/${itemId}`);
    return data.data;
  },
};
