/**
 * @summary
 * Default values and constants for Meal entity.
 * Defines categories, units, and validation limits.
 *
 * @module constants/meal/mealDefaults
 */

/**
 * @interface MealCategoriesType
 * @description Available categories for meals.
 */
export const MEAL_CATEGORIES = {
  BREAKFAST: 'Café da Manhã',
  LUNCH: 'Almoço',
  DINNER: 'Jantar',
  SNACK: 'Lanche',
} as const;

export type MealCategory = (typeof MEAL_CATEGORIES)[keyof typeof MEAL_CATEGORIES];

/**
 * @interface MealUnitsType
 * @description Available units of measurement for food items.
 */
export const MEAL_UNITS = {
  GRAMS: 'g',
  KILOGRAMS: 'kg',
  MILLILITERS: 'ml',
  LITERS: 'l',
  UNIT: 'unidade(s)',
  SLICE: 'fatia(s)',
  CUP: 'xícara(s)',
  TABLESPOON: 'colher(es) de sopa',
  TEASPOON: 'colher(es) de chá',
} as const;

export type MealUnit = (typeof MEAL_UNITS)[keyof typeof MEAL_UNITS];

/**
 * @interface MealSourcesType
 * @description Source of the food item data.
 */
export const MEAL_SOURCES = {
  DATABASE: 'database',
  MANUAL: 'manual',
} as const;

export type MealSource = (typeof MEAL_SOURCES)[keyof typeof MEAL_SOURCES];

/**
 * @interface MealLimitsType
 * @description Validation constraints for Meal entity fields.
 */
export const MEAL_LIMITS = {
  FOOD_NAME_MIN: 2,
  FOOD_NAME_MAX: 100,
  QUANTITY_MIN: 0.01,
  MACRO_MIN: 0,
} as const;
