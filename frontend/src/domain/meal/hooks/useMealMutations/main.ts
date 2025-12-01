import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mealService } from '../../services/mealService';
import { toast } from 'sonner';
import { useNavigation } from '@/core/hooks/useNavigation';

export const useMealMutations = () => {
  const queryClient = useQueryClient();
  const { navigate } = useNavigation();

  const createMeal = useMutation({
    mutationFn: mealService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      toast.success('Refeição criada com sucesso!');
      navigate(`/meals/${data.id}`);
    },
    onError: () => {
      toast.error('Erro ao criar refeição.');
    },
  });

  const updateMeal = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => mealService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      queryClient.invalidateQueries({ queryKey: ['meal', data.id] });
      toast.success('Refeição atualizada!');
    },
    onError: () => {
      toast.error('Erro ao atualizar refeição.');
    },
  });

  const deleteMeal = useMutation({
    mutationFn: mealService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      toast.success('Refeição excluída.');
      navigate('/meals');
    },
    onError: () => {
      toast.error('Erro ao excluir refeição.');
    },
  });

  const addItem = useMutation({
    mutationFn: ({ mealId, item }: { mealId: string; item: any }) =>
      mealService.addItem(mealId, item),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['meal', data.id] });
      toast.success('Item adicionado!');
    },
    onError: () => {
      toast.error('Erro ao adicionar item.');
    },
  });

  const deleteItem = useMutation({
    mutationFn: ({ mealId, itemId }: { mealId: string; itemId: string }) =>
      mealService.deleteItem(mealId, itemId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['meal', data.id] });
      toast.success('Item removido!');
    },
    onError: () => {
      toast.error('Erro ao remover item.');
    },
  });

  return {
    createMeal,
    updateMeal,
    deleteMeal,
    addItem,
    deleteItem,
  };
};
