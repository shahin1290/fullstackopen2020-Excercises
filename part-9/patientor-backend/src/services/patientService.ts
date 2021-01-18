import patients from '../../data/patients';
import { uuid } from 'uuidv4';

import { PublicPatient, NewPatientEntry, Patient } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatientEntries = (): PublicPatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  return patient;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient,
  findPatientById,
};
