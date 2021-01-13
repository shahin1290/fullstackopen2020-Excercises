import patients from '../../data/patients.json';
import { NonSensitivePatientEntry } from '../types';

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry [] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

export default { getNonSensitivePatientEntries };
