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
}

export type PatientWithoutSSN = Omit<Patient, "ssn">;


export type PatientFormValues = Omit<Patient, "id" | "entries">;
