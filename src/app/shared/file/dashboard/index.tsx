'use client';

import FileStats from '@/app/shared/file/dashboard/file-stats';
 
export default function FileDashboard() {
  return (
    <div className="mt-2 @container">
      <FileStats className="mb-5 2xl:mb-8" />
    </div>
  );
}
