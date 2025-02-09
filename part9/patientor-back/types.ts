export interface Entry {
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: string;
  dateOfBirth?: string;
  ssn?: string;
  entries: Entry[];
}

export interface NewPatient {
  name: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  ssn?: string;
}

export type PatientWithoutSSN = Omit<Patient, "ssn">;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
