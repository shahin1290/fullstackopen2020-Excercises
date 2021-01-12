interface parsedValues {
  dailyExerciseHours: Array<number>;
  target: number;
}

const parsedArguments = (args: Array<string>): parsedValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const isNotNumber = args.slice(2).some((elem) => isNaN(Number(elem)));

  if (isNotNumber) {
    throw new Error('Arguments must be numbers');
  }

  return {
    dailyExerciseHours: args.slice(3).map((e) => Number(e)),
    target: Number(args[2]),
  };
};

interface ExcerciseStatistics {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): ExcerciseStatistics => {
  const periodLength = dailyExerciseHours.length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  let rating = 0;
  let ratingDescription = '';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'awesome. target fullfilled';
  } else if (average - target < 0 && average - target > -0.5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'too bad, you need to exercise more.';
  }

  return {
    periodLength,
    trainingDays: dailyExerciseHours.filter((days) => days > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyExerciseHours, target } = parsedArguments(process.argv);
  const result = calculateExercises(dailyExerciseHours, target);
  console.log(result);
} catch ({ message }) {
  console.log('Error, something bad happened, message: ', message);
}
