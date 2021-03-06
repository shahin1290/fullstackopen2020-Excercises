import express from 'express';
import patientRouter from './routes/patients';

import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use('/api', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
