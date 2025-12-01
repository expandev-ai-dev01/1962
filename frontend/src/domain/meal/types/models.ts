export type MealCategory = 'Café da Manhã' | 'Almoço' | 'Jantar' | 'Lanche';
export type Unit =
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'unidade(s)'
  | 'fatia(s)'
  | 'xícara(s)'
  | 'colher(es) de sopa'
  | 'colher(es) de chá';
export type Source = 'database' | 'manual';

export interface MealItem {
  id: string;
  mealId: string;
  foodName: string;
  quantity: number;
  unit: Unit;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  source: Source;
}

export interface Meal {
  id: string;
  userId: string;
  mealDate: string;
  mealTime: string;
  category: MealCategory;
  items: MealItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbohydrates: number;
  totalFats: number;
  createdAt: string;
  updatedAt: string;
}

export interface MealListFilters {
  date?: string;
}
