import { Button, Group, Modal, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNotification } from '../hooks/useNotification';
import { editEvent } from '../store/events/EventsActionCreators';
import { CreateEventRequest } from '../utils/types';

interface EditEventModalProps {
  id: string;
  title: string;
  description?: string;
  date: Date | null;
  location: string;
  deadline?: Date | null;
  opened: boolean;
  close: () => void;
}

function EditEventModal({
  id,
  title,
  description,
  date,
  location,
  deadline,
  opened,
  close,
}: EditEventModalProps) {
  const token = useAppSelector((state) => state.userStore.token);
  const error = useAppSelector((state) => state.eventsStore.error);
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useNotification();

  const form = useForm({
    initialValues: {
      title: title,
      description: description,
      date: date,
      location: location,
      deadline: deadline ? deadline : null,
    },
    validate: {
      title: isNotEmpty('Название события не может быть пустым'),
      date: isNotEmpty('Выберите дату события'),
      location: isNotEmpty('Укажите местоположение'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (token && values.date) {
      console.log(values, dayjs(values.date).format('YYYY-MM-DDTHH:mm'));
      const eventData: CreateEventRequest = {
        title: values.title,
        description: values.description,
        date: values.date.toISOString(),
        location: values.location,
        deadline: values.deadline ? values.deadline.toISOString() : undefined,
      };
      const result = await dispatch(
        editEvent({ token: token, eventId: id, event: eventData })
      );
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess('Событие успешно отредактировано');
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
      title="Редактирование события"
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
        <DateTimePicker
          valueFormat="DD.MM.YYYY HH:mm"
          label="Дата события"
          placeholder="Выберите или введите дату"
          {...form.getInputProps('date')}
          mb="md"
        />
        <TextInput
          label="Местоположение"
          placeholder="Введите место проведения"
          {...form.getInputProps('location')}
          mb="md"
        />
        <DateTimePicker
          valueFormat="DD.MM.YYYY HH:mm"
          label="Дедлайн регистрации (если есть)"
          placeholder="Выберите или введите дату"
          {...form.getInputProps('deadline')}
          mb="md"
        />
        <Group justify="flex-end">
          <Button type="submit">Сохранить</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default EditEventModal;
