import { notifications } from '@mantine/notifications';
import { MdCheck, MdClose } from 'react-icons/md';

export function useNotification() {
  const showSuccess = (message: string) => {
    notifications.show({
      message,
      position: 'top-center',
      color: 'green',
      radius: 'md',
      autoClose: 2000,
      icon: <MdCheck />,
    });
  };

  const showError = (message: string) => {
    notifications.show({
      title: 'Ошибка',
      message,
      position: 'top-center',
      color: 'red',
      radius: 'md',
      autoClose: 2000,
      icon: <MdClose />,
    });
  };

  return { showSuccess, showError };
}
