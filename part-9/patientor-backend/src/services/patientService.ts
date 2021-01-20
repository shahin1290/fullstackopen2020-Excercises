import patients from '../../data/patients';
import { uuid } from 'uuidv4';

import {
  PublicPatient,
  NewPatientEntry,
  Patient,
  NewEntry,
  Entry,
} from '../types';

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

const findPatientById = (id: string): Patient  => {
  const patient = patients.find((p) => p.id === id);
  if (!patient)
  throw new Error("Patient not found");
  return patient;
};

const addNewEntry = (patient: Patient , entry: NewEntry): Patient => {
  const newEntry = { ...entry, id: uuid() } as Entry;
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient,
  findPatientById,
  addNewEntry,
};
