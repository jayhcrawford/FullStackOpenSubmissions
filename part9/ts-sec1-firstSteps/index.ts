import express from "express";
import url from "url";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const parsedURL = url.parse(req.url, true);

  const height: number = Number(parsedURL.query.height) || 0;
  const weight: number = Number(parsedURL.query.weight) || 0;

  let results: object = {};
  if (height == 0 || weight == 0) {
    results = {
      error: "malformatted parameters",
    };
  } else {
    results = {
      height,
      weight,
      bmi: calculateBmi(height, weight),
    };
  }
  res.json(results);
});

app.post("/exercises", (req, res) => {
  console.log(req.body);

  let response: object;
  if (
    !Object.hasOwn(req.body, "daily_exercises") ||
    !Object.hasOwn(req.body, "target")
  ) {
    //missing parameters
    response = {
      error: "parameters missing",
    };
  } else if (
    (Object.hasOwn(req.body, "daily_exercises") &&
      !Array.isArray(req.body.daily_exercises)) ||
    (Object.hasOwn(req.body, "target") && isNaN(req.body.target))
  ) {
    //malformed parameters
    response = {
      error: "malformatted parameters",
    };
  } else {
    response = calculateExercises(req.body.daily_exercises, req.body.target);
  }

  res.status(201).json(response);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
