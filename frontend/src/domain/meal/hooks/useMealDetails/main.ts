import { useQuery } from '@tanstack/react-query';
import { mealService } from '../../services/mealService';

export const useMealDetails = (id: string) => {
  return useQuery({
    queryKey: ['meal', id],
    queryFn: () => mealService.get(id),
    enabled: !!id,
  });
};
