interface UserValues {
  height: number;
  weight: number;
}

const parseArguments = (arg1: string, arg2: string): UserValues => {
  if (!isNaN(Number(arg1)) && !isNaN(Number(arg2))) {
    return {
      height: parseInt(arg1),
      weight: parseInt(arg2),
    };
  } else {
    throw new Error(
      "You did not provide numbers as your first two arguments, proper argument structure: 165 65"
    );
  }
};

const determineRange = (bmi: number): string => {
  if (bmi <= 18.4) {
    return "Underweight";
  } else if (bmi > 18.4 && bmi <= 24.9) {
    return "Normal Range";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return "Overweight";
  } else if (bmi >= 30) {
    return "Obese";
  }

  return "weight";
};

const calculateBmi = (height: number, weight: number): string => {
  let denom = height / 100;
  denom *= denom;
  return determineRange(weight / denom);
};

try {
  const userInputtedVals: UserValues = parseArguments(
    process.argv[2],
    process.argv[3]
  );

  console.log(calculateBmi(userInputtedVals.height, userInputtedVals.weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;
