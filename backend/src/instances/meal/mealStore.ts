/**
 * @summary
 * In-memory store instance for Meal entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/meal/mealStore
 */

import { MealCategory, MealUnit, MealSource } from '@/constants/meal';

/**
 * Meal Item record structure
 */
export interface MealItemRecord {
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
 * Meal record structure
 */
export interface MealRecord {
  id: number;
  userId: string; // UUID
  mealDate: string; // YYYY-MM-DD
  mealTime: string; // HH:MM
  category: MealCategory;
  items: MealItemRecord[];
  created_at: string;
  updated_at: string;
}

/**
 * In-memory store for Meal records
 */
class MealStore {
  private records: Map<number, MealRecord> = new Map();
  private currentMealId: number = 0;
  private currentItemId: number = 0;

  /**
   * Get next available Meal ID
   */
  getNextMealId(): number {
    this.currentMealId += 1;
    return this.currentMealId;
  }

  /**
   * Get next available Item ID
   */
  getNextItemId(): number {
    this.currentItemId += 1;
    return this.currentItemId;
  }

  /**
   * Get all records
   */
  getAll(): MealRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: number): MealRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: MealRecord): MealRecord {
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Update existing record
   */
  update(id: number, data: Partial<MealRecord>): MealRecord | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data, updated_at: new Date().toISOString() };
    this.records.set(id, updated);
    return updated;
  }

  /**
   * Delete record by ID
   */
  delete(id: number): boolean {
    return this.records.delete(id);
  }

  /**
   * Check if record exists
   */
  exists(id: number): boolean {
    return this.records.has(id);
  }
}

/**
 * Singleton instance of MealStore
 */
export const mealStore = new MealStore();
