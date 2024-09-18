import {
  Button,
  em,
  Fieldset,
  Group,
  PasswordInput,
  Select,
  TextInput,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNotification } from '../hooks/useNotification';
import { registerUser } from '../store/auth/AuthActionCreators';
import { getCompaniesList } from '../store/companies/CompaniesActionCreators';
import { Role } from '../utils/types';

function RegistrationManagerPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showError } = useNotification();
  const { companies } = useAppSelector((state) => state.companiesStore);
  const { error } = useAppSelector((state) => state.userStore);
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      companyId: '',
    },
    validate: {
      name: isNotEmpty('ФИО не может быть пустым'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      password: (value) =>
        value.length >= 6 ? null : 'Длина пароля должна быть больше 6 символов',
      companyId: isNotEmpty('Выберите компанию'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values);
    const result = await dispatch(
      registerUser({ ...values, role: Role.MANAGER })
    );

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  useEffect(() => {
    dispatch(getCompaniesList());
  }, [dispatch]);

  useEffect(() => {
    if (error !== '') showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const companyOptions = companies.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  return (
    <Fieldset legend="Регистрация менджера" w={isMobile ? '90%' : '50%'}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="ФИО"
          placeholder="ФИО"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Почта"
          placeholder="Почта"
          mt="md"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Пароль"
          placeholder="Пароль"
          mt="md"
          {...form.getInputProps('password')}
        />
        <Select
          label="Выберите компанию"
          placeholder="Выберите компанию"
          data={companyOptions}
          searchable
          mt="md"
          {...form.getInputProps('companyId')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit" mt="md">
            Зарегистрироваться
          </Button>
        </Group>
      </form>
    </Fieldset>
  );
}

export default RegistrationManagerPage;
