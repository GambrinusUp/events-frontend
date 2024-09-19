import { Button, Loader, Pagination } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

import AddCompanyModal from '../components/AddCompanyModal';
import CompanyCard from '../components/CompanyCard';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getCompaniesList } from '../store/companies/CompaniesActionCreators';

function CompaniesPage() {
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const { companies, isLoading } = useAppSelector(
    (state) => state.companiesStore
  );

  const [activePage, setPage] = useState(1);
  const itemsPerPage = 20;

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedManagers = companies.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(getCompaniesList());
  }, [dispatch]);

  if (isLoading) return <Loader color="blue" />;

  return (
    <>
      <Button
        mt="md"
        leftSection={<MdAddCircleOutline />}
        variant="default"
        onClick={open}
      >
        Добавить новую компанию
      </Button>
      {paginatedManagers.map((company) => (
        <CompanyCard
          key={company.id}
          id={company.id}
          name={company.name}
          managers={company.managers}
        />
      ))}
      <AddCompanyModal opened={opened} close={close} />
      <Pagination
        value={activePage}
        onChange={setPage}
        total={Math.ceil(companies.length / itemsPerPage)}
        mb="md"
      />
    </>
  );
}

export default CompaniesPage;
