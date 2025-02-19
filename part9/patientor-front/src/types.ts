export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface NewEntry {
  id: string,
  type: EntryType,
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  discharge?: Discharge;
  healthCheckRating?: HealthCheckRating;
  sickLeave?: object;
  employerName?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>
}


export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  discharge?: Discharge;
  healthCheckRating?: HealthCheckRating;
  sickLeave?: object;
  employerName?: string;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType;
  discharge?: Discharge;
}

export enum EntryType {
  Hospital = "Hospital",
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare"
}

export enum HealthCheckRating {
  Healthy = "Healthy",
  LowRisk = "Low Risk",
  HighRisk = "High Risk",
  CriticalRisk = "Critical Risk"
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType;
  healthCheckRating?: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName?: string;
  type: EntryType;
  sickLeave?: object;
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export interface Discharge {
  date: string;
  criteria: string;
}


export interface StoreState {
  patientID: null | string
}


export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormValues = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;
