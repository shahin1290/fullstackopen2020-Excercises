import diagnoseData from '../../data/diagnose.json';
import { DiagnoseEntry } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const diagnoses: DiagnoseEntry[] = diagnoseData;

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default { getDiagnoses };
