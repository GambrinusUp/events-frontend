import { Button, em, Fieldset, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../hooks/redux';
import { loginUser } from '../store/auth/AuthActionCreators';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      password: (value) =>
        value.length >= 6 ? null : 'Длина пароля должна быть больше 6 символов',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values);
    const result = await dispatch(loginUser(values));

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <Fieldset legend="Авторизация" w={isMobile ? '90%' : '50%'}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
        <Button type="submit" mt="md">
          Войти
        </Button>
      </form>
    </Fieldset>
  );
}

export default LoginPage;
