export interface Company {
  id: string;
  name: string;
  managers?: [];
}

export interface Manager {
  id: string;
  email: string;
  name: string;
  role: Role;
  isConfirmed: boolean;
  company: Company;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  isConfirmed: boolean;
  companyId: string;
  accessToken?: string;
}

export enum Role {
  STUDENT = 'STUDENT',
  MANAGER = 'MANAGER',
  DEAN = 'DEAN',
}

export interface CustomJwtPayload {
  userId: string;
  role: Role;
  isConfirmed: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  managerId: string;
  deadline: string;
  companyId: string;
  manager: Partial<Manager>;
  company: Company;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  date: string;
  location: string;
  deadline?: string;
}

export interface EditEventResponse {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  managerId: string;
  deadline?: string;
  companyId: string;
}

export interface Student {
  id: string;
  email: string;
  name: string;
  role: Role;
}
