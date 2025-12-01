import { z } from 'zod';
import { mealSchema, mealItemSchema } from '../validations/meal';

export type MealFormInput = z.input<typeof mealSchema>;
export type MealFormOutput = z.output<typeof mealSchema>;

export type MealItemFormInput = z.input<typeof mealItemSchema>;
export type MealItemFormOutput = z.output<typeof mealItemSchema>;
