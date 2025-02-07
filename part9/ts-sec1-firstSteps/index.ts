import express from "express";
import url from "url";
import calculateBmi from "./bmiCalculator";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
