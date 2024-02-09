import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const CouponManagementForm = z.object({
  brand: z
    .string()
    .min(1, { message: 'Brand Name is Required' })
    .max(15, { message: 'Maximum Brand name length is 15!' }), // string
  couponCode: z
    .string()
    .min(1, { message: 'Coupon Code is Required' })
    .max(20, { message: 'Maximum Coupon Code length is 20!' }), // dropdown selection
  discountTitle: z
    .string()
    .min(1, { message: 'Discount Title is Required' })
    .max(15, { message: 'Maximum Discount Title length is 15!' }), // date picker value
  siteURL: z
    .string()
    .min(1, { message: 'Wesite Url is Required' })
    .trim()
    .nullable()
    .refine(
      (value) => {
        return (
          !value ||
          /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/[^\s]*)?$/.test(
            value
          )
        );
      },
      {
        message: 'Inavalid Url',
      }
    ),
  brandLogo: z
    .any()
    .refine((files) => {
      console.log('Files:', files); // Add this line
      return !!files;
    }, 'Brand Image is required.')
    .refine((files) => {
      if (typeof files === 'string') {
        return true;
      } else {
        return files?.size <= MAX_FILE_SIZE;
      }
    }, `Max file size is 5MB.`)
    .refine((files) => {
      if (typeof files === 'string') {
        return true;
      } else {
        return ACCEPTED_IMAGE_TYPES.includes(files?.type);
      }
    }, '.jpg, .jpeg and png files are accepted.'),
});

export type CouponManagementForm = z.infer<typeof CouponManagementForm>;
