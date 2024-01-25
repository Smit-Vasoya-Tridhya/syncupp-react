import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const agrementFormSchema = z.object({
    title: z.string().min(1, { message: "Title is Required" }),  // string 
    recipient: z.string().min(1, { message: "Recipient is Required" }),      //  dropdown selection 
    due_date: z.string().min(1, { message: "Due date is Required" }),          // date picker value
    description: z.string().min(1, { message: "Description is Required" }),               // react text box editor of react quill
});

export type AgrementFormTypes = z.infer<typeof agrementFormSchema>;