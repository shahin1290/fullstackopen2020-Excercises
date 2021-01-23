import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient, Gender, Entry } from '../types';
import { Icon, SemanticICONS, Button } from 'semantic-ui-react';
import EntryDetails from './EntryDetails/index';

import { EntryFormValues } from './AddEntryModal/AddEntryForm';
import { useStateValue, addEntry } from '../state';
import AddEntryModal from './AddEntryModal';

const PatientPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [patients, dispatch] = useStateValue();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const getPatient = async () => {
      try {
        const res = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(res.data);
      } catch ({ message }) {
        console.error(message);
      }
    };
    getPatient();
  }, [id, dispatch, patients]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      const res = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

      dispatch(addEntry(res.data, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const mapToIconName = (gender: Gender): SemanticICONS => {
    enum GenderIconName {
      female = 'woman',
      male = 'man',
      other = 'other gender',
    }
    return GenderIconName[gender];
  };

  return patient ? (
    <>
      <h1>
        {patient.name}
        <Icon name={mapToIconName(patient.gender)} />
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h4>entries</h4>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </>
  ) : null;
};

export default PatientPage;
