interface UserValues {
  days: Array<number>;
  target: number;
}

//user inputs array at command line as a string, parse it to Array<number>
const convertStringArrayIntoNumArray = (
  numsInString: string
): Array<number> => {
  let numsArray = numsInString
    .split(/[\s,]+/)
    .map((item) => parseFloat(item))
    .filter((item) => !isNaN(item));
  return numsArray;
};

//parse arg2 to number, and call convertStringArrayIntoNumArray to parse arg1 into Array<number>
const parseArguments = (arg1: string, arg2: string): UserValues => {
  const daysArray = convertStringArrayIntoNumArray(arg1);

  if (Array.isArray(daysArray) && !isNaN(Number(arg2))) {
    return {
      days: daysArray,
      target: parseInt(arg2),
    };
  } else {
    throw new Error(
      'Provided values were not properly formatted! Proper argument format: "[0, 0, 0, 0, 0]" 2'
    );
  }
};

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

  //if they worked out every day, or exceeded the expeceted target they succeeded
  if (hours.length == trainingDays.length || results.target < results.average) {
    results.success = true;
  }

  return results;
};

try {
  const userInputtedVals: UserValues = parseArguments(
    process.argv[2],
    process.argv[3]
  );

  console.log(
    calculateExercises(userInputtedVals.days, userInputtedVals.target)
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
