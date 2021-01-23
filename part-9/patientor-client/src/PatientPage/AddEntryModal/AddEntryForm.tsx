import React from 'react';

import { NewEntry } from '../../types';
import HealthCheckForm from './HealthCheckEntryForm';
import OccupationalHealthEntryForm from './OccupationalHealthEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import { EntryTypeOption } from './FormField';

export type EntryFormValues = NewEntry;

export enum EntryType {
  HealthCheck = 'HealthCheck',
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: 'HealthCheck' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'OccupationalHealthcare' },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [entryType, setEntryType] = React.useState('HealthCheck' as EntryType);

  return (
    <div>
      <h5>Entry Type</h5>
      <select
        value={entryType}
        onChange={({ target }) => setEntryType(target.value as EntryType)}
        className='ui dropdown'
      >
        {entryTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>

      {entryType === 'HealthCheck' && (
        <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel} />
      )}

      {entryType === 'OccupationalHealthcare' && (
        <OccupationalHealthEntryForm onSubmit={onSubmit} onCancel={onCancel} />
      )}

      {entryType === 'Hospital' && (
        <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
    </div>
  );
};

export default AddEntryForm;
