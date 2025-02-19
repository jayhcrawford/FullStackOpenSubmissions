import { NewPatient, Gender, HealthCheckRating, NewEntry } from "./types";
import * as z from "zod";

export const createNewPatientFromUnknown = (
  object: any
): NewPatient | Error => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
      .map((v) => v.toString())
      .includes(param);
  };

  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error("Incorrect or missing visibility: " + gender);
    }
    return gender;
  };

  const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
  };

  if (
    "name" in object &&
    isString(object.name) &&
    "occupation" in object &&
    isString(object.occupation) &&
    "gender" in object &&
    "dateOfBirth" in object
  ) {
    const newPatient: NewPatient = {
      ...object,
      name: object.name,
      occupation: object.occupation,
      gender: parseGender(object.gender),
      dateOfBirth: z.string().date().parse(object.dateOfBirth),
    };

    return newPatient;
  } else {
    return new Error("There was an error processing new patient data");
  }
};

export const createNewEntryFromUnknown = (object: any): NewEntry | Error => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating)
      .map((v) => v)
      .includes(param);
  };

  const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isNumber(rating) || !isHealthCheckRating(rating)) {
      throw new Error("Incorrect or missing visibility: " + rating);
    }
    return rating;
  };

  const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
  };

  const isNumber = (text: unknown): text is number => {
    return typeof text === "number" || text instanceof Number;
  };

  const isSickLeave = (object: unknown): object is Object => {
    if (
      object != null &&
      typeof object === "object" &&
      "startDate" in object &&
      isString(object.startDate)
    ) {
      if ("endDate" in object && isString(object.endDate)) {
        return true;
      }
    }
    return false;
  };

  const isDiagnosisCodes = (codes: unknown): codes is Array<string> => {
    let checked = true;
    if (Array.isArray(codes)) {
      codes.forEach((code) => {
        if (!(typeof code === "string")) {
          checked = false;
        }
      });
    } else {
      checked = false;
    }
    return checked;
  };

  const isDischarge = (object: unknown): object is Object => {
    if (
      object != null &&
      typeof object === "object" &&
      "date" in object &&
      isString(object.date)
    ) {
      if ("criteria" in object && isString(object.criteria)) {
        return true;
      }
    }
    return false;
  };

  console.log(object.date);

  if (
    "specialist" in object &&
    isString(object.specialist) &&
    "description" in object &&
    isString(object.description) &&
    "date" in object &&
    isString(object.date)
  ) {
    let newEntry: NewEntry = {
      ...object,
      description: z.string().parse(object.description),
      specialist: z.string().parse(object.specialist),
      date: z.string().date().safeParse(object.date).data,
    };

    if (
      "healthCheckRating" in object &&
      isNumber(object.healthCheckRating) &&
      isNumber(parseHealthCheckRating(object.healthCheckRating))
    ) {
      newEntry.healthCheckRating = object.healthCheckRating;
    }

    if ("employerName" in object && isString(object.employerName)) {
      newEntry.employerName = object.employerName;
    }

    if ("sickLeave" in object && isSickLeave(object.sickLeave)) {
      newEntry.sickLeave = object.sickLeave;
    }

    if ("discharge" in object && isDischarge(object.discharge)) {
      if ("date" in object.discharge && "criteria" in object.discharge) {
        const parseDate = z.string().date().safeParse(object.discharge.date);
        if ("data" in parseDate) {
          const discharge = {
            date: parseDate.data!,
            criteria: z.string().parse(object.discharge.criteria),
          };
          newEntry.discharge = discharge;
        }
      }
    }

    if ("diagnosisCodes" in object && isDiagnosisCodes(object.diagnosisCodes)) {
      newEntry.diagnosisCodes = object.diagnosisCodes;
    }

    return newEntry;
  } else {
    return new Error("There was an error processing new patient data");
  }
};
