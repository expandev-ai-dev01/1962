/**
 * @summary
 * Validation schemas for Meal entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/meal/mealValidation
 */

import { z } from 'zod';
import { MEAL_CATEGORIES, MEAL_UNITS, MEAL_SOURCES, MEAL_LIMITS } from '@/constants/meal';

// Helper to validate date is not future
const isNotFutureDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date <= today;
};

// Helper to validate time is not future if date is today
const isNotFutureTime = (timeStr: string, dateStr: string) => {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  if (dateStr === todayStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if (hours > currentHours || (hours === currentHours && minutes > currentMinutes)) {
      return false;
    }
  }
  return true;
};

/**
 * Schema for creating a meal
 */
export const createMealSchema = z
  .object({
    mealDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
      .refine(isNotFutureDate, 'Date cannot be in the future'),
    mealTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
    category: z.enum([
      MEAL_CATEGORIES.BREAKFAST,
      MEAL_CATEGORIES.LUNCH,
      MEAL_CATEGORIES.DINNER,
      MEAL_CATEGORIES.SNACK,
    ]),
  })
  .superRefine((data, ctx) => {
    if (!isNotFutureTime(data.mealTime, data.mealDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Time cannot be in the future for today',
        path: ['mealTime'],
      });
    }
  });

/**
 * Schema for updating a meal
 */
export const updateMealSchema = z
  .object({
    mealDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .refine(isNotFutureDate)
      .optional(),
    mealTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional(),
    category: z
      .enum([
        MEAL_CATEGORIES.BREAKFAST,
        MEAL_CATEGORIES.LUNCH,
        MEAL_CATEGORIES.DINNER,
        MEAL_CATEGORIES.SNACK,
      ])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mealDate && data.mealTime && !isNotFutureTime(data.mealTime, data.mealDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Time cannot be in the future for today',
        path: ['mealTime'],
      });
    }
  });

/**
 * Schema for adding a meal item
 */
export const createItemSchema = z
  .object({
    foodName: z.string().min(MEAL_LIMITS.FOOD_NAME_MIN).max(MEAL_LIMITS.FOOD_NAME_MAX),
    quantity: z.number().positive(),
    unit: z.enum([
      MEAL_UNITS.GRAMS,
      MEAL_UNITS.KILOGRAMS,
      MEAL_UNITS.MILLILITERS,
      MEAL_UNITS.LITERS,
      MEAL_UNITS.UNIT,
      MEAL_UNITS.SLICE,
      MEAL_UNITS.CUP,
      MEAL_UNITS.TABLESPOON,
      MEAL_UNITS.TEASPOON,
    ]),
    calories: z.number().min(0).optional().default(0),
    protein: z.number().min(0).optional().default(0),
    carbohydrates: z.number().min(0).optional().default(0),
    fats: z.number().min(0).optional().default(0),
    source: z.enum([MEAL_SOURCES.DATABASE, MEAL_SOURCES.MANUAL]),
  })
  .superRefine((data, ctx) => {
    if (data.source === MEAL_SOURCES.MANUAL) {
      const hasNutrients =
        (data.calories || 0) > 0 ||
        (data.protein || 0) > 0 ||
        (data.carbohydrates || 0) > 0 ||
        (data.fats || 0) > 0;
      if (!hasNutrients) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least one nutritional value must be greater than zero for manual entries',
          path: ['calories'],
        });
      }
    }
  });

/**
 * Schema for updating a meal item
 */
export const updateItemSchema = z.object({
  quantity: z.number().positive().optional(),
  unit: z
    .enum([
      MEAL_UNITS.GRAMS,
      MEAL_UNITS.KILOGRAMS,
      MEAL_UNITS.MILLILITERS,
      MEAL_UNITS.LITERS,
      MEAL_UNITS.UNIT,
      MEAL_UNITS.SLICE,
      MEAL_UNITS.CUP,
      MEAL_UNITS.TABLESPOON,
      MEAL_UNITS.TEASPOON,
    ])
    .optional(),
  calories: z.number().min(0).optional(),
  protein: z.number().min(0).optional(),
  carbohydrates: z.number().min(0).optional(),
  fats: z.number().min(0).optional(),
});

/**
 * Schema for ID parameters
 */
export const mealParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const itemParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
  itemId: z.coerce.number().int().positive(),
});
