import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import Spinner from './ui/spinner';

interface FormFooterProps {
  className?: string;
  altBtnText?: string;
  submitBtnText?: string;
  saveAndDraft?: string;
  preview?: string;
  isLoading?: boolean;
  invoiceloader?: any;
  handleAltBtn?: () => void;
  saveAsDraft?: () => void; 
  previewButton?: () => void; 
  createInvoice?: () => void; 
}

export const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

export default function FormFooter({
  isLoading,
  altBtnText = 'Save as Draft',
  submitBtnText = 'Submit',
  saveAndDraft = 'Submit',
  preview = 'Preview',
  className,
  handleAltBtn,
  saveAsDraft,
  previewButton,
  createInvoice,
  invoiceloader
}: FormFooterProps) {
  const invoiceSliceData = useSelector((state: any) => state?.root?.invoice);

  return (
    <div
      className={cn(
        'sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10',
        className,
        negMargin
      )}
    >
      {/* <Button
        variant="outline"
        className="w-full @xl:w-auto"
        onClick={handleAltBtn}
      >
        {altBtnText}
      </Button> */}

      {invoiceloader?.loading ? (
        <>
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            disabled={invoiceSliceData?.loading}
          >
            {submitBtnText}
            {invoiceSliceData?.loading && (
              <Spinner size="sm" tag="div" className="ms-3" color="white" />
            )}
          </Button>
        </>
      ) : (
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          onClick={createInvoice}
        >
          {submitBtnText}
        </Button>
      )}
      <Button
        variant="outline"
        className="w-full @xl:w-auto"
        onClick={saveAsDraft}
      >
        {altBtnText}
      </Button>

      {/* Third button */}
      {/* <Button
        variant="outline"
        className="w-full @xl:w-auto"
        onClick={previewButton}
      >
        {preview}
      </Button> */}
    </div>
  );
}
