'use client';

import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { PiEyeFill, PiNotePencilDuotone } from 'react-icons/pi';
import { Text } from 'rizzui';

const pageHeader = {
  title: 'CMS Management',
};

export default function TermsAndCondition() {
  return (
    <>
      <div>
        <PageHeader title={pageHeader.title} />
      </div>
      <div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 text-lg">Pages</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                <div>
                <div className="border-b-2 py-2 w-full">
                    <td className="px-6 py-4 w-full flex justify-between">
                      <div className='flex'>
                        <Text> Home </Text>{' '}
                      </div>
                      <div className='flex'>
                        <PiEyeFill className="mr-3 h-[18px] w-[18px] cursor-pointer" />
                        {/* <Link href={routes.admin.cmsTC}> */}
                        <PiNotePencilDuotone className="h-[18px] w-[18px] cursor-pointer" />{' '}
                        {/* </Link> */}
                      </div>
                    </td>
                  </div>
                  <div className="border-b-2 py-2 w-full">
                    <td className="px-6 py-4 w-full flex justify-between">
                      <div className='flex'>
                        <Text> Features </Text>{' '}
                      </div>
                      <div className='flex'>
                        <PiEyeFill className="mr-3 h-[18px] w-[18px] cursor-pointer" />
                        {/* <Link href={routes.admin.cmsTC}> */}
                        <PiNotePencilDuotone className="h-[18px] w-[18px] cursor-pointer" />{' '}
                        {/* </Link> */}
                      </div>
                    </td>
                  </div>
                  <div className="border-b-2 py-2 w-full">
                    <td className="px-6 py-4 w-full flex justify-between">
                      <div className='flex'>
                        <Text> Price </Text>{' '}
                      </div>
                      <div className='flex'>
                        <PiEyeFill className="mr-3 h-[18px] w-[18px] cursor-pointer" />
                        {/* <Link href={routes.admin.cmsTC}> */}
                        <PiNotePencilDuotone className="h-[18px] w-[18px] cursor-pointer" />{' '}
                        {/* </Link> */}
                      </div>
                    </td>
                  </div>
                  <div className="border-b-2 py-2 w-full">
                    <td className="px-6 py-4 w-full flex justify-between">
                      <div className='flex'>
                        <Text> Contact us </Text>{' '}
                      </div>
                      <div className='flex'>
                        <PiEyeFill className="mr-3 h-[18px] w-[18px] cursor-pointer" />
                        {/* <Link href={routes.admin.cmsTC}> */}
                        <PiNotePencilDuotone className="h-[18px] w-[18px] cursor-pointer" />{' '}
                        {/* </Link> */}
                      </div>
                    </td>
                  </div>
                  <div className="border-b-2 py-2 w-full">
                    <td className="px-6 py-4 w-full flex justify-between">
                      <div className='flex'>
                        <Text> Terms & Conditions </Text>{' '}
                      </div>
                      <div className='flex'>
                        <PiEyeFill className="mr-3 h-[18px] w-[18px] cursor-pointer" />
                        <Link href={routes.admin.cmsTC}>
                        <PiNotePencilDuotone className="h-[18px] w-[18px] cursor-pointer" />{' '}
                        </Link>
                      </div>
                    </td>
                  </div>
                  <div className="border-b-2 py-2 w-full">
                    <td className="px-6 py-4 w-full flex justify-between">
                      <div className='flex'>
                        <Text> Privacy policy </Text>{' '}
                      </div>
                      <div className='flex'>
                        <PiEyeFill className="mr-3 h-[18px] w-[18px] cursor-pointer" />
                        {/* <Link href={routes.admin.cmsTC}> */}
                        <PiNotePencilDuotone className="h-[18px] w-[18px] cursor-pointer" />{' '}
                        {/* </Link> */}
                      </div>
                    </td>
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
