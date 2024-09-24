import { Button, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

import { getErrorMessage } from '../helpers/getErrorMessage';
import { useAppSelector } from '../hooks/redux';
import { useNotification } from '../hooks/useNotification';

function GoogleLogin() {
  const { token } = useAppSelector((state) => state.userStore);
  const [hasTokens, setHasTokens] = useState<boolean>(false);
  const { showError } = useNotification();

  useEffect(() => {
    const checkGoogleTokens = async () => {
      if (!token) {
        showError('User is not authenticated');
        return;
      }

      try {
        const response = await fetch(
          'http://localhost:3000/google/check-tokens',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to check Google tokens: ${response.statusText}`
          );
        }

        const data: { hasTokens: boolean } = await response.json();

        setHasTokens(data.hasTokens);
      } catch (error) {
        console.error('Error:', error);
        showError(getErrorMessage(error));
      }
    };

    checkGoogleTokens();
  }, [showError, token]);

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3000/google/auth', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = data.url;
    } else {
      showError('Ошибка при получении Google Auth URL');
    }
  };

  return hasTokens ? (
    <Text>Вы уже авторизовались через Google</Text>
  ) : (
    <Button onClick={handleLogin}>Авторизоваться через Google</Button>
  );
}

export default GoogleLogin;
