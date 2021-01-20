/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import diagnoseService from '../services/diagnoseService';
import { toNewPatientEntry, toNewEntry } from '../utils';

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
  } catch ({ message }) {
    res.status(400).send(message);
  }
});

router.get('/patients/:id', (req, res) => {
  try {
    const patient = patientService.findPatientById(req.params.id);
    res.json(patient);
  } catch ({ message }) {
    res.status(400).send(message);
  }
});

router.post('/patients/:id/entries', (req, res) => {
  try {
    const patient = patientService.findPatientById(req.params.id);
    const entryNew = toNewEntry(req.body);
    const newPatient = patientService.addNewEntry(patient, entryNew);
    res.json(newPatient);
  } catch ({ message }) {
    res.status(400).json({ message });
    return;
  }
});

export default router;
