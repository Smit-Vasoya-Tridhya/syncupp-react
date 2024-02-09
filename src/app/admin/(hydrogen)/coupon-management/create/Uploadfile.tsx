// ** React Imports
import UploadIcon from '@/components/shape/upload';
import { useState, Fragment, memo } from 'react';

// ** Reactstrap Imports
//import { Card, CardBody } from "reactstrap";

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import { Button } from 'rizzui';
//import { FileText, X, DownloadCloud, UploadCloud } from "react-feather";

interface FileUploaderProps {
  setFieldValue: any;
  name: string;
  initialPath: any;
  readonly: boolean;
  errors: any;
  user: boolean; // You might want to replace this with the correct type
}

const FileUploader: React.FC<FileUploaderProps> = (props) => {
  // ** State
  const {
    setFieldValue,
    name,
    initialPath,
    readonly,
    user,
    errors,
    ...inputProps
  } = props;
  const [files, setFiles] = useState<any[]>([]); // You might want to replace 'any' with a more specific type
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      // console.log('acceptfile', acceptedFiles);
      setFiles(
        acceptedFiles.map((file) => {
          setFieldValue(name, file);
          errors(name, {
            type: '',
            message: '',
          });
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          'dropzone w-full gap-10 rounded-md border border-solid border-gray-300',
      })}
      style={{ height: '12rem' }}
    >
      <input {...getInputProps({ ...inputProps })} />
      {files && files.length > 0 ? (
        <div className="h-full w-full">
          {files.map((file, index) => {
            return (
              <Fragment key={index}>
                <img
                  src={
                    file?.preview
                      ? file.preview
                      : `${process.env.NEXT_PUBLIC_API}${initialPath}`
                  }
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full"
                />
              </Fragment>
            );
          })}
        </div>
      ) : initialPath ? (
        <img
          src={`${process.env.NEXT_PUBLIC_API}${initialPath}`}
          className="h-full w-full"
          alt="Initial Path"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <UploadIcon className="size-7"></UploadIcon>
          <h5 className="pt-1 text-center">Select or drag file </h5>
          <h5 className="pt-1 text-center">or</h5>
          <Button
            type="submit"
            className="hover:gray-700 ms-3 @xl:w-auto dark:bg-gray-200 dark:text-white"
          >
            Browes
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(FileUploader);
