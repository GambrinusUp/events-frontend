import { Menu, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';

import classes from '../App.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../store/auth/AuthSlice';
import { Role } from '../utils/types';

interface NavbarProps {
  toggle: () => void;
}

function Navbar({ toggle }: NavbarProps) {
  const dispatch = useAppDispatch();
  const { isLoggedIn, user } = useAppSelector((state) => state.userStore);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {user.role === Role.STUDENT && (
            <>
              <UnstyledButton className={classes.control} onClick={toggle}>
                <Link to="/my-events" className={classes.link}>
                  Мои мероприятия
                </Link>
              </UnstyledButton>
              <UnstyledButton className={classes.control} onClick={toggle}>
                <Link to="/google" className={classes.link}>
                  Google Calendar
                </Link>
              </UnstyledButton>
            </>
          )}
          {user.role === Role.MANAGER && (
            <>
              <UnstyledButton className={classes.control} onClick={toggle}>
                <Link to="/company-events" className={classes.link}>
                  Мероприятия компании
                </Link>
              </UnstyledButton>
              <UnstyledButton className={classes.control} onClick={toggle}>
                <Link to="/managers-approval" className={classes.link}>
                  Управление менеджерами
                </Link>
              </UnstyledButton>
            </>
          )}
          {user.role === Role.DEAN && (
            <>
              <UnstyledButton className={classes.control} onClick={toggle}>
                <Link to="/managers-approval" className={classes.link}>
                  Управление менеджерами
                </Link>
              </UnstyledButton>
              <UnstyledButton className={classes.control} onClick={toggle}>
                <Link to="/companies-management" className={classes.link}>
                  Управление компаниями
                </Link>
              </UnstyledButton>
            </>
          )}
          <UnstyledButton className={classes.control} onClick={toggle}>
            <Link to="/profile" className={classes.link}>
              Профиль
            </Link>
          </UnstyledButton>
          <UnstyledButton className={classes.control} onClick={handleLogout}>
            <Link to="/login" className={classes.link}>
              Выйти
            </Link>
          </UnstyledButton>
        </>
      ) : (
        <>
          <UnstyledButton className={classes.control} onClick={toggle}>
            <Link to="/login" className={classes.link}>
              Авторизация
            </Link>
          </UnstyledButton>
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
        </>
      )}
    </>
  );
}

export default Navbar;
