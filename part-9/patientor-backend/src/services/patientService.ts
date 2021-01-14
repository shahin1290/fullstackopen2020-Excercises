import patients from '../../data/patients.json';
import { uuid } from 'uuidv4';

import {
  NonSensitivePatientEntry,
  NewPatientEntry,
  PatientEntry,
} from '../types';

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getNonSensitivePatientEntries, addPatient };
