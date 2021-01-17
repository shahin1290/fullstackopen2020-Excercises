import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';
import { Icon, SemanticICONS } from "semantic-ui-react";


const PatientPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

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
      female = "woman",
      male = "man",
      other = "other gender",
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
    </>
  ) : null;
};

export default PatientPage;
