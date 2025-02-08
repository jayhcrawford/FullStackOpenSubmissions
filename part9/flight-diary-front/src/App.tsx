import { useEffect, useState } from "react";
import axios from "axios";
import { Diary } from "../types.js";
import diaryServices from "../services/diaryServices.js";

const apiBaseUrl = "http://localhost:3000";

interface DiaryProps {
  date: string;
  id: number;
  weather: string;
  visibility: string;
}

const DiaryRender = (props: DiaryProps) => {
  return (
    <li>
      <h4>{props.date}</h4>
      <p>Weather: {props.weather}</p>
      <p>Visibility: {props.visibility}</p>
    </li>
  );
};

function App() {
  const [diaries, setDiaries] = useState<Array<Diary>>([]);
  

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/api/diaries`);

    const fetchDiaties = async () => {
      const diaryRes = await diaryServices.getAll();
      setDiaries(diaryRes);
    };
    void fetchDiaties();
  }, []);

  if (diaries.length == 0) {
    return null;
  }

  return (
    <ul>
      {diaries.map((diary) => {
        return (
          <DiaryRender
            key={diary.id}
            date={diary.date}
            id={diary.id}
            weather={diary.weather}
            visibility={diary.visibility}
          />
        );
      })}
    </ul>
  );
}

export default App;
