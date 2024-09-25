import { Button, Card, Group, Stack, Text } from '@mantine/core';

interface ManagerProps {
  id: string;
  name: string;
  email: string;
  company: string;
  isConfirmed: boolean;
  onApprove?: (id: string) => void;
  variant?: 'view' | 'edit';
}

function ManagerCard({
  id,
  name,
  email,
  company,
  isConfirmed,
  onApprove,
  variant = 'edit',
}: ManagerProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w="80%">
      <Group justify="space-between">
        <Stack gap="sm">
          <Text>ФИО: {name}</Text>
          <Text>Почта: {email}</Text>
          <Text>Название компании: {company}</Text>
          <Text>
            Статус: {isConfirmed ? 'подтверждён' : 'ожидает подтверждения'}
          </Text>
        </Stack>
        {variant === 'edit' && onApprove && (
          <Button onClick={() => onApprove(id)}>Подтвердить</Button>
        )}
      </Group>
    </Card>
  );
}

export default ManagerCard;
