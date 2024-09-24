import {
  Alert,
  Badge,
  Button,
  Card,
  Collapse,
  Container,
  Divider,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { MdArrowCircleDown } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import EditEventModal from '../components/EditEventModal';
import StudentCard from '../components/StudentCard';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNotification } from '../hooks/useNotification';
import {
  deleteEvent,
  getEventsDetails,
  getMyEventsList,
  getRegisteredStudentsForEvent,
  registerForEvent,
} from '../store/events/EventsActionCreators';

function EventPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openedCollapse, { toggle }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { event, isLoading, error, eventStudents, myEvents } = useAppSelector(
    (state) => state.eventsStore
  );
  const { user, token } = useAppSelector((state) => state.userStore);
  const { showError, showSuccess } = useNotification();

  useEffect(() => {
    if (id) dispatch(getEventsDetails({ id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (token && user.role === 'STUDENT') {
      dispatch(getMyEventsList({ token }));
    }
  }, [dispatch, token, user.role]);

  useEffect(() => {
    if (id && token && (user.role === 'MANAGER' || user.role === 'DEAN')) {
      dispatch(getRegisteredStudentsForEvent({ token: token, eventId: id }));
    }
  }, [dispatch, id, token, user.role]);

  const hasPassedDeadline = event.deadline
    ? dayjs(event.deadline).isBefore(dayjs())
    : false;

  const handleDelete = async () => {
    if (token && id) {
      const result = await dispatch(deleteEvent({ token: token, id: id }));
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    }
  };

  const handleRegister = async () => {
    if (token && id) {
      const result = await dispatch(
        registerForEvent({ token: token, eventId: id })
      );
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess('Вы успешно записались на событие');
        dispatch(getMyEventsList({ token }));
      }
    }
  };

  const checkForRegister = () => {
    if (myEvents && myEvents.length > 0 && id) {
      const isRegistered = myEvents.some((event) => event.id === id);
      if (isRegistered) {
        return false;
      }
      return true;
    }
    return true;
  };

  useEffect(() => {
    if (error !== '') showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (isLoading) return <Loader color="blue" />;

  return (
    <Container size="md" p="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Group align="center">
            <Text fw={500} fs="xl">
              {event.title}
            </Text>
            <Badge color="blue">{event.company.name}</Badge>
          </Group>
          <Text size="sm">{event.description}</Text>
          <Group gap="xs" align="center">
            <Text size="sm">
              {dayjs(event.date).format('DD MMMM YYYY')} в{' '}
              {dayjs(event.date).format('HH:mm')}
            </Text>
          </Group>
          <Group gap="xs" align="center">
            <Text size="sm">{event.location}</Text>
          </Group>
          <Group gap="xs" align="center">
            <Text size="sm">Менеджер: {event.manager.name}</Text>
          </Group>
          {event.deadline && (
            <Group gap="xs" align="center">
              <Text size="sm">
                Дедлайн регистрации:{' '}
                {dayjs(event.deadline).format('DD MMMM YYYY HH:mm')}
              </Text>
            </Group>
          )}
          {hasPassedDeadline && (
            <Alert title="Запись закрыта" color="red">
              Дедлайн регистрации истек. Вы больше не можете записаться на это
              мероприятие
            </Alert>
          )}
          {(user.role === 'DEAN' || user.id === event.managerId) && (
            <>
              <Button
                leftSection={<MdArrowCircleDown />}
                mt="md"
                variant="default"
                onClick={toggle}
              >
                Показать студентов
              </Button>
              <Collapse in={openedCollapse} mt="md">
                <Flex
                  gap="xs"
                  justify="center"
                  direction="column"
                  align="center"
                >
                  {eventStudents.map((student) => (
                    <StudentCard key={student.id} student={student} />
                  ))}
                  {eventStudents.length < 1 && (
                    <Text>Студенты ещё не зарегистрированы</Text>
                  )}
                </Flex>
              </Collapse>
            </>
          )}
          <Divider my="sm" />
          {user.role === 'STUDENT' &&
            (checkForRegister() ? (
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                disabled={hasPassedDeadline}
                onClick={handleRegister}
              >
                Записаться на мероприятие
              </Button>
            ) : (
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                disabled={true}
              >
                Вы уже записаны
              </Button>
            ))}
          {user.role === 'MANAGER' && (
            <>
              <Button
                variant="light"
                color="blue"
                fullWidth
                radius="md"
                onClick={open}
              >
                Редактировать
              </Button>
              <Button
                variant="light"
                color="red"
                fullWidth
                radius="md"
                onClick={handleDelete}
              >
                Удалить
              </Button>
            </>
          )}
        </Stack>
      </Card>
      {id && event && (
        <EditEventModal
          id={id}
          title={event.title}
          date={new Date(event.date)}
          location={event.location}
          opened={opened}
          deadline={new Date(event.deadline)}
          close={close}
        />
      )}
    </Container>
  );
}

export default EventPage;
