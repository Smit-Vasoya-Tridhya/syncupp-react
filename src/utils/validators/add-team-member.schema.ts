import { z } from 'zod';
import { validateEmail} from './common-rules';
import { messages } from '@/config/messages';

// form zod validation schema
export const TeamMemberSchema = z.object({
  email: validateEmail,
  name: z.string().nonempty(),
  contact_number:  z
    .string({
      required_error: messages.phoneNumberIsRequired,
    })
    .min(2, { message: messages.phoneNumberIsRequired }),
  role: z
    .string()
    .min(1, { message: messages.roleNameIsRequired })
    .min(3, { message: messages.roleNameLengthMin }),
});

// generate form types from zod validation schema
export type TeamMemberSchema = z.infer<typeof TeamMemberSchema>;
