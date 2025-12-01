import { cva } from 'class-variance-authority';
import { cn } from '@/core/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { ClockIcon, FlameIcon } from 'lucide-react';
import type { MealCardProps } from './types';

const mealCardVariants = cva('cursor-pointer transition-all hover:shadow-md', {
  variants: {
    category: {
      'Café da Manhã': 'border-l-4 border-l-orange-400',
      Almoço: 'border-l-4 border-l-yellow-500',
      Jantar: 'border-l-4 border-l-blue-500',
      Lanche: 'border-l-4 border-l-green-500',
    },
  },
});

function MealCard({ meal, onClick }: MealCardProps) {
  return (
    <Card className={cn(mealCardVariants({ category: meal.category }))} onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{meal.category}</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <ClockIcon className="size-3" />
            {meal.mealTime}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2">
          <FlameIcon className="size-4 text-orange-500" />
          <span className="text-foreground font-medium">{meal.totalCalories} kcal</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          {meal.items.length} {meal.items.length === 1 ? 'item' : 'itens'}
        </p>
        <div className="text-muted-foreground mt-2 flex gap-2 text-xs">
          <span>P: {meal.totalProtein}g</span>
          <span>C: {meal.totalCarbohydrates}g</span>
          <span>G: {meal.totalFats}g</span>
        </div>
      </CardContent>
    </Card>
  );
}

export { MealCard, mealCardVariants };
