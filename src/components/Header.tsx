import { Burger, Group, Menu, UnstyledButton } from '@mantine/core';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import classes from '../App.module.scss';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../store/auth/AuthSlice';
import { Role } from '../utils/types';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

function Header({ opened, toggle }: HeaderProps) {
  const dispatch = useAppDispatch();
  const { isLoggedIn, user } = useAppSelector((state) => state.userStore);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    console.log(user.role);
  }, [user.role]);

  return (
    <Group h="100%" px="md">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Group justify="space-between" style={{ flex: 1 }}>
        <Link to="/" className={classes.link}>
          Мероприятия
        </Link>
        <Group ml="xl" gap={0} visibleFrom="sm">
          {isLoggedIn ? (
            <>
              {user.role === Role.STUDENT && (
                <>
                  <UnstyledButton className={classes.control}>
                    <Link to="/my-events" className={classes.link}>
                      Мои мероприятия
                    </Link>
                  </UnstyledButton>
                  <UnstyledButton className={classes.control}>
                    <Link to="/google" className={classes.link}>
                      Google Calendar
                    </Link>
                  </UnstyledButton>
                </>
              )}
              {user.role === Role.MANAGER && (
                <>
                  <UnstyledButton className={classes.control}>
                    <Link to="/company-events" className={classes.link}>
                      Мероприятия компании
                    </Link>
                  </UnstyledButton>
                  <UnstyledButton className={classes.control}>
                    <Link to="/managers-approval" className={classes.link}>
                      Управление менеджерами
                    </Link>
                  </UnstyledButton>
                </>
              )}
              {user.role === Role.DEAN && (
                <>
                  <UnstyledButton className={classes.control}>
                    <Link to="/managers-approval" className={classes.link}>
                      Управление менеджерами
                    </Link>
                  </UnstyledButton>
                  <UnstyledButton className={classes.control}>
                    <Link to="/companies-management" className={classes.link}>
                      Управление компаниями
                    </Link>
                  </UnstyledButton>
                </>
              )}
              <UnstyledButton className={classes.control}>
                <Link to="/profile" className={classes.link}>
                  Профиль
                </Link>
              </UnstyledButton>
            </>
          ) : (
            <UnstyledButton className={classes.control}>
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
                <UnstyledButton className={classes.control}>
                  Регистрация
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  <Link to="/register/student" className={classes.link}>
                    Регистрация студента
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/register/company" className={classes.link}>
                    Регистрация менеджера
                  </Link>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Group>
    </Group>
  );
}

export default Header;
