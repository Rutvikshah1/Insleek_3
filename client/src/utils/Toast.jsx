import { toast } from 'react-toastify';

export const toastSuccessful = (message) => {
  toast.dark(`${message}`, {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
