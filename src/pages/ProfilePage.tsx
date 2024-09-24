import { Badge, Card, Group, Loader, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getProfile } from '../store/auth/AuthActionCreators';

function ProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, user, isLoading } = useAppSelector((state) => state.userStore);

  useEffect(() => {
    if (!token || token === '') navigate('/login');
  }, [navigate, token]);

  useEffect(() => {
    if (token) dispatch(getProfile({ token: token }));
  }, [dispatch, token]);

  if (isLoading) return <Loader color="blue" />;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group mb="md">
        <Text fw={500} size="lg">
          {user.name}
        </Text>
        {user.role === 'MANAGER' && (
          <Badge color={user.isConfirmed ? 'green' : 'red'}>
            {user.isConfirmed ? 'Подтвержден' : 'Не подтвержден'}
          </Badge>
        )}
      </Group>
      <Text size="sm" c="dimmed">
        Почта: {user.email}
      </Text>
      <Text size="sm" c="dimmed">
        Роль: {user.role}
      </Text>
      {user.role === 'MANAGER' && (
        <Text size="sm" c="dimmed">
          ID компании: {user.companyId || 'Not assigned'}
        </Text>
      )}
      <Text size="sm" c="dimmed">
        ID пользователя: {user.id}
      </Text>
    </Card>
  );
}

export default ProfilePage;
