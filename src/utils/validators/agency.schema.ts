import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const agencyFormSchema = z.object({
  email: validateEmail,
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().min(1, { message: messages.lastNameRequired }),
  role: z
  .string({ required_error: messages.roleNameIsRequired })
  .min(1, { message: messages.roleNameIsRequired }),
  contact_number: z.string().trim().nullable().refine(value => {
    return !value || /^[0-9]{10,13}$/.test(value);
}, {
    message: messages.contactLengthMin,
}),
company_name: z.string().min(1, { message: messages.companyNameRequired }),
company_website: z.string().trim().nullable().refine(value => {
    return !value || /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/[^\s]*)?$/.test(value);
}, {
    message: messages.companyUrlInvalid,
}),
address: z.string().optional(),
city: z.string().optional(),
country: z.string().optional(),
state: z.string().optional(),
pin_code: z.string().trim().nullable().refine(value => {
    return !value || /^[0-9]{0,6}$/.test(value);
}, {
    message: 'Pin code must be a numeric value with a maximum length of 6.',
}),
industry: z
    .string({ required_error: messages.industryRequired })
    .min(1, { message: messages.industryRequired }),
    no_of_people: z
    .string({ required_error: messages.peopleCountRequired })
    .min(1, { message: messages.peopleCountRequired }),
})
// generate form types from zod validation schema
export type AgencyFormSchema = z.infer<typeof agencyFormSchema>;