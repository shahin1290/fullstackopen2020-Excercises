import patients from '../../data/patients.json';
import { uuid } from 'uuidv4';

import { PublicPatient, NewPatientEntry, Patient } from '../types';

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
    entries:[]
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): Patient => {
  const [ patient ] = patients.filter(p =>
    p.id === id
  );

  if (!patient) {
    throw new Error('Invalid id');
  }

  return patient;
};

export default { getNonSensitivePatientEntries, addPatient, getPatient };
