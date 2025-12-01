import { z } from 'zod';
import { isFuture, parseISO, isToday } from 'date-fns';

const categories = ['Café da Manhã', 'Almoço', 'Jantar', 'Lanche'] as const;
const units = [
  'g',
  'kg',
  'ml',
  'l',
  'unidade(s)',
  'fatia(s)',
  'xícara(s)',
  'colher(es) de sopa',
  'colher(es) de chá',
] as const;

export const mealSchema = z
  .object({
    mealDate: z.string({ message: 'Data é obrigatória' }).refine((val) => {
      const date = parseISO(val);
      return !isFuture(date);
    }, 'A data não pode ser futura'),
    mealTime: z.string({ message: 'Hora é obrigatória' }),
    category: z.enum(categories as unknown as [string, ...string[]], {
      message: 'Selecione uma categoria',
    }),
  })
  .refine(
    (data) => {
      if (!data.mealDate || !data.mealTime) return true;
      const date = parseISO(data.mealDate);
      if (isToday(date)) {
        const [hours, minutes] = data.mealTime.split(':').map(Number);
        const now = new Date();
        const mealDateTime = new Date(date);
        mealDateTime.setHours(hours, minutes);
        return mealDateTime <= now;
      }
      return true;
    },
    {
      message: 'O horário não pode ser futuro para a data de hoje',
      path: ['mealTime'],
    }
  );

export const mealItemSchema = z
  .object({
    foodName: z
      .string()
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(100, 'Nome muito longo'),
    quantity: z.coerce.number().positive('Quantidade deve ser maior que zero'),
    unit: z.enum(units as unknown as [string, ...string[]], { message: 'Selecione uma unidade' }),
    calories: z.coerce.number().min(0, 'Não pode ser negativo').default(0),
    protein: z.coerce.number().min(0, 'Não pode ser negativo').default(0),
    carbohydrates: z.coerce.number().min(0, 'Não pode ser negativo').default(0),
    fats: z.coerce.number().min(0, 'Não pode ser negativo').default(0),
    source: z.enum(['database', 'manual']).default('manual'),
  })
  .refine(
    (data) => {
      if (data.source === 'manual') {
        return data.calories > 0 || data.protein > 0 || data.carbohydrates > 0 || data.fats > 0;
      }
      return true;
    },
    {
      message: 'Pelo menos um valor nutricional deve ser maior que zero',
      path: ['calories'], // Attach error to calories field for visibility
    }
  );
