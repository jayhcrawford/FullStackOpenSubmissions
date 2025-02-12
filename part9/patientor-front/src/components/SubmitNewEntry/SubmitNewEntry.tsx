import { useState, SyntheticEvent } from "react";

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { Gender, HealthCheckRating, NewEntry } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

interface GenderOption {
  value: Gender;
  label: string;
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



  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState([]);
  const [discharge, setDischarge] = useState({});
  const [healthCheckRating, setHealthCheckRating] = useState('Healthy');
  const [sickLeave, setSickLeave] = useState({});
  const [employerName, setEmployerName] = useState('');

  const [typeOfEntry, setTypeOfEntry] = useState(0);

  const onHealthCheckChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === 'number') {
      setHealthCheckRating(healthCheckNames[event.target.value]);
    }
  }


  const AddEntry = (event: SyntheticEvent, submissionType: number) => {
    console.log(submissionType)

    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist
    });
  };

  if (typeOfEntry == 1) {
    return (
      <div>
        <select>
          <option>{null}</option>
          <option>Health Check</option>
          <option>Hospital Entry</option>
          <option>Occupational Healthcare</option>
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
      </div>
    )
  }

  if (typeOfEntry == 0) {
    return (
      <div>
        <form /* onSubmit={AddEntry} */>
          <TextField
            label="Date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
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
          <TextField
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />

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
          </Select>

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
        </form>
      </div>
    );
  }
};

export default SubmitNewEntry;
