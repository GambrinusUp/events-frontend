import { Button, Loader, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import AddEventModal from '../components/AddEventModal';
import EventCard from '../components/EventCard';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNotification } from '../hooks/useNotification';
import { getCompanyEventsList } from '../store/events/EventsActionCreators';

function CompanyEventsPage() {
  const navigate = useNavigate();
  const { events, isLoading, error } = useAppSelector(
    (state) => state.eventsStore
  );
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.userStore);
  const { showError } = useNotification();

  useEffect(() => {
    if (user.role === 'STUDENT') navigate('/');
  }, [navigate, user.role]);

  useEffect(() => {
    if (token) {
      dispatch(getCompanyEventsList({ token: token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (error !== '') showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (isLoading) return <Loader color="blue" />;

  return (
    <Stack p="md">
      {user.role === 'MANAGER' && user.isConfirmed && (
        <Button
          leftSection={<MdAddCircleOutline />}
          variant="default"
          size="md"
          onClick={open}
        >
          Добавить новое событие
        </Button>
      )}
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      <AddEventModal opened={opened} close={close} />
    </Stack>
  );
}

export default CompanyEventsPage;
