import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const agrementFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(15, { message: "Title must be at most 15 characters long" }),  // string 
    recipient: z.string().min(1, { message: "Recipient is required" }),      //  dropdown selection 
    due_date: z.string().min(1, { message: "Due date is required" }),          // date picker value
    description: z.string().min(1, { message: "Description is required" }),               // react text box editor of react quill
});

export type AgrementFormTypes = z.infer<typeof agrementFormSchema>;