interface ExcerciseStatistics {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): ExcerciseStatistics => {
  const periodLength = dailyExerciseHours.length
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength
  let rating = 0
  let ratingDescription = ''

  if (average >= target) {
    rating = 3
    ratingDescription = 'awesome. target fullfilled'
  } else if (average - target < 0 &&  average - target > - .5) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'too bad, you need to exercise more.'
  }

  return {
    periodLength,
    trainingDays: dailyExerciseHours.filter((days) => days > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2)) 