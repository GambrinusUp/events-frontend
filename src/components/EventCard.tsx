import { Badge, Button, Card, Group, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { Event } from '../utils/types';

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder my="xs">
      <Stack gap="md">
        <Group align="center">
          <Text fw={500} size="lg">
            {event.title}
          </Text>
          <Badge color="blue">{event.company.name}</Badge>
        </Group>
        <Text size="sm" color="dimmed">
          {event.description}
        </Text>
        <Group gap="xs" align="center">
          <Text size="sm">{new Date(event.date).toLocaleDateString()}</Text>
        </Group>
        <Group gap="xs" align="center">
          <Text size="sm">{event.location}</Text>
        </Group>
        <Group gap="xs" align="center">
          <Text size="sm">Manager: {event.manager.name}</Text>
        </Group>
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => navigate(`/${event.id}`)}
        >
          Перейти на страницу события
        </Button>
      </Stack>
    </Card>
  );
}

export default EventCard;
