import express from "express";
import cors from "cors";

import * as patientData from "./patients/patients";
import * as diagnosisData from "./diagnoses/diagnoses";

import { Patient, PatientWithoutSSN } from "./types";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/patients", (_req, res) => {
  const patientResponse: Patient[] = [];

  patientData.default.forEach((patient) => {
    const filteredPatient: PatientWithoutSSN = {
      id: patient.id,
      name: patient.name,
      occupation: patient.occupation,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
    };
    patientResponse.push(filteredPatient);
  });

  res.json(patientResponse);
});

app.get("/api/diagnoses", (_req, res) => {
  res.json(diagnosisData.default);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
