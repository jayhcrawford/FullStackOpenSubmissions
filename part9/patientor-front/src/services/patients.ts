import axios from "axios";
import { Diagnosis, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const fetchPatient = async (id: string) => {
  const response = await fetch(`${apiBaseUrl}/patients/${id}`);
  return response;
};

const fetchDiagnoses = async (codes: Array<string>) => {
  try {
    const response = await fetch(`${apiBaseUrl}/diagnoses/`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Expected an array of JSON objects, but received a different format.');
    }
    const filteredData: Diagnosis[] = [];
    if (Array.isArray(data)) {
      data.map((diagnosis) => {
        if (codes.includes(diagnosis.code)) {
          filteredData.push(diagnosis);
        }
      });
    }

    return filteredData as Diagnosis[];
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

export default {
  getAll,
  create,
  fetchPatient,
  fetchDiagnoses,
};
