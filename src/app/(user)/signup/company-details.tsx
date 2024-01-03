'use client';

import SelectLoader from '@/components/loader/select-loader';
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';
import { Controller, useFormContext } from 'react-hook-form';
import useMedia from 'react-use/lib/useMedia';


const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});


const options = [
  { name: 'Apple', value: 'apple' },
  { name: 'Banana', value: 'banana' },
  { name: 'Cherry', value: 'cherry' },
]

export default function CompanyDetailsForm() {

  const isMedium = useMedia('(max-width: 1200px)', false);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  
  return (
    <>
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-2">
          <Input
            type="text"
            size={isMedium ? 'lg' : 'xl'}
            label="Company Name"
            placeholder="Enter Company Name"
            rounded="pill"
            color="info"
            className="[&>label>span]:font-medium"
            {...register('companyName')}
            error={errors.companyName?.message as string}
          />
          <Input
            type="text"
            size={isMedium ? 'lg' : 'xl'}
            label="Company Website"
            placeholder="Enter Website url"
            rounded="pill"
            color="info"
            className="[&>label>span]:font-medium"
            {...register('companyWebsite')}
            error={errors?.companyWebsite?.message as string}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5 xl:pb-1">
          <Controller
            control={control}
            name="peopleCount"
            render={({ field: { onChange, value } }) => (
              <Select
                options={options}
                onChange={onChange}
                value={value}
                size={isMedium ? 'lg' : 'xl'}
                label="How many people"
                rounded="pill"
                color="info"
                getOptionValue={(option) => option.name}
                dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                className="font-medium"
                error={errors?.peopleCount?.message as string}
              />
            )}
          />
          <Controller
            control={control}
            name="industry"
            rules={{ required: 'How many people is required' }}
            render={({ field: { onChange, value } }) => (
              <Select
                options={options}
                onChange={onChange}
                value={value}
                size={isMedium ? 'lg' : 'xl'}
                label="Industry"
                rounded="pill"
                color="info"
                getOptionValue={(option) => option.name}
                dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
                className="font-medium"
                error={errors?.industry?.message as string}
              />
            )}
          />
        </div>
      </div>
    </>
  );
}
