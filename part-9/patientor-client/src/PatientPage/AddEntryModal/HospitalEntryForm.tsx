import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { useStateValue } from '../../state';

import { TextField, DiagnosisSelection } from './FormField';
import { NewHospitalEntry } from '../../types';

export type EntryFormValues = NewHospitalEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const HospitalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        specialist: '',
        date: '',
        type: 'Hospital',
        discharge: {
          date: '',
          criteria: '',
        },
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: {
          [field: string]: string | { [field: string]: string };
        } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.date && !Date.parse(values.date)) {
          errors.date = 'Incorrect format date';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (!values.discharge.criteria || !values.discharge.date) {
          errors.discharge = {};
          if (!values.discharge.criteria) {
            errors.discharge.criteria = requiredError;
          }
          if (!values.discharge.date) {
            errors.discharge.date = requiredError;
          }
        }
        if (values.discharge.date && !Date.parse(values.discharge.date)) {
          errors.discharge = {};
          errors.discharge.date = 'Incorrect format date';
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldTouched, setFieldValue }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='specialist'
              name='specialist'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='description'
              name='description'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Field
              label='Discharge date'
              placeholder='YYYY-MM-DD'
              name='discharge.date'
              component={TextField}
            />
            <Field
              label='Discharge criteria'
              placeholder='discharge criteria'
              name='discharge.criteria'
              component={TextField}
            />
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HospitalForm;
