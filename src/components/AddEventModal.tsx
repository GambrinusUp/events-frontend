import { Button, Group, Modal, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNotification } from '../hooks/useNotification';
import { createEvent } from '../store/events/EventsActionCreators';
import { CreateEventRequest } from '../utils/types';

interface AddEventModalProps {
  opened: boolean;
  close: () => void;
}

function AddEventModal({ opened, close }: AddEventModalProps) {
  const token = useAppSelector((state) => state.userStore.token);
  const error = useAppSelector((state) => state.eventsStore.error);
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useNotification();

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      date: null,
      location: '',
      deadline: null,
    },
    validate: {
      title: isNotEmpty('Название события не может быть пустым'),
      date: isNotEmpty('Выберите дату события'),
      location: isNotEmpty('Укажите местоположение'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (token) {
      console.log(values, dayjs(values.date).format('YYYY-MM-DD'));
      const eventData: CreateEventRequest = {
        title: values.title,
        description: values.description,
        date: dayjs(values.date).format('YYYY-MM-DD'),
        location: values.location,
        deadline: values.deadline
          ? dayjs(values.deadline).format('YYYY-MM-DD')
          : undefined,
      };
      const result = await dispatch(
        createEvent({ token: token, event: eventData })
      );
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess('Событие успешно создано');
        close();
      }
    }
  };

  useEffect(() => {
    if (error !== '') showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Создание нового события"
      centered
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Название события"
          placeholder="Введите название события"
          {...form.getInputProps('title')}
          mb="md"
        />
        <TextInput
          label="Описание"
          placeholder="Введите описание события"
          {...form.getInputProps('description')}
          mb="md"
        />
        <DateInput
          label="Дата события"
          placeholder="Выберите или введите дату"
          {...form.getInputProps('date')}
          valueFormat="DD.MM.YYYY"
          mb="md"
        />
        <TextInput
          label="Местоположение"
          placeholder="Введите место проведения"
          {...form.getInputProps('location')}
          mb="md"
        />
        <DateInput
          label="Дедлайн регистрации (если есть)"
          placeholder="Выберите или введите дату"
          {...form.getInputProps('deadline')}
          valueFormat="DD.MM.YYYY"
          mb="md"
        />
        <Group justify="flex-end">
          <Button type="submit">Создать событие</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default AddEventModal;
