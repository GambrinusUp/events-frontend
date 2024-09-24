import { Loader, Stack, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import EventCard from '../components/EventCard';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getMyEventsList } from '../store/events/EventsActionCreators';

function MyEventsPage() {
  const { myEvents, isLoading } = useAppSelector((state) => state.eventsStore);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, user } = useAppSelector((state) => state.userStore);

  useEffect(() => {
    if (user.role !== 'STUDENT') navigate('/');
  }, [navigate, user.role]);

  useEffect(() => {
    if (token) dispatch(getMyEventsList({ token: token }));
  }, [dispatch, token]);

  if (isLoading) return <Loader color="blue" />;

  return (
    <Stack p="md">
      {myEvents.length < 1 && (
        <Text>Вы пока ещё не записались на мероприятия</Text>
      )}
      {myEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Stack>
  );
}

export default MyEventsPage;
