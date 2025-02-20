import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Patient,
  Entry,
  Diagnosis,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  NewEntry,
  HealthCheckRating,
} from "../../types";
import patientServices from "../../services/patients";
import HealthRatingBar from "../HealthRatingBar";
import NewEntryModal from "../SubmitNewEntry";
import patients from "../../services/patients";

interface DiagnosisCodesProps {
  codes: string[];
}

//  HospitalEntryComponent
const HospitalEntryComponent = (props: HospitalEntry) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: ".3em 0em 2em .3em",
        margin: "0 0 .4em 0",
      }}
    >
      {props.date} {props.description}{" "}
      {props.diagnosisCodes ? (
        <DiagnosisCodes codes={props.diagnosisCodes} />
      ) : null}
      diagnosed by {props.specialist}
      <p>
        <b>discharged:</b> {props.discharge?.date} - {props.discharge?.criteria}
      </p>
    </div>
  );
};


//HealthCheckEntryComponent
const HealthCheckEntryComponent = (props: HealthCheckEntry) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: ".3em 0em 2em .3em",
        margin: "0 0 .4em 0",
      }}
    >
      {props.date} {props.description}{" "}
      {props.diagnosisCodes ? (
        <DiagnosisCodes codes={props.diagnosisCodes} />
      ) : null}
      diagnosed by {props.specialist}
      <HealthRatingBar showText={true} rating={props.healthCheckRating!} />
    </div>
  );
};

// OccupationalHealthcareEntryComponent
const OccupationalHealthcareEntryComponent = (
  props: OccupationalHealthcareEntry
) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: ".3em 0em 2em .3em",
        margin: "0 0 .4em 0",
      }}
    >
      {props.date} {props.description}{" "}
      {props.diagnosisCodes ? (
        <DiagnosisCodes codes={props.diagnosisCodes} />
      ) : null}
      diagnosed by {props.specialist}
      <br/>
      employer: {props.employerName}
      <br/>
      <h4 style={{margin: "1em 0 0 0"}}>Sick Leave:</h4>
      <span>Start: {props.sickLeave?.startDate}</span><br/>
      <span>Start: {props.sickLeave?.endDate}</span>
    </div>
  );
};

const EntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <HospitalEntryComponent
          type={entry.type}
          discharge={entry.discharge}
          id={entry.id}
          description={entry.description}
          date={entry.date}
          specialist={entry.specialist}
          diagnosisCodes={entry.diagnosisCodes}
        />
      );
    case "HealthCheck":
      return (
        <HealthCheckEntryComponent
          healthCheckRating={entry.healthCheckRating}
          type={entry.type}
          id={entry.id}
          description={entry.description}
          date={entry.date}
          specialist={entry.specialist}
          diagnosisCodes={entry.diagnosisCodes}
        />
      );
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryComponent
          employerName={entry.employerName}
          sickLeave={entry.sickLeave}
          type={entry.type}
          id={entry.id}
          description={entry.description}
          date={entry.date}
          specialist={entry.specialist}
          diagnosisCodes={entry.diagnosisCodes}
        />
      );
    default:
      return null;
  }
};

const DiagnosisCodes = (props: DiagnosisCodesProps) => {
  const { id } = useParams();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientDiagnoses = async () => {
      if (id) {
        try {
          const response = await patientServices.fetchDiagnoses(props.codes);
          setDiagnoses(response);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message); // Store the error message
          } else {
            setError("An unknown error occurred");
          }
        }
      }
    };

    fetchPatientDiagnoses();
  }, []);

  if (error) {
    return <p>There was an error fetching diagnosis data</p>;
  }

  return (
    <ul>
      {diagnoses?.map((diagnosis) => {
        return (
          <li key={diagnosis.code}>
            <b>{diagnosis.code}</b> - {diagnosis.name}
          </li>
        );
      })}
    </ul>
  );
};

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);


  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(null);
  };

  const submitNewPatient = async (values: NewEntry) => {
    try {
      const result = await patients.createNewEntry(values);
      if (result && "length" in result) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  };

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
        <h3>entries:</h3>
        {patient.entries.map((entry: Entry) => {
          return (
            <div key={entry.id}>
              <EntryComponent entry={entry} />
            </div>
          );
        })}
        <button onClick={() => setModalOpen(true)}>Open</button>
        {id && <NewEntryModal modalOpen={modalOpen} onClose={closeModal} onSubmit={submitNewPatient} />}
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
