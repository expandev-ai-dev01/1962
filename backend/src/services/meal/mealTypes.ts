/**
 * @summary
 * Type definitions for Meal entity and related operations.
 *
 * @module services/meal/mealTypes
 */

import { MealCategory, MealUnit, MealSource } from '@/constants/meal';

/**
 * @interface MealItemEntity
 * @description Represents a food item within a meal.
 */
export interface MealItemEntity {
  id: number;
  mealId: number;
  foodName: string;
  quantity: number;
  unit: MealUnit;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  source: MealSource;
}

/**
 * @interface MealEntity
 * @description Represents a meal entity with its items and calculated totals.
 */
export interface MealEntity {
  id: number;
  userId: string;
  mealDate: string;
  mealTime: string;
  category: MealCategory;
  items: MealItemEntity[];
  totalCalories: number;
  totalProtein: number;
  totalCarbohydrates: number;
  totalFats: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * @interface MealCreateRequest
 * @description Request payload for creating a meal.
 */
export interface MealCreateRequest {
  mealDate: string;
  mealTime: string;
  category: MealCategory;
}

/**
 * @interface MealUpdateRequest
 * @description Request payload for updating a meal.
 */
export interface MealUpdateRequest {
  mealDate?: string;
  mealTime?: string;
  category?: MealCategory;
}

/**
 * @interface MealItemCreateRequest
 * @description Request payload for adding an item to a meal.
 */
export interface MealItemCreateRequest {
  foodName: string;
  quantity: number;
  unit: MealUnit;
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fats?: number;
  source: MealSource;
}

/**
 * @interface MealItemUpdateRequest
 * @description Request payload for updating an item in a meal.
 */
export interface MealItemUpdateRequest {
  quantity?: number;
  unit?: MealUnit;
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fats?: number;
}

/**
 * @interface MealListResponse
 * @description Simplified meal object for list views.
 */
export interface MealListResponse {
  id: number;
  mealDate: string;
  mealTime: string;
  category: MealCategory;
  totalCalories: number;
  itemCount: number;
}
