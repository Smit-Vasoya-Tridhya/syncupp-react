'use client';

import { Title } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import cn from '@/utils/class-names';
import { Input } from '@/components/ui/input';
import { CouponManagementForm } from '@/utils/validators/coupon-management.schema';
import PageHeader from '@/app/shared/page-header';
import Uploadfile from '../../create/Uploadfile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetCoupenListbyId,
  UpdateCoupenListbyId,
} from '@/redux/slices/admin/coupon-managemnt/couponManagementSlice';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { routes } from '@/config/routes';
import Spinner from '@/components/ui/spinner';

export default function Updateform(props: any) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const router = useRouter();

  const { loading } = useSelector((state: any) => state?.root?.adminCoupon);

  const onSubmit: SubmitHandler<CouponManagementForm> = async (data) => {
    const formData: any = new FormData();

    // Append form data
    formData.append('brand', data.brand);
    formData.append('couponCode', data.couponCode);
    formData.append('discountTitle', data.discountTitle);
    formData.append('siteURL', data.siteURL);

    // Append image file if available
    if (data.brandLogo) {
      formData.append('brandLogo', data.brandLogo);
    }
    const result = await dispatch(UpdateCoupenListbyId({ data: formData, id }));
    if (result?.payload && result?.payload?.success === true) {
      router.push(routes?.admin?.couponManagement);
    }
  };
  const { CouponSingledata } = useSelector(
    (state: any) => state?.root?.adminCoupon
  );
  useEffect(() => {
    dispatch(GetCoupenListbyId(id));
  }, []);
  const defaultValues = {
    brand: CouponSingledata?.data?.brand,
    couponCode: CouponSingledata?.data?.couponCode,
    discountTitle: CouponSingledata?.data?.discountTitle,
    siteURL: CouponSingledata?.data?.siteURL,
    brandLogo: CouponSingledata?.data?.brandLogo,
  };
  return (
    <>
      <PageHeader title="Coupon Management/ Edit">
        <div className="mt-4 flex items-center gap-3 @lg:mt-0"></div>
      </PageHeader>
      <Form<CouponManagementForm>
        validationSchema={CouponManagementForm}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: defaultValues,
        }}
        className=" p-10 [&_label]:font-medium"
      >
        {({ register, control, formState: { errors }, setValue, setError }) => (
          console.log('err', errors),
          (
            <div className="space-y-5">
              <div className="mb-6 flex items-center justify-between">
                <Title as="h3" className="text-xl xl:text-2xl">
                  Edit Coupon
                </Title>
              </div>
              <div
                className={cn(
                  'grid grid-cols-4 gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4'
                )}
              >
                <Input
                  label="Brand Name"
                  placeholder="Enter here"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('brand')}
                  error={errors?.brand?.message}
                />
                <Input
                  label="Coupon code"
                  placeholder="Enter here."
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('couponCode')}
                  error={errors?.couponCode?.message}
                />
                <Input
                  label="Discount Title"
                  placeholder="Enter here"
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('discountTitle')}
                  error={errors?.discountTitle?.message}
                />
                <Input
                  label="Website Url"
                  placeholder="Enter here."
                  color="info"
                  className="[&>label>span]:font-medium"
                  {...register('siteURL')}
                  error={errors?.siteURL?.message}
                />
                <Uploadfile
                  initialPath={CouponSingledata?.data?.brandLogo}
                  name="brandLogo"
                  readonly={false}
                  user={true}
                  setFieldValue={setValue}
                  errors={setError}
                />
              </div>
              <div>
                {/* <div> */}
                {/* </div> */}
              </div>
              <p style={{ color: 'red' }}>
                {String(errors.brandLogo?.message || '')}
              </p>
              <div>
                <div className={cn('grid grid-cols-2 gap-2 pt-5')}>
                  <div>
                    <Link href={routes.admin.couponManagement}>
                      <Button
                        variant="outline"
                        className="@xl:w-auto dark:hover:border-gray-400"
                      >
                        Cancel
                      </Button>
                    </Link>

                    <Button
                      type="submit"
                      className="hover:gray-700 ms-3 @xl:w-auto dark:bg-gray-200 dark:text-white"
                      disabled={loading}
                    >
                      Save
                      {loading && (
                        <Spinner size="sm" tag="div" className="ms-3" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </Form>
    </>
  );
}
