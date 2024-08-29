import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from '@src/store/hook';
import { RootState } from '@src/store/store';
import { ValidationErrorProps } from '@src/interfaces';


const AlertConf: React.FC = () => {
  const { error, process, status, data } = useAppSelector((state: RootState) => state.info.response);

  useEffect(() => {
    if (Array.isArray(error) && (process === 'updateOne' || process === 'addOne' || process === 'login' || process === 'deleteOne' || process === 'logout')  && status) {
      // Success case
      toast.success('Operation was successful!', {
        position: 'top-center',
        autoClose: 5000,
        toastId: 'success-toast', // Prevents duplicate success toasts
      }); 
    } 
    if(typeof error === 'string'){
      toast.error(error, {
        position: 'top-center',
        autoClose: 5000,
        toastId: `error-toast`, // Unique ID for each error message
      });
    }
    else if (error && error.length > 0) {
      // Multiple errors case
      if (error.length > 6) {
        toast.error('Please Fill Inputs', {
          position: 'top-center',
          autoClose: 5000,
          toastId: `error-toast`, // Unique ID for each error message
        });
      } else {
        // Create a Set to keep track of displayed paths
        const displayedPaths = new Set();

        const typedError: ValidationErrorProps[] = error as ValidationErrorProps[];
        typedError.forEach((err) => {
          if (!displayedPaths.has(err.path)) {
            toast.error(err.msg, {
              position: "top-center",
              autoClose: 5000,
            });
            displayedPaths.add(err.path);
          }
        });
      }

    }
  }, [status, error, process, data]);

  return <ToastContainer closeOnClick pauseOnHover />;
};

export default AlertConf;
