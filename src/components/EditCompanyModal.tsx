import { Button, Group, Modal, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNotification } from '../hooks/useNotification';
import { editCompany } from '../store/companies/CompaniesActionCreators';

interface EditCompanyModalProps {
  id: string;
  name: string;
  opened: boolean;
  close: () => void;
}

function EditCompanyModal({ id, name, opened, close }: EditCompanyModalProps) {
  const token = useAppSelector((state) => state.userStore.token);
  const dispatch = useAppDispatch();
  const { showSuccess } = useNotification();

  const form = useForm({
    initialValues: {
      companyName: name,
    },
    validate: {
      companyName: isNotEmpty('Название компании не может быть пустым'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (token) {
      const result = await dispatch(
        editCompany({ token: token, id: id, name: values.companyName })
      );
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess('Компания успешно изменена');
        close();
      }
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Редактирование компании"
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
          <Button type="submit">Сохранить</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default EditCompanyModal;
