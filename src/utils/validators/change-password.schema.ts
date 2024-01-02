import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validatePassword,
  validateNewPassword,
  validateConfirmPassword,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const changePasswordSchema = z
  .object({
    currentPassword: validatePassword,
    newPassword: validateNewPassword,
    confirmedPassword: validateConfirmPassword,
  })
  .refine((data) => data.newPassword === data.confirmedPassword, {
    message: messages.passwordsDidNotMatch,
    path: ['confirmedPassword'], // Correct path for the confirmedPassword field
  });

// generate form types from zod validation schema
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
