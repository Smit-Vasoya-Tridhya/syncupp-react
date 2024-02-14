import { z } from 'zod';
import { messages } from '@/config/messages';

export const invoiceFormSchema = z.object({
  fromName: z.string().min(1, { message: messages.nameIsRequired }),
  invoice_number: z
    .string()
    .min(2, { message: messages.InvoiceNumberIsRequired })
    .max(10, { message: messages.InvoiceNumberMaxLength })
    .optional(),
  client_id: z.string().min(1, { message: messages.nameIsRequired }),
  fromAddress: z.string().min(1, { message: messages.addressIsRequired }),
  fromPhone: z.string().optional(),
  name: z.string().min(1, { message: messages.nameIsRequired }).optional(),
  toAddress: z.string().min(1, { message: messages.addressIsRequired }),
  toPhone: z.string().optional(),
  invoice_date: z.date({
    required_error: messages.createDateIsRequired,
  }),
  due_date: z.date({
    required_error: messages.dueDateIsRequired,
  }),
  status: z
    .string({
      required_error: messages.statusIsRequired,
    })
    .optional(),
  // taxes: z.coerce.number().min(1, { message: messages.taxIsRequired }),
  invoice_content: z.array(
    z.object({
      item: z
        .string()
        .min(1, { message: messages.itemNameIsRequired })
        .max(20, { message: messages.itemNameLength })
        .optional(),
      description: z
        .string()
        .min(1, { message: messages.itemDescIsRequired })
        .max(150, { message: messages.invoiceDescriptionLength })
        .optional(),
      qty: z.coerce
        .number()
        .min(1, { message: messages.itemQtyIsRequired })
        .optional(),
      // amount: z.coerce
      //   .number()
      //   .min(1, { message: messages.itemPriceIsRequired })
      //   .max(7, { message: messages.itemPriceMaximumLength })
        // ,
      tax: z.coerce.number().min(1, { message: messages.taxIsRequired }).max(100, { message: messages.maxTaxIsRequired }).optional(),
      rate: z.coerce.number().min(1, { message: messages.rateIsRequired }).optional(),
    })
  ),
});

// generate form types from zod validation schema
export type InvoiceFormInput = z.infer<typeof invoiceFormSchema>;
