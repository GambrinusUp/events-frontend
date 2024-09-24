import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import { AppShell, Flex, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import CompaniesPage from './pages/CompaniesPage';
import CompanyEventsPage from './pages/CompanyEventsPage';
import EventPage from './pages/EventPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import ManagersApprovalPage from './pages/ManagersApprovalPage';
import MyEventsPage from './pages/MyEventsPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationManagerPage from './pages/RegistrationManagerPage';
import RegistrationStudentPage from './pages/RegistrationStudentPage';

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <Router>
        <MantineProvider>
          <Notifications />
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { desktop: true, mobile: !opened },
            }}
          >
            <AppShell.Header>
              <Header opened={opened} toggle={toggle} />
            </AppShell.Header>
            <AppShell.Navbar py="md" px={2}>
              <Navbar toggle={toggle} />
            </AppShell.Navbar>
            <AppShell.Main>
              <Flex
                mih={'calc(100vh - 60px)'}
                gap="md"
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
              >
                <Routes>
                  <Route path="/my-events" element={<MyEventsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route
                    path="/company-events"
                    element={<CompanyEventsPage />}
                  />
                  <Route path="/" element={<EventsPage />} />
                  <Route path="/:id" element={<EventPage />} />
                  <Route
                    path="/register/company"
                    element={<RegistrationManagerPage />}
                  />
                  <Route
                    path="/register/student"
                    element={<RegistrationStudentPage />}
                  />
                  <Route
                    path="/managers-approval"
                    element={<ManagersApprovalPage />}
                  />
                  <Route
                    path="/companies-management"
                    element={<CompaniesPage />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
              </Flex>
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
      </Router>
    </>
  );
}

export default App;
