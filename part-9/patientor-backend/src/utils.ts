/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseText = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing field ${text}`);
  }
  return text;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (param: any): Gender => {
  if (!param || !isGender(param)) {
    throw new Error(`Incorrect or missing field ${param}`);
  }
  return param;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseText(object.name),
    dateOfBirth: parseText(object.dateOfBirth),
    ssn: parseText(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation),
  };

  return newEntry;
};

export default toNewPatientEntry;
