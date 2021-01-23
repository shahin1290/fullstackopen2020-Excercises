import React from 'react';
import { useStateValue } from '../../state';
import {
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from '../../types';
import EntryCard from './EntryCard';

import { Icon } from 'semantic-ui-react';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnosisCode = () =>
    entry.diagnosisCodes &&
    entry.diagnosisCodes.map((code, i) => (
      <li key={i}>
        {code}: {diagnoses[code]?.name}
      </li>
    ));

  const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    const heartColor = () => {
      switch (entry.healthCheckRating) {
        case 0:
          return 'green';
        case 1:
          return 'yellow';
        case 2:
          return 'orange';
        case 3:
          return 'red';
        default:
          return undefined;
      }
    };

    return (
      <EntryCard>
        <h4>
          {entry.date} <Icon name={'user md'} size='large' />
        </h4>
        <p>specialist: {entry.specialist}</p>
        <i style={{ color: 'grey' }}>{entry.description}</i> <br />
        <Icon name='heart' color={heartColor()} />
        <ul>{getDiagnosisCode()}</ul>
      </EntryCard>
    );
  };

  const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
      <EntryCard>
        <h4>
          {entry.date} <Icon name={'hospital'} size='large' />
        </h4>
        <p>specialist: {entry.specialist}</p>
        <i style={{ color: 'grey' }}>{entry.description}</i>
        <p>
          {entry.discharge.date}: {entry.discharge.criteria}
        </p>
        <ul>{getDiagnosisCode()}</ul>
      </EntryCard>
    );
  };

  const OccupationalHealthcare: React.FC<{
    entry: OccupationalHealthcareEntry;
  }> = ({ entry }) => {
    return (
      <EntryCard>
        <h4>
          {entry.date} <Icon name={'stethoscope'} size='large' />{' '}
          {entry.employerName}
        </h4>
        <p>specialist: {entry.specialist}</p>
        <i style={{ color: 'grey' }}>{entry.description}</i>
        <p>
          {entry.sickLeave &&
            `sick leave: ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`}
        </p>
        <ul>{getDiagnosisCode()}</ul>
      </EntryCard>
    );
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
