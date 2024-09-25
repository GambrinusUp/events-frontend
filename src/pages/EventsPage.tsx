import { Button, Loader, SegmentedControl, Stack } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

import AddEventModal from '../components/AddEventModal';
import EventCard from '../components/EventCard';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getEventsList } from '../store/events/EventsActionCreators';

function EventsPage() {
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useAppSelector((state) => state.userStore);
  const { events, isLoading } = useAppSelector((state) => state.eventsStore);
  const [filterType, setFilterType] = useState<'all' | 'single' | 'range'>(
    'all'
  );
  const [singleDate, setSingleDate] = useState<Date | null>(new Date());
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    console.log(filterType);
    if (filterType === 'all') {
      dispatch(getEventsList({}));
    }
  }, [dispatch, filterType]);

  useEffect(() => {
    if (filterType === 'single' && singleDate) {
      const formattedDate = dayjs(singleDate).format('YYYY-MM-DD');
      const nextDay = dayjs(singleDate).add(1, 'day').format('YYYY-MM-DD');

      dispatch(
        getEventsList({
          startDate: formattedDate,
          endData: nextDay,
        })
      );
    }
  }, [dispatch, filterType, singleDate]);

  useEffect(() => {
    if (filterType === 'range' && dateRange[0] && dateRange[1]) {
      const formattedStartDate = dayjs(dateRange[0]).format('YYYY-MM-DD');
      const formattedEndDate = dayjs(dateRange[1]).format('YYYY-MM-DD');

      dispatch(
        getEventsList({
          startDate: formattedStartDate,
          endData: formattedEndDate,
        })
      );
    }
  }, [filterType, dateRange, dispatch]);

  if (isLoading) return <Loader color="blue" />;

  return (
    <Stack p="md">
      <Stack gap="lg" align="center">
        <SegmentedControl
          value={filterType}
          onChange={(value: string) =>
            setFilterType(value as 'all' | 'single' | 'range')
          }
          data={[
            { label: 'Все события', value: 'all' },
            { label: 'Одна дата', value: 'single' },
            { label: 'Диапазон дат', value: 'range' },
          ]}
        />
        {filterType === 'range' ? (
          <DatePicker type="range" value={dateRange} onChange={setDateRange} />
        ) : filterType === 'single' ? (
          <DatePicker value={singleDate} onChange={setSingleDate} />
        ) : null}
      </Stack>
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

export default EventsPage;
