import { Button, Group, Modal, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNotification } from '../hooks/useNotification';
import { addCompany } from '../store/companies/CompaniesActionCreators';

interface AddCompanyModalProps {
  opened: boolean;
  close: () => void;
}

function AddCompanyModal({ opened, close }: AddCompanyModalProps) {
  const navgiate = useNavigate();
  const token = useAppSelector((state) => state.userStore.token);
  const error = useAppSelector((state) => state.companiesStore.error);
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    if (!token || token === '') navgiate('/login');
  }, [navgiate, token]);

  const form = useForm({
    initialValues: {
      companyName: '',
    },
    validate: {
      companyName: isNotEmpty('Название компании не может быть пустым'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (token) {
      const result = await dispatch(
        addCompany({ token: token, name: values.companyName })
      );
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess('Компания успешно добавлена');
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
      title="Создание новой компании"
      centered
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Название компании"
          placeholder="Введите название компании"
          {...form.getInputProps('companyName')}
          mb="md"
        />
        <Group justify="flex-end">
          <Button type="submit">Создать</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default AddCompanyModal;
