'use client';

import { Title, ActionIcon } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { TeamMemberSchema, teamMemberSchema } from '@/utils/validators/add-team-member.schema';
import { addTeamMember, editTeamMember, getAllTeamMember, getTeamMemberProfile } from '@/redux/slices/user/team-member/teamSlice';
import { useEffect, useState } from 'react';
import { handleKeyContactDown, handleKeyDown } from '@/utils/common-functions';
import SelectBox from '@/components/ui/select';
// const Select = dynamic(() => import('@/components/ui/select'), {
//   ssr: false,
//   loading: () => <SelectLoader />,
// });

const typeOption = [
  { name: 'Team Member', value: 'team_member' },
  { name: 'Admin', value: 'admin' },
]

export default function AddTeamMemberForm(props: any) {
  const { title, row } = props;
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [save, setSave] = useState(false)
  const [loader, setLoader] = useState(true);
  const [reset, setReset] = useState({})
  const teamMemberData = useSelector(
    (state: any) => state?.root?.teamMember
  );
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  const signIn = useSelector((state: any) => state?.root?.signIn)

  const initialValues: TeamMemberSchema = {
    email: '',
    name: '',
    contact_number: '',
    role: ''
  };

  useEffect(() => {
    row && dispatch(getTeamMemberProfile({ _id: row?._id }))
  }, [row, dispatch]);

  let [data] = teamMemberData?.teamMember;
  let defaultValuess = {};
  if (data) {
    defaultValuess = {
      name: data?.name,
      email: data?.email,
      contact_number: data?.contact_number,
      role: data?.member_role === 'team_member' ? 'Team Member' : 'Admin'
    };
  } else if(signIn?.role === 'client') {
    defaultValuess = {
      name: '',
      email: '',
      contact_number: '',
      role: 'Admin'
    };
  }else {
    defaultValuess = {
      name: '',
      email: '',
      contact_number: '',
      role: ''
    };
  }

  const onSubmit: SubmitHandler<TeamMemberSchema> = (dataa) => {
    let formData = {};
    if (title === 'New Team Member') {
      formData = {
        name: dataa?.name ?? '',
        email: dataa?.email ?? '',
        contact_number: dataa?.contact_number ?? '',
        role: dataa?.role === 'Team Member' ? 'team_member' : 'admin',
        agencyId: clientSliceData?.agencyId
      }
    } else {
      formData = {
        name: dataa?.name ?? '',
        email: dataa?.email ?? '',
        contact_number: dataa?.contact_number ?? '',
        role: dataa?.role === 'Team Member' || dataa?.role === 'team_member' ? 'team_member' : 'admin',
        agencyId: clientSliceData?.agencyId
      }
    }

    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    );
    const fullData = { ...filteredFormData }
    if (title === 'New Team Member') {
      dispatch(addTeamMember(fullData)).then((result: any) => {
        if (addTeamMember.fulfilled.match(result)) {
          setLoader(false);
          setSave(false);
          if (result && result.payload.success === true) {
            save && closeModal();
            setReset({ ...initialValues })
            dispatch(getAllTeamMember({ sort_field: 'createdAt', sort_order: 'desc', agencyId: clientSliceData?.agencyId }));
            setSave(false);
          }
        }
      });
    } else {
      dispatch(editTeamMember({ ...fullData, _id: data._id })).then((result: any) => {
        if (editTeamMember.fulfilled.match(result)) {
          if (result && result.payload.success === true) {
            save && closeModal();
            setSave(false);
            dispatch(getAllTeamMember({ sort_field: 'createdAt', sort_order: 'desc', agencyId: clientSliceData?.agencyId }));
          }
        }
      });
    }
  };

  const handleSaveClick = () => {
    setSave(true);
  }
  if (!teamMemberData?.teamMember && title === 'Edit Team Member') {
    return (
      <div className='p-10 flex items-center justify-center'>
        <Spinner size="xl" tag='div' className='ms-3' />
      </div>
    )
  } else {
    return (
      <>
        <Form<TeamMemberSchema>
          validationSchema={teamMemberSchema}
          onSubmit={onSubmit}
          resetValues={reset}
          useFormProps={{
            mode: 'all',
            defaultValues: defaultValuess,
          }}
          className=" p-10 [&_label]:font-medium"
        >
          {({ register, control, formState: { errors, isSubmitSuccessful }, handleSubmit }) => (
            <div className="space-y-5">
              <div className="mb-6 flex items-center justify-between">
                <Title as="h3" className="text-xl xl:text-2xl">
                  {title}
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
              <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4')}>
                <Input
                  type="text"
                  onKeyDown={handleKeyDown}
                  label="Name *"
                  color="info"
                  placeholder="Enter your Name"
                  className="[&>label>span]:font-medium"
                  {...register('name')}
                  error={errors.name?.message as string}
                />
                <Input
                  type="email"
                  onKeyDown={handleKeyDown}
                  label="Email ID *"
                  color="info"
                  placeholder="Enter your Email ID"
                  className="[&>label>span]:font-medium"
                  disabled={title === 'Edit Team Member'}
                  {...register('email')}
                  error={errors.email?.message as string}
                />
                <Input
                  type="number"
                  onKeyDown={handleKeyContactDown}
                  label="Phone"
                  color="info"
                  placeholder="Enter your Phone"
                  className="[&>label>span]:font-medium"
                  {...register('contact_number')}
                  error={errors.contact_number?.message as string}
                />
                <Controller
                  name="role"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <SelectBox
                      options={typeOption}
                      value={value}
                      onChange={onChange}
                      label="Permisson *"
                      color="info"
                      disabled={signIn?.role === 'client'}
                      error={errors?.role?.message as string}
                      getOptionValue={(option) => option?.name}
                    />
                  )}
                />
              </div>
              <div>
                <div className={cn('grid grid-cols-2 gap-5 pt-5')}>
                  <div>
                    <Button
                      variant="outline"
                      className="@xl:w-auto dark:hover:border-gray-400"
                      onClick={() => closeModal()}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className='float-right text-right'>
                    {title === 'New Team Member' &&
                      <Button
                        //  type='submit'
                        className="hover:gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white"
                        disabled={Object.keys(errors).length === 0 && loader && isSubmitSuccessful && !save}
                        onClick={() => {
                          handleSubmit(onSubmit)();
                          setLoader(true)
                        }}
                      >
                        Save & New
                        {Object.keys(errors).length === 0 && loader && isSubmitSuccessful && !save && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                      </Button>
                    }
                    <Button
                      type="submit"
                      className="hover:gray-700 ms-3 @xl:w-auto dark:bg-gray-200 dark:text-white"
                      disabled={(teamMemberData?.addTeamMemberStatus === 'pending' || teamMemberData?.editTeamMemberStatus === 'pending') && save}
                      onClick={handleSaveClick}
                    >
                      Save
                      {(teamMemberData?.addTeamMemberStatus === 'pending' || teamMemberData?.editTeamMemberStatus === 'pending') && save && (<Spinner size="sm" tag='div' className='ms-3' color='white' />)}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Form>
      </>
    );
  }
}
