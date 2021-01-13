import express from 'express';
import diagnoseRouter from './routes/diagnoses';

import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use('/api/diagnoses', diagnoseRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
