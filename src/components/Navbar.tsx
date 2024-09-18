import { Menu, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';

import classes from '../App.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../store/auth/AuthSlice';

interface NavbarProps {
  toggle: () => void;
}

function Navbar({ toggle }: NavbarProps) {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.userStore);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {isLoggedIn ? (
        <UnstyledButton className={classes.control}>
          <Link to="/profile" className={classes.link} onClick={toggle}>
            Профиль
          </Link>
        </UnstyledButton>
      ) : (
        <UnstyledButton className={classes.control} onClick={toggle}>
          <Link to="/login" className={classes.link}>
            Авторизация
          </Link>
        </UnstyledButton>
      )}
      {isLoggedIn ? (
        <UnstyledButton className={classes.control} onClick={handleLogout}>
          <Link to="/login" className={classes.link}>
            Выйти
          </Link>
        </UnstyledButton>
      ) : (
        <Menu shadow="md">
          <Menu.Target>
            <UnstyledButton className={classes.control} onClick={toggle}>
              Регистрация
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown w="100%">
            <Menu.Item>
              <Link
                to="/register/student"
                className={classes.link}
                onClick={toggle}
              >
                Регистрация студента
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/register/company"
                className={classes.link}
                onClick={toggle}
              >
                Регистрация менеджера
              </Link>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
}

export default Navbar;
