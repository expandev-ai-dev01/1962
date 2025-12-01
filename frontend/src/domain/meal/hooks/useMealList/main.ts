import { useQuery } from '@tanstack/react-query';
import { mealService } from '../../services/mealService';
import type { MealListFilters } from '../../types/models';

export const useMealList = (filters?: MealListFilters) => {
  return useQuery({
    queryKey: ['meals', filters],
    queryFn: () => mealService.list(filters),
  });
};
