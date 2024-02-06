import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const clientReviewSchema = z.object({
  client_review_image:z.string().optional(),
  customer_name: z.string().min(1, { message: messages.customerNameRequired }),
  company_name: z.string().min(5, { message: messages.companyNameRequired }),
  review: z.string().min(5, { message: messages.reviewIsRequired }).max(100, { message:messages.descriptionLength }),
});

// generate form types from zod validation schema
export type ClientReviewSchema = z.infer<typeof clientReviewSchema>;
