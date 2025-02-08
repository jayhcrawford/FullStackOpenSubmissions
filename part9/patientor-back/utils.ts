import { NewPatient, Gender } from "./types";
import * as z from "zod"


export const createNewPatientFromUnknown = (object: any): NewPatient | Error => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing visibility: ' + gender);
    }
    return gender;
  };

  const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  if ("name" in object && isString(object.name) && "occupation" in object && isString(object.occupation) && "gender" in object && "dateOfBirth" in object) {
    const newPatient: NewPatient = {
      ...object,
      name: object.name,
      occupation: object.occupation,
      gender: parseGender(object.gender),
      dateOfBirth: z.string().date().parse(object.dateOfBirth)
    }

    return newPatient;
  } else {
    return new Error("There was an error processing new patient data")
  }

}
