import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMealDetails } from '@/domain/meal/hooks/useMealDetails';
import { useMealMutations } from '@/domain/meal/hooks/useMealMutations';
import { MealForm } from '@/domain/meal/components/MealForm';
import { MealItemForm } from '@/domain/meal/components/MealItemForm';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Button } from '@/core/components/button';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/core/components/alert-dialog';
import { Separator } from '@/core/components/separator';
import { Badge } from '@/core/components/badge';
import { ChevronLeftIcon, PlusIcon, Trash2Icon, Edit2Icon } from 'lucide-react';
import { format, parseISO } from 'date-fns';

function MealDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: meal, isLoading } = useMealDetails(id!);
  const { updateMeal, deleteMeal, addItem, deleteItem } = useMealMutations();
  const { goBack } = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner className="size-8" />
      </div>
    );
  }

  if (!meal) return <div>Refeição não encontrada</div>;

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{meal.category}</h1>
            <div className="text-muted-foreground flex items-center gap-2">
              <span>{format(parseISO(meal.mealDate), 'dd/MM/yyyy')}</span>
              <span>•</span>
              <span>{meal.mealTime}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit2Icon className="size-4 mr-2" />
            {isEditing ? 'Cancelar Edição' : 'Editar Detalhes'}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2Icon className="size-4 mr-2" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir Refeição</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir esta refeição? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteMeal.mutate(meal.id)}>
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Edit Form or Summary */}
      {isEditing ? (
        <div className="rounded-lg border p-6">
          <MealForm
            defaultValues={meal}
            onSubmit={(data) => {
              updateMeal.mutate({ id: meal.id, data });
              setIsEditing(false);
            }}
            isSubmitting={updateMeal.isPending}
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-4">
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold">{meal.totalCalories}</div>
            <div className="text-muted-foreground text-xs">Calorias (kcal)</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold">{meal.totalProtein}g</div>
            <div className="text-muted-foreground text-xs">Proteínas</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold">{meal.totalCarbohydrates}g</div>
            <div className="text-muted-foreground text-xs">Carboidratos</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold">{meal.totalFats}g</div>
            <div className="text-muted-foreground text-xs">Gorduras</div>
          </div>
        </div>
      )}

      <Separator />

      {/* Items Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Itens Consumidos</h2>
          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="size-4 mr-2" />
                Adicionar Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Alimento</DialogTitle>
              </DialogHeader>
              <MealItemForm
                onSubmit={(data) => {
                  addItem.mutate(
                    { mealId: meal.id, item: data },
                    {
                      onSuccess: () => setIsAddItemOpen(false),
                    }
                  );
                }}
                isSubmitting={addItem.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {meal.items.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              Nenhum item adicionado a esta refeição.
            </div>
          ) : (
            meal.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <div className="font-medium">{item.foodName}</div>
                  <div className="text-muted-foreground text-sm">
                    {item.quantity} {item.unit} • {item.calories} kcal
                  </div>
                  <div className="text-muted-foreground mt-1 flex gap-2 text-xs">
                    <Badge variant="secondary" className="text-[10px]">
                      P: {item.protein}g
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      C: {item.carbohydrates}g
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      G: {item.fats}g
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => deleteItem.mutate({ mealId: meal.id, itemId: item.id })}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export { MealDetailsPage };
