/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import diagnoseService from '../services/diagnoseService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/ping', (_req, res) => {
  res.send('pong');
});

router.get('/diagnoses', (_req, res) => {
  res.json(diagnoseService.getDiagnoses());
});

router.get('/patients', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/patients', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;
