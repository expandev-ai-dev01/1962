/**
 * @summary
 * Centralized service instances exports.
 * Provides single import point for all service configurations and instances.
 *
 * @module instances
 */

/**
 * InitExample instances
 */
export { initExampleStore, type InitExampleRecord } from './initExample';

/**
 * Meal instances
 */
export { mealStore, type MealRecord, type MealItemRecord } from './meal';
