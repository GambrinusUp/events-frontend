export interface Company {
  id: string;
  name: string;
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
