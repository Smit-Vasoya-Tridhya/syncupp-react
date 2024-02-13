import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const ckeditorsSchema = z.object({
  description: z
    .string()
    .min(5, { message: messages.descriptionIsRequired })
    .max(400, { message: messages.descriptionLength }),
});

// generate form types from zod validation schema
export type CkeditorSchema = z.infer<typeof ckeditorsSchema>;
