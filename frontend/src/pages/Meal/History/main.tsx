import { useState } from 'react';
import { format } from 'date-fns';
import { useMealList } from '@/domain/meal/hooks/useMealList';
import { MealCard } from '@/domain/meal/components/MealCard';
import { Button } from '@/core/components/button';
import { DatePicker } from '@/core/components/date-picker';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { useNavigation } from '@/core/hooks/useNavigation';
import { PlusIcon } from 'lucide-react';
import { Empty, EmptyDescription, EmptyTitle } from '@/core/components/empty';

function MealHistoryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : undefined;
  const { data: meals, isLoading } = useMealList({ date: formattedDate });
  const { navigate } = useNavigation();

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diário Alimentar</h1>
          <p className="text-muted-foreground">Acompanhe suas refeições diárias.</p>
        </div>
        <Button onClick={() => navigate('/meals/new')}>
          <PlusIcon className="size-4 mr-2" />
          Nova Refeição
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <DatePicker date={date} onDateChange={setDate} />
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner className="size-8" />
        </div>
      ) : meals && meals.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onClick={() => navigate(`/meals/${meal.id}`)} />
          ))}
        </div>
      ) : (
        <Empty>
          <EmptyTitle>Nenhuma refeição registrada</EmptyTitle>
          <EmptyDescription>
            Não encontramos registros para esta data. Comece adicionando uma nova refeição.
          </EmptyDescription>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/meals/new')}>
            Adicionar Refeição
          </Button>
        </Empty>
      )}
    </div>
  );
}

export { MealHistoryPage };
