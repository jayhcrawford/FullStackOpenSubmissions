const calculateExercises = (hours: number[], target: number): Object => {
  //get the actual training days
  let trainingDays = [];
  for (let i = 0; i < hours.length; i++) {
    if (hours[i] == 0) {
      continue;
    } else {
      trainingDays.push(hours[i]);
    }
  }

  //get the average training hours
  let averageTrainingHours = (exerciseDays: number[]): number => {
    let totalHours = 0;
    exerciseDays.map((day) => {
      totalHours += day;
    });
    return totalHours / exerciseDays.length;
  };

  let success = false;
  //if they worked out every day, they succeeded regardless of stats
  if (hours.length == trainingDays.length) {
    success = true;
  }

  let feedback = "something is wrong with your data...";

  //rate their progress
  const rateProgress = (avgHours: number): number => {
    if (avgHours <= target / 2) {
      feedback = "you can do better than that, and you know it.";
      return 1;
    } else if (avgHours > target / 2 && avgHours < target * 1.2) {
      feedback = "not too bad but could be better";
      return 2;
    } else if (avgHours >= target * 1.2) {
      feedback = "good job. see you back next week.";
      success = true;
      return 3;
    } else {
      return -1;
    }
  };

  //assemble results
  const results = {
    periodLength: hours.length,
    trainingDays: trainingDays.length,
    success: success,
    rating: rateProgress(averageTrainingHours(hours)),
    ratingDescription: feedback,
    target: target,
    average: averageTrainingHours(hours),
  };

  return results;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
