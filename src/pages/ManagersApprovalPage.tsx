import { Loader, Pagination } from '@mantine/core';
import { useEffect, useState } from 'react';

import ManagerCard from '../components/ManagerCard';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNotification } from '../hooks/useNotification';
import {
  approveManager,
  getManagersList,
} from '../store/managers/ManagersActionCreators';

function ManagersApprovalPage() {
  const dispatch = useAppDispatch();
  const { showSuccess } = useNotification();
  const token = useAppSelector((state) => state.userStore.token);
  const { managers, isLoading } = useAppSelector(
    (state) => state.managersStore
  );

  const [activePage, setPage] = useState(1);
  const itemsPerPage = 20;

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedManagers = managers.slice(startIndex, endIndex);

  useEffect(() => {
    if (token) dispatch(getManagersList(token));
  }, [dispatch, token]);

  const handleApproveManager = async (id: string) => {
    if (token) {
      const result = await dispatch(approveManager({ token, id }));
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess('Менджер успешно одобрен');
      }
    }
  };

  if (isLoading) return <Loader color="blue" />;

  return (
    <>
      {paginatedManagers.map((manager) => (
        <ManagerCard
          key={manager.id}
          id={manager.id}
          name={manager.name}
          email={manager.email}
          company={manager.company.name}
          isConfirmed={manager.isConfirmed}
          onApprove={handleApproveManager}
        />
      ))}
      <Pagination
        value={activePage}
        onChange={setPage}
        total={Math.ceil(managers.length / itemsPerPage)}
        mt="md"
      />
    </>
  );
}

export default ManagersApprovalPage;
