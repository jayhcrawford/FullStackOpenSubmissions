
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

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: object;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  type: "OccupationalHealthcare";
  sickLeave?: object;
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export type PatientWithoutSSN = Omit<Patient, "ssn">;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

