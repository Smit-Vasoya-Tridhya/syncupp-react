'use client';

import { Title, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useMedia } from '@/hooks/use-media';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { TeamMemberSchema } from '@/utils/validators/add-team-member.schema';
import { editTeam } from '@/redux/slices/user/team member/teamSlice';
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const typeOption= [
  { name: 'Team Member', value: 'Team Member' },
  { name: 'Admin', value: 'Admin' },
  ]

export default function EditTeamMemberForm({ className,row }: { className?: string , row:any }) {
  const initialValues: TeamMemberSchema = {
    email: row.email,
    name:row.name,
    contact_number:row.contact_number,
    role:row.member_role,
    };
  const isMedium = useMedia('(max-width: 1200px)', false);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const router = useRouter();
  
  const teamModule = useSelector(
    (state: any) => state?.root?.teamModule
  );

  const onSubmit: SubmitHandler<TeamMemberSchema> = (data: any) => {
    data._id= row._id
    console.log('Team member data---->', data);
    dispatch(editTeam(data)).then((result: any) => {
      if (editTeam.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
          // router.replace(routes.dashboard);
          closeModal();
        }
      }
    });
  };

  return (
    <>
      <Form<TeamMemberSchema>
        validationSchema={TeamMemberSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
        className=" p-10 [&_label]:font-medium"
      >
        {({ register, control, formState: { errors } }) => (
          <div className="space-y-5">
            <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-xl xl:text-2xl">
                Edit Team Member
              </Title>
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => closeModal()}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                <PiXBold className="h-[18px] w-[18px]" />
              </ActionIcon>
            </div>
            <div className={cn('grid grid-cols-2 gap-4 pt-5')}>
              <Input
                type="text"
                label="Name"
                placeholder="Enter your Name"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('name')}
                error={errors.name?.message}
              />
              <Input
                type="email"
                label="Email ID"
                placeholder="Enter your Email ID"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                type="number"
                label="Phone"
                placeholder="Enter your Phone"
                color="info"
                className="[&>label>span]:font-medium"
                {...register('contact_number')}
                error={errors.contact_number?.message}
              />
              <Controller
                name="role"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={typeOption}
                    value={value}
                    onChange={onChange}
                    label="Role"
                    error={errors?.role?.message as string}
                    getOptionValue={(option) => option.name}
                    disabled={true}
                  />
                )}
              />
            </div>
            <div>
            <div className={cn('grid grid-cols-2 gap-5 pt-5')}>
              <Button
                variant="outline"
                className="w-full @xl:w-auto dark:hover:border-gray-400"
                onClick={() => closeModal()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="hover:gray-700 w-full  @xl:w-auto dark:bg-gray-200 dark:text-white"
              >
                Save
                {teamModule.loading && (
                  <Spinner size="sm" tag="div" className="ms-3" />
                )}
              </Button>
            </div>
          </div>
          </div>
        )}
      </Form>
    </>
  );
}