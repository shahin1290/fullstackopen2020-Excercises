import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import { useStateValue } from '../state';

const PatientPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [{ diagnoses }] = useStateValue();

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
  }, [id]);

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
      <div>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            {entry.date} {entry.description}{' '}
            <ul>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code, i) => (
                  <li key={i}>
                    {code} {diagnoses[code] && diagnoses[code].name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  ) : null;
};

export default PatientPage;
