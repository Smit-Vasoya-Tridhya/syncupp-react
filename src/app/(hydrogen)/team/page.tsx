import PageHeader from '@/app/shared/page-header';
import { productsData} from '@/data/products-data';
import { metaObject } from '@/config/site.config';
import ModalButton from '@/app/shared/modal-button';
import AddTeamMemberForm from '@/app/shared/(user)/team-list/add-team-member-form';
import TeamDataTable from '@/app/(hydrogen)/team/table';

export const metadata = {
  ...metaObject('Products'),
};

const pageHeader = {
  title: 'Team',
};

export default function TeamDataTablePage() {
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
      <TeamDataTable data={productsData} />
    </>
  );
}
