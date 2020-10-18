import { toast } from 'react-toastify';

export const NOTIFICATION_TYPES = {
  PAYMENT_CANCELED: 'PAYMENT_CANCELED',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
};

const renderToast = ({
  type,
  text,
  duration = 3000,
  hideProgressBar = true,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  progress = undefined,
  position = 'top-right',
} = {}) => {
  const options = {
    position,
    autoClose: duration,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
    type,
  };

  toast(text, options);
};

export const successToast = (text, duration, hideProgressBar) => {
  renderToast({ type: 'success', text, duration, hideProgressBar });
};

export const errorToast = (text, duration, hideProgressBar) => {
  renderToast({ type: 'error', text, duration, hideProgressBar });
};
