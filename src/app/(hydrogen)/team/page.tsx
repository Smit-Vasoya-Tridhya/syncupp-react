'use client';

import PageHeader from '@/app/shared/page-header';
import { productsData} from '@/data/products-data';
import { metaObject } from '@/config/site.config';
import ModalButton from '@/app/shared/modal-button';
import AddTeamMemberForm from '@/app/shared/(user)/team-list/add-team-member-form';
import TeamDataTable from '@/app/shared/(user)/team-list/table';
import { deleteTeamMember, getTeamdata } from '@/redux/slices/user/auth/teamSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { TeamDTO } from '@/app/shared/(user)/team-list/interface';
import { GlobalResponse, Pagination } from '@/types';
import Table from '@/app/shared/(user)/team-list/table';
import { useSelector } from 'react-redux';
import { getColumns } from '@/app/shared/(user)/team-list/columns';
import toast from 'react-hot-toast';

// export const metadata = {
//   ...metaObject('Products'),
// };

const pageHeader = {
  title: 'Team',
};


export default function TeamDataTablePage() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  // const moduleData = useSelector((state: any) => state.teamModule.tempData);
  const moduleData = useSelector((state: any) => state.teamModule);
  // console.log(moduleData.tempData,'moduleDatsa////////////////////////')
  // const [data, setData] = useState<TeamDTO[]>([]);

  useEffect(() => {
    const apiData={
      sortField: 'first_name',
      sortOrder: 'desc',
      page: 1,
      itemsPerPage: pageSize
    }
    dispatch(getTeamdata(apiData))
  },[])
  
  const handleDeleteById = async (_id: string | string[]) => {
    console.log(_id,'_id..........')
    try {
      const res = await dispatch(deleteTeamMember({ _id: [_id] }));
      if (res.payload.status === false ) {
        toast.error(res.payload.message);
      } else {
        // closeModal();
        await dispatch(getTeamdata({ sort_field: 'createdAt', sort_order: 'desc' }));
        toast.success(res.payload.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = async (paginationParams: Pagination) => {
    let { page, sortOrder} = paginationParams;
    const response = await dispatch(getTeamdata({ page, pageSize, sortOrder }));
    const { total } = response.payload;
    const maxPage: number = Math.ceil(total / pageSize);

    if (page > maxPage) {
      page = maxPage > 0 ? maxPage : 1;
    }
    // const adjustedResponse = await dispatch(getTeamdata({ page, pageSize, sortOrder }));

    return response;
  };
  const filterState = {
    status: '',
  };

  return (
    <>
      <PageHeader title={pageHeader.title}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ModalButton
          label="Add Team"
          view={<AddTeamMemberForm />}
          customSize="625px"
          className="mt-0 w-full hover:bg-gray-700 @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
        />
        </div>
      </PageHeader>
      <Table
        handleDeleteById={handleDeleteById} 
        handleChangePage={handleChangePage} 
        data={moduleData && moduleData?.data}
      />
      {/* <TeamDataTable data={data} /> */}
    </>
  );
}
