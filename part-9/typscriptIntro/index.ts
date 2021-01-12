import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const isNotNumber = isNaN(height) || isNaN(weight);

  if (isNotNumber) res.json({ error: 'malformatted parameters' });

  const bmi = calculateBmi(height, weight);

  res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  const daily_exercises = req.body.daily_exercises as Array<number>; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  const target = req.body.target as number; // eslint-disable-line @typescript-eslint/no-unsafe-member-access

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }

  const isNotNumber = isNaN(target) || daily_exercises.some(isNaN);

  if (isNotNumber) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }
  const result = calculateExercises(daily_exercises, target);

  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
