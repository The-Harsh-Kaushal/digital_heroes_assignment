import { z } from 'zod';

export const budgetOptions = [
  '< $500',
  '$500 - $1000',
  '$1000 - $5000',
  '> $5000',
];

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Enter at least 2 characters'),
  email: z.string().trim().email('Enter a valid email address'),
  budget: z
    .string()
    .min(1, 'Choose a budget range')
    .refine((value) => budgetOptions.includes(value), 'Choose a budget range'),
  message: z.string().max(500, 'Keep the message under 500 characters').optional(),
});
