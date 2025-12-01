/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as initExampleController from '@/api/internal/init-example/controller';
import * as mealController from '@/api/internal/meal/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Init-Example routes - /api/internal/init-example
 */
router.get('/init-example', initExampleController.listHandler);
router.post('/init-example', initExampleController.createHandler);
router.get('/init-example/:id', initExampleController.getHandler);
router.put('/init-example/:id', initExampleController.updateHandler);
router.delete('/init-example/:id', initExampleController.deleteHandler);

/**
 * @rule {be-route-configuration}
 * Meal routes - /api/internal/meal
 */
router.get('/meal', mealController.listHandler);
router.post('/meal', mealController.createHandler);
router.get('/meal/:id', mealController.getHandler);
router.put('/meal/:id', mealController.updateHandler);
router.delete('/meal/:id', mealController.deleteHandler);

// Meal Item routes
router.post('/meal/:id/item', mealController.addItemHandler);
router.put('/meal/:id/item/:itemId', mealController.updateItemHandler);
router.delete('/meal/:id/item/:itemId', mealController.deleteItemHandler);

export default router;
