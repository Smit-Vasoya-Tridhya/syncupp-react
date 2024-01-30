import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const addTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  due_date: z.date().optional(), 
  client: z.string().optional(),
  assigned: z.string().optional(),
  done: z.boolean().optional(),
});

// generate form types from zod validation schema
export type AddTaskSchema = z.infer<typeof addTaskSchema>;
