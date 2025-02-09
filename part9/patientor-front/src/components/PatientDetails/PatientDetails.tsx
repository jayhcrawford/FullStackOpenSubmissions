import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../../types";
import patientServices from "../../services/patients";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log(patient);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (id) {
        try {
          const response = await patientServices.fetchPatient(id);
          // Check if the response status is OK (status code 200)
          if (!response.ok) {
            throw new Error("Failed to fetch patient data");
          }
          const data: Patient = await response.json();
          setPatient(data); // Store the fetched patient data
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message); // Store the error message
          } else {
            setError("An unknown error occurred");
          }
        }
      }
    };

    fetchPatientData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (
    patient != null &&
    patient != undefined &&
    Object.hasOwn(patient, "name")
  ) {
    return (
      <>
        <h2>{patient.name}</h2>
        <p>occupation: {patient.occupation}</p>
        <p>DOB: {patient.dateOfBirth}</p>
        <p>gender: {patient.gender}</p>
        <p>SSN: {patient.ssn}</p>
        <h3>diagnoses:</h3>
        <ul>
          {patient.entries.map((diagnosis: Diagnosis) => {
            return <li key={diagnosis.code}></li>;
          })}
        </ul>
      </>
    );
  }

  return (
    <>
      <p>There was an error fetching the data</p>
    </>
  );
};

export default PatientDetails;
