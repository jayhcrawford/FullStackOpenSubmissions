import React, { useState, SyntheticEvent, useEffect } from "react";

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Input } from '@mui/material';

import { BaseEntry, EntryFormValues, EntryType, HealthCheckRating, NewEntry } from "../../types";
import patients from "../../services/patients";

import BasicDatePicker from "./datePicker";
import { useParams } from "react-router-dom";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}


interface HealthCheckOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckNames = ["Healthy", "Low Risk", "High Risk", "Critical Risk"]
const healthCheckOptions: HealthCheckOption[] = Object.values(HealthCheckRating).map(v => ({
  label: v, value: v
}))






const SubmitNewEntry = ({ onCancel, onSubmit }: Props) => {

  //entry id
  const { id } = useParams();

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [inputDiagnosisCode, setInputDiagnosisCode] = useState('');
  const [diagnosisInputWarning, setDiagnosisInputWarning] = useState('');
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('Healthy');
  const [sickLeaveBegin, setSickLeaveBegin] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [typeOfEntry, setTypeOfEntry] = useState<null | number>(null);

  //if user navigates away, clear state
  useEffect(() => {
    setDischargeDate('');
    setDiagnosisCodes([]);
    setDischargeCriteria('');
    setSickLeaveEnd('');
    setSickLeaveBegin('');

  }, [typeOfEntry])

  const onHealthCheckChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === 'number') {
      setHealthCheckRating(healthCheckNames[event.target.value]);
    }
  }

  const createDiagnosisInputWarning = () => {
    setDiagnosisInputWarning("That Diagnosis Code Is Invalid, Or There Was An Error");

    setTimeout(() => {
      setDiagnosisInputWarning('')
    }, 5000)
  }

  console.log(typeOfEntry)


  const AddEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!typeOfEntry || !id) {
      //then something is very wrong
    } else {

      const typeEnum = (typeNum: number) => {
        switch (typeNum) {
          case 1:
            return EntryType.HealthCheck;
          case 2:
            return EntryType.Hospital;
          case 3:
            return EntryType.OccupationalHealthcare;
        }

      }
      const typeToEnum = typeEnum(typeOfEntry)

      if (typeOfEntry == 1 && healthCheckRating) {
        const rating = (rating: number) => {
          switch (rating) {
            case 1:
              return HealthCheckRating.Healthy;
            case 2:
              return HealthCheckRating.LowRisk;
            case 3:
              return HealthCheckRating.HighRisk;
            case 4:
              return HealthCheckRating.CriticalRisk;
            default:
              return HealthCheckRating.Healthy;
          }
        }


        const healthToEnum = rating(healthCheckNames.indexOf(healthCheckRating) + 1)
        onSubmit({
          id,
          type: typeToEnum!,
          healthCheckRating: healthToEnum,
          description,
          date,
          specialist,
          diagnosisCodes
        });
      } else if (typeOfEntry == 2) {
        onSubmit({
          id,
          type: typeToEnum!,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        });
      } else {
        onSubmit({
          id,
          type: typeToEnum!,
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave: {
            startDate: sickLeaveBegin,
            endDate: sickLeaveEnd
          }
        });
      }
    }
  };


  return (
    <div>
      {!typeOfEntry && <div>
        <select style={{ height: "4em" }} onChange={(event) => setTypeOfEntry(parseInt(event.target.value))}>
          <option>{null}</option>
          <option value={1}>Health Check</option>
          <option value={2}>Hospital Entry</option>
          <option value={3}>Occupational Healthcare</option>
        </select>
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>}
      {typeOfEntry && <form onSubmit={AddEntry}>
        <select defaultValue={typeOfEntry} style={{ height: "4em" }} onChange={(event) => setTypeOfEntry(parseInt(event.target.value))}>
          <option>{null}</option>
          <option value={1}>Health Check</option>
          <option value={2}>Hospital Entry</option>
          <option value={3}>Occupational Healthcare</option>
        </select>
        <h2 style={{ fontFamily: "sans-serif" }}>
          {typeOfEntry == 1 && "Health Check Entry"}
          {typeOfEntry == 2 && "Hospital Entry"}
          {typeOfEntry == 3 && "Occupational Healthcare Entry"}

        </h2>
        <BasicDatePicker label="Entry Date" changeHandler={setDate} />


        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          placeholder="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        {typeOfEntry == 2 && <div><h4>Discharge</h4>     <TextField
          label="Criteria"
          placeholder="Criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />

          <BasicDatePicker label="Discharge Date" changeHandler={setDischargeDate} />
        </div>}
        {typeOfEntry == 3 && <><TextField
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />

          <h4>Sick Leave</h4>
          <BasicDatePicker label="Start Date" changeHandler={setSickLeaveBegin} /><br />
          <BasicDatePicker label="End Date" changeHandler={setSickLeaveEnd} />
          <div />
        </>}





        {typeOfEntry == 1 && <>
          <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
          <Select
            label="Health Check Rating"
            fullWidth
            value={healthCheckNames.indexOf(healthCheckRating!)}
            onChange={onHealthCheckChange}
          >
            {healthCheckOptions.map(option =>
              <MenuItem
                key={option.label}
                value={healthCheckNames.indexOf(option.label)}
              >
                {option.label
                }</MenuItem>
            )}
          </Select></>
        }


        <div style={{ padding: "2em 0 2em 0" }}>
          <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel><br />
          {diagnosisInputWarning && <div id="diagnosis-input-notify" style={{ color: "red", margin: "1em" }}>{diagnosisInputWarning}</div>}
          <div style={{ margin: "0 0 2em 0 " }}>{diagnosisCodes.map((code) => {
            if (diagnosisCodes.length > 1) {
              return ('   ' + code)
            } else {
              return (code)
            }
          })}</div><br />
          <TextField
            label="Diagnosis Code"
            value={inputDiagnosisCode}
            onChange={(event) => setInputDiagnosisCode(event.target.value)}
          />
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={async () => {
              const result = await patients.fetchDiagnoses([inputDiagnosisCode]);
              if (result.length == 0) {
                //the diagnosis was not found
                createDiagnosisInputWarning();
              } else {
                if (diagnosisCodes.length < 1) {
                  setDiagnosisCodes(diagnosisCodes.concat(inputDiagnosisCode))
                } else {
                  setDiagnosisCodes(diagnosisCodes.concat(inputDiagnosisCode))
                }
                setInputDiagnosisCode('');
              }

            }}
          >Add Diagnosis Code</Button><br />
        </div>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form >}
    </div >
  );

};

export default SubmitNewEntry;
