import diagnoseData from '../../data/diagnose.json';
import { Diagnosis } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const diagnoses: Diagnosis[] = diagnoseData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default { getDiagnoses };
