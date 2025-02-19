import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { Discharge } from '../../types';

interface DatePickerProps {
  label: String;
  changeHandler: React.Dispatch<React.SetStateAction<string>>
}


export default function BasicDatePicker(props: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <DatePicker label={props.label} onChange={(date: Dayjs | null) => {
        props.changeHandler(date!?.format('YYYY-MM-DD'));
      }} />

    </LocalizationProvider>
  );
}
