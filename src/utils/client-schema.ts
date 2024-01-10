import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateContactNumber,
} from '@/utils/validators/common-rules';




// form zod validation schema
export const clientSchema = z.object({
    name: z.string().min(1, { message: messages.nameRequired }),
    email: validateEmail,
    contact_number: z .string().trim().nullable().refine(value => {
        return !value || /^[0-9]{10,13}$/.test(value);
    }, {
        message: messages.contactLengthMin,
    }),
    company_name: z.string().min(1, { message: messages.companyNameRequired }),
    company_website: z .string().trim().nullable().refine(value => {
        return !value || /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/[^\s]*)?$/.test(value);
    }, {
        message: messages.companyUrlInvalid,
    }),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    pincode: z.string().optional(),
    title: z.string().optional(),
  })
  
  // generate form types from zod validation schema
  export type ClientSchema = z.infer<typeof clientSchema>;