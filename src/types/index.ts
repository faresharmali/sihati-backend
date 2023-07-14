export enum UserRole {
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

export interface User {
  identifier: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface UserPayload {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface Appointement {
  date: Date;
  doctorId: string;
  patientId: string;
  createdAt: Date;
}
