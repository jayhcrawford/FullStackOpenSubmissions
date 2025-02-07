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

console.log(calculateBmi(180, 74));
