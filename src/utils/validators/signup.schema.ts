import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().min(1, { message: messages.lastNameRequired }),
  email: validateEmail,
  contact: z.string().min(10, { message: messages.contactRequired }),
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  // isAgreed: z.boolean(),
});

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;


// form zod validation schema
export const companyDetailsSchema = z.object({
  companyName: z.string().min(1, { message: messages.companyNameRequired }),
  companyWebsite: z.string().min(1, { message: messages.companyWebsiteRequired }),
  peopleCount: z
    .string({ required_error: messages.peopleCountRequired })
    .min(1, { message: messages.peopleCountRequired }),
  industry: z
    .string({ required_error: messages.industryRequired })
    .min(1, { message: messages.industryRequired })
});

// generate form types from zod validation schema
export type CompanyDetailsSchema = z.infer<typeof companyDetailsSchema>;
