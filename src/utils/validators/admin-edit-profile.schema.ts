import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateContactNumber,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const adminEditProfileSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().min(1, { message: messages.lastNameRequired }),
  email: validateEmail,
  contact_number: validateContactNumber,
  // isAgreed: z.boolean(),
})
// generate form types from zod validation schema
export type AdminEditProfileSchema = z.infer<typeof adminEditProfileSchema>;