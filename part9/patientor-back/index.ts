import express from "express";
import cors from "cors";
import axios from "axios";

import { v1 as uuid } from "uuid";


import { Patient, PatientWithoutSSN, Diagnosis } from "./types";

const serverBaseURL = "http://localhost:3000"


const app = express();
app.use(cors());
app.use(express.json());


app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/patients", async (_req, res) => {
  try {
    const fetchResults = await axios.get(`${serverBaseURL}/patients`);
    const queryPatients: Array<Patient> = fetchResults.data;

    const patientResponse: Patient[] = [];

    queryPatients.forEach((patient) => {
      const filteredPatient: PatientWithoutSSN = {
        id: patient.id,
        name: patient.name,
        occupation: patient.occupation,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
      };
      patientResponse.push(filteredPatient);
    });

    res.status(200).json(patientResponse);

  } catch (error) {
    console.log(error)
    res.status(404).json({ error })
  }

});

app.post("/api/patients", async (req, res) => {

  try {
    req.body.id = uuid();
    const postPatient = await axios.post(`${serverBaseURL}/patients`, req.body);
    res.status(201).json( postPatient.data );
  } catch (error) {
    console.log(error)
    res.status(404).json({ error })
  }

});


app.get("/api/diagnoses", async (_req, res) => {
  try {
    const fetchResults = await axios.get(`${serverBaseURL}/diagnoses`);
    const queryDiagnoses: Array<Diagnosis> = fetchResults.data;

    const diagnosesResponse: Diagnosis[] = [];
    queryDiagnoses.map((diagnosis) => {
      diagnosesResponse.push(diagnosis);
    });
    res.json(diagnosesResponse);
    res.status(200).json(diagnosesResponse);

  } catch (error) {
    console.log(error)
    res.status(404).json({ error })
  }

});



const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
