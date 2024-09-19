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
}
