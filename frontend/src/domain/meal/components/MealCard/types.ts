import type { Meal } from '../../types/models';

export interface MealCardProps {
  meal: Meal;
  onClick?: () => void;
}
