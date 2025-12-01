import { useMealMutations } from '@/domain/meal/hooks/useMealMutations';
import { MealForm } from '@/domain/meal/components/MealForm';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Button } from '@/core/components/button';
import { ChevronLeftIcon } from 'lucide-react';

function MealCreatePage() {
  const { createMeal } = useMealMutations();
  const { goBack } = useNavigation();

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={goBack}>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nova Refeição</h1>
          <p className="text-muted-foreground">Registre os detalhes iniciais da sua refeição.</p>
        </div>
      </div>

      <div className="rounded-lg border p-6 shadow-sm">
        <MealForm
          onSubmit={(data) => createMeal.mutate(data)}
          isSubmitting={createMeal.isPending}
        />
      </div>
    </div>
  );
}

export { MealCreatePage };
