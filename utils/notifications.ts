import { Store } from 'react-notifications-component';

export const serverError = (
  error?: string,
  message?: string,
  type?: 'success' | 'danger' | 'info' | 'default' | 'warning',
) => {
  Store.addNotification({
    title: error || 'Ошибка выполнения запроса к серверу!',
    message: message || 'Обновите страницу или обратитесь к администратору',
    type: type || 'danger',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate', 'fadeIn'],
    animationOut: ['animate', 'fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const frontendError = (
  error?: string,
  message?: string,
  type?: 'success' | 'danger' | 'info' | 'default' | 'warning',
) => {
  Store.addNotification({
    title: error || 'Ошибка выполнения!',
    message: message || 'Обновите страницу или обратитесь к администратору',
    type: type || 'danger',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate', 'fadeIn'],
    animationOut: ['animate', 'fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const showMessage = (
  error?: string,
  message?: string,
  type?: 'success' | 'danger' | 'info' | 'default' | 'warning',
) => {
  Store.addNotification({
    title: error,
    message: message,
    type: type || 'success',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate', 'fadeIn'],
    animationOut: ['animate', 'fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};
