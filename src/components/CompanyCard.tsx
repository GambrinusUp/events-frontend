import {
  Button,
  Card,
  Collapse,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { MdArrowCircleDown } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNotification } from '../hooks/useNotification';
import {
  deleteCompany,
  getCompanyDetails,
} from '../store/companies/CompaniesActionCreators';
import { Manager } from '../utils/types';
import EditCompanyModal from './EditCompanyModal';
import ManagerCard from './ManagerCard';

interface CompanyProps {
  id: string;
  name: string;
  managers?: Manager[];
}

function CompanyCard({ id, name, managers }: CompanyProps) {
  const token = useAppSelector((state) => state.userStore.token);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedCollapse, { toggle }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const { showSuccess } = useNotification();

  const handleDelete = async () => {
    if (token) {
      const result = await dispatch(deleteCompany({ token: token, id: id }));
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess('Компания успешно удалена');
      }
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getCompanyDetails({ token: token, id: id }));
    }
  }, [dispatch, id, token]);

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder w="80%" mb="md">
        <Group justify="space-between">
          <Stack gap="sm">
            <Text>Название компании: {name}</Text>
          </Stack>
          <Group>
            <Button onClick={open}>Редактировать</Button>
            <Button color="red" onClick={handleDelete}>
              Удалить
            </Button>
          </Group>
        </Group>
        <Button
          leftSection={<MdArrowCircleDown />}
          mt="md"
          variant="default"
          onClick={toggle}
        >
          Показать меджеров
        </Button>
        <Collapse in={openedCollapse} mt="md">
          <Flex gap="md" justify="center" direction="column" align="center">
            {managers && managers.length > 0 ? (
              managers.map((manager) => (
                <ManagerCard
                  key={manager.id}
                  id={manager.id}
                  name={manager.name}
                  email={manager.email}
                  company={name}
                  isConfirmed={manager.isConfirmed}
                  variant="view"
                />
              ))
            ) : (
              <Text>Менджеры компании ещё не зарегистрированы</Text>
            )}
            {!managers && <Loader color="blue" />}
          </Flex>
        </Collapse>
      </Card>
      <EditCompanyModal id={id} name={name} opened={opened} close={close} />
    </>
  );
}

export default CompanyCard;
