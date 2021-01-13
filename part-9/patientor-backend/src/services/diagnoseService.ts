import diagnoseData from '../../data/diagnose.json';
import { Diagnose } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const diagnoses: Diagnose[] = diagnoseData;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default { getDiagnoses };
