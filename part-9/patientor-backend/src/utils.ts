/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  NewPatientEntry,
  Gender,
  NewEntry,
  NewHospitalEntry,
  NewBaseEntry,
  NewOccupationalHealthcareEntry,
  NewHealthCheckEntry,
  HealthCheckRating,
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseText = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing field ${String(text)}`);
  }
  return text;
};

const parseStringArray = (arr: any): Array<string> => {
  if (!Array.isArray(arr)) throw new Error(`Not valid array: ${String(arr)}`);

  return arr.map((x) => parseText(x));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (param: any): Gender => {
  if (!param || !isGender(param)) {
    throw new Error(`Incorrect or missing field ${String(param)}`);
  }
  return param;
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseText(object.name),
    dateOfBirth: parseText(object.dateOfBirth),
    ssn: parseText(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation),
  };

  return newEntry;
};

const parseNewBaseEntry = (entry: any): NewBaseEntry => {
  const description = parseText(entry.description);
  const date = parseText(entry.date);
  const specialist = parseText(entry.specialist);

  if (entry.diagnosisCodes) {
    const diagnosisCodes = parseStringArray(entry.diagnosisCodes);
    return { description, date, specialist, diagnosisCodes };
  }
  return { description, date, specialist };
};

const parseNewHospitalEntry = (entry: any): NewHospitalEntry => {
  const baseEntry = parseNewBaseEntry(entry) as NewHospitalEntry;
  baseEntry.type = 'Hospital';

  if (!entry.discharge) throw new Error("entry is missing 'discharge' field!");

  const criteria = parseText(entry.discharge.criteria);
  const date = parseText(entry.discharge.date);
  baseEntry.discharge = { criteria, date };

  return baseEntry;
};

const parseNewOccupationalHealthcareEntry = (
  entry: any
): NewOccupationalHealthcareEntry => {
  const baseEntry = parseNewBaseEntry(entry) as NewOccupationalHealthcareEntry;
  baseEntry.type = 'OccupationalHealthcare';
  baseEntry.employerName = parseText(entry.employerName);
  if (entry.sickLeave) {
    const startDate = parseText(entry.startDate);
    const endDate = parseText(entry.endDate);
    baseEntry.sickLeave = { startDate, endDate };
  }
  return baseEntry;
};

const parseHealthCheckRating = (input: any): HealthCheckRating => {

  if (Object.values(HealthCheckRating).includes(input))
      return input as HealthCheckRating;

  throw new Error(`Not valid HealthCheckRating: ${String(input)}`);

};

const parseNewHealthCheckEntry = (entry: any): NewHealthCheckEntry => {
  const baseEntry = parseNewBaseEntry(entry) as NewHealthCheckEntry;
  baseEntry.type = 'HealthCheck';
  baseEntry.healthCheckRating = parseHealthCheckRating(entry.healthCheckRating);
  return baseEntry;
};

export const toNewEntry = (entry: any): NewEntry => {
  switch (entry.type) {
    case 'Hospital':
      return parseNewHospitalEntry(entry);
    case 'OccupationalHealthcare':
      return parseNewOccupationalHealthcareEntry(entry);
    case 'HealthCheck':
      return parseNewHealthCheckEntry(entry);
    default:
      throw Error(`Entry 'type' invalid: ${String(entry.type)}`);
  }
};
