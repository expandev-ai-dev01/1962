import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mealItemSchema } from '../../validations/meal';
import type { MealItemFormInput, MealItemFormOutput } from '../../types/forms';
import { Button } from '@/core/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/core/components/form';
import { Input } from '@/core/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/tabs';

interface MealItemFormProps {
  onSubmit: (data: MealItemFormOutput) => void;
  isSubmitting?: boolean;
}

function MealItemForm({ onSubmit, isSubmitting }: MealItemFormProps) {
  const form = useForm<MealItemFormInput, any, MealItemFormOutput>({
    resolver: zodResolver(mealItemSchema),
    defaultValues: {
      foodName: '',
      quantity: 1,
      unit: 'g',
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fats: 0,
      source: 'manual',
    },
    mode: 'onBlur',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual" onClick={() => form.setValue('source', 'manual')}>
              Manual
            </TabsTrigger>
            <TabsTrigger value="database" disabled title="Funcionalidade em desenvolvimento">
              Base de Alimentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="foodName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Alimento</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Arroz Branco" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} value={field.value as number} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="g">Gramas (g)</SelectItem>
                        <SelectItem value="kg">Quilogramas (kg)</SelectItem>
                        <SelectItem value="ml">Mililitros (ml)</SelectItem>
                        <SelectItem value="l">Litros (l)</SelectItem>
                        <SelectItem value="unidade(s)">Unidade(s)</SelectItem>
                        <SelectItem value="fatia(s)">Fatia(s)</SelectItem>
                        <SelectItem value="xícara(s)">Xícara(s)</SelectItem>
                        <SelectItem value="colher(es) de sopa">Colher(es) de sopa</SelectItem>
                        <SelectItem value="colher(es) de chá">Colher(es) de chá</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calorias (kcal)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} value={field.value as number} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proteínas (g)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} value={field.value as number} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carbohydrates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carboidratos (g)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} value={field.value as number} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gorduras (g)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} value={field.value as number} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription>
              Preencha os valores nutricionais totais para a quantidade informada.
            </FormDescription>
          </TabsContent>
        </Tabs>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Adicionando...' : 'Adicionar Item'}
        </Button>
      </form>
    </Form>
  );
}

export { MealItemForm };
