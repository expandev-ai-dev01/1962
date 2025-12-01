/**
 * @summary
 * API controller for Meal entity.
 * Handles meal creation, retrieval, updates, and deletion,
 * as well as managing food items within meals.
 *
 * @module api/internal/meal/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import {
  mealCreate,
  mealList,
  mealGet,
  mealUpdate,
  mealDelete,
  mealAddItem,
  mealUpdateItem,
  mealDeleteItem,
} from '@/services/meal';

/**
 * @api {get} /api/internal/meal List Meals
 * @apiName ListMeals
 * @apiGroup Meal
 *
 * @apiParam {String} [date] Filter by date (YYYY-MM-DD)
 *
 * @apiSuccess {Boolean} success Success flag
 * @apiSuccess {Object[]} data List of meals
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const filters = req.query.date ? { date: req.query.date as string } : undefined;
    const data = await mealList(filters);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/meal Create Meal
 * @apiName CreateMeal
 * @apiGroup Meal
 *
 * @apiBody {String} mealDate Date (YYYY-MM-DD)
 * @apiBody {String} mealTime Time (HH:MM)
 * @apiBody {String} category Category (Café da Manhã, Almoço, Jantar, Lanche)
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Mock user ID for now, in real app would come from req.user
    const data = await mealCreate(req.body, 'user-uuid-placeholder');
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/meal/:id Get Meal
 * @apiName GetMeal
 * @apiGroup Meal
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await mealGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/meal/:id Update Meal
 * @apiName UpdateMeal
 * @apiGroup Meal
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await mealUpdate(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /api/internal/meal/:id Delete Meal
 * @apiName DeleteMeal
 * @apiGroup Meal
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await mealDelete(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/meal/:id/item Add Meal Item
 * @apiName AddMealItem
 * @apiGroup Meal
 */
export async function addItemHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await mealAddItem(req.params, req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {put} /api/internal/meal/:id/item/:itemId Update Meal Item
 * @apiName UpdateMealItem
 * @apiGroup Meal
 */
export async function updateItemHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await mealUpdateItem(req.params, req.body);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {delete} /api/internal/meal/:id/item/:itemId Delete Meal Item
 * @apiName DeleteMealItem
 * @apiGroup Meal
 */
export async function deleteItemHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await mealDeleteItem(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
