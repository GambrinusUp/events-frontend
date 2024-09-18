import {
  Button,
  em,
  Fieldset,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNotification } from '../hooks/useNotification';
import { registerUser } from '../store/auth/AuthActionCreators';
import { Role } from '../utils/types';

function RegistrationStudentPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showError } = useNotification();
  const { error } = useAppSelector((state) => state.userStore);
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: {
      name: isNotEmpty('ФИО не может быть пустым'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      password: (value) =>
        value.length >= 6 ? null : 'Длина пароля должна быть больше 6 символов',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values);
    const result = await dispatch(
      registerUser({
        ...values,
        role: Role.STUDENT,
        companyId: '',
      })
    );

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  useEffect(() => {
    if (error !== '') showError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Fieldset legend="Регистрация студента" w={isMobile ? '90%' : '50%'}>
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
        <Group justify="flex-end" mt="md">
          <Button type="submit" mt="md">
            Зарегистрироваться
          </Button>
        </Group>
      </form>
    </Fieldset>
  );
}

export default RegistrationStudentPage;
