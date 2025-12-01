import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { mealSchema } from '../../validations/meal';
import type { MealFormInput, MealFormOutput } from '../../types/forms';
import { Button } from '@/core/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/form';
import { Input } from '@/core/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';

interface MealFormProps {
  defaultValues?: Partial<MealFormInput>;
  onSubmit: (data: MealFormOutput) => void;
  isSubmitting?: boolean;
}

function MealForm({ defaultValues, onSubmit, isSubmitting }: MealFormProps) {
  const form = useForm<MealFormInput, any, MealFormOutput>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      mealDate: defaultValues?.mealDate || format(new Date(), 'yyyy-MM-dd'),
      mealTime: defaultValues?.mealTime || format(new Date(), 'HH:mm'),
      category: defaultValues?.category,
    },
    mode: 'onBlur',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="mealDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mealTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Café da Manhã">Café da Manhã</SelectItem>
                  <SelectItem value="Almoço">Almoço</SelectItem>
                  <SelectItem value="Jantar">Jantar</SelectItem>
                  <SelectItem value="Lanche">Lanche</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar Refeição'}
        </Button>
      </form>
    </Form>
  );
}

export { MealForm };
