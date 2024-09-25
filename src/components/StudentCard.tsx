import { Card, Group, Text } from '@mantine/core';

import { Student } from '../utils/types';

interface StudentCardProps {
  student: Student;
}

function StudentCard({ student }: StudentCardProps) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder w={'100%'}>
      <Group mb="md">
        <Text fw={500} size="lg">
          {student.name}
        </Text>
      </Group>
      <Text c="dimmed" size="sm">
        {student.email}
      </Text>
    </Card>
  );
}

export default StudentCard;
