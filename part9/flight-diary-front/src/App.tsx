import { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Diary, NewDiary, SensitiveDiary } from "../types.js";
import diaryServices from "../services/diaryServices.js";

const apiBaseUrl = "http://localhost:3000";

interface DiaryProps {
  date: string;
  id: number;
  weather: string;
  visibility: string;
  fetchDiaryEntry: (
    id: number
  ) => Promise<"error fetching diary entry" | string>;
}

interface DiaryFormProps {
  postDiaryEntry: (
    entry: NewDiary
  ) => Promise<Diary | AxiosResponse<any, any> | undefined>;
  updateDiaryListState: (diary: any) => void;
}

const DiaryRender = (props: DiaryProps) => {
  const [diaryEntry, setDiaryEntry] = useState<string>("");

  const fetchComment = async () => {
    const comment = await props.fetchDiaryEntry(props.id);

    if (comment == undefined || comment == "error fetching diary entry") {
      setDiaryEntry("the diary was not fetched");
    } else {
      setDiaryEntry(comment);
    }
  };

  return (
    <li>
      <h4>{props.date}</h4>
      {diaryEntry && <p>{diaryEntry}</p>}
      <p>Weather: {props.weather}</p>
      <p>Visibility: {props.visibility}</p>
      <button onClick={fetchComment}>Get Diary Entry</button>
    </li>
  );
};

const DiaryForm = (props: DiaryFormProps) => {
  const [submitDiaryError, setSubmitDiaryError] = useState<string>("");

  const handleSubmitDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      date: { value: string };
      visibility: { value: string };
      weather: { value: string };
      comment: { value: string };
    };
    const date = target.date.value;
    const visibility = target.visibility.value;
    const weather = target.weather.value;
    const comment = target.comment.value;

    const result = await props.postDiaryEntry({
      date,
      visibility,
      weather,
      comment,
    });

    if (result === undefined) {
      console.log("undefined error");
    } else if (Object.hasOwn(result, "id")) {
      props.updateDiaryListState(result);
      target.date.value = "";
      target.visibility.value = "";
      target.weather.value = "";
      target.comment.value = "";
    } else {
      //is error object
      console.log(result, "is result");
      setSubmitDiaryError(result.toString());
      setTimeout(() => {
        setSubmitDiaryError("");
      }, 4000);
    }
  };

  return (
    <>
      <h3>Add new entry</h3>
      <p style={{ color: "red" }}>{submitDiaryError}</p>
      <form onSubmit={(event) => handleSubmitDiary(event)}>
        <span>
          Date: <input name="date"></input>
        </span>
        <br />
        <span>
          Visibility: <input name="visibility"></input>
        </span>
        <br />
        <span>
          Weather: <input name="weather"></input>
        </span>
        <br />
        <span>
          Comment: <input name="comment"></input>
        </span>
        <br />
        <button type="submit">post</button>
      </form>
    </>
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

  const fetchDiaryEntry = async (id: number) => {
    try {
      const results = await diaryServices.fetchEntry(id);
      return results.comment;
    } catch (error) {
      console.log(error);
      return "error fetching diary entry";
    }
  };

  const postDiaryEntry = async (entry: NewDiary) => {
    try {
      const results = await diaryServices.postEntry(entry);
      return results;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Handle Axios specific errors
        return error.response?.data || error.message; // Return error response data or the error message
      } else {
        // Handle non-Axios errors
        return error.message;
      }
    }
  };

  const updateDiaryListState = (diary: any) => {
    const newDiaryList = diaries.concat(diary);
    setDiaries(newDiaryList);
  };

  if (diaries.length == 0) {
    return null;
  }

  return (
    <>
      <DiaryForm
        postDiaryEntry={postDiaryEntry}
        updateDiaryListState={updateDiaryListState}
      />
      <ul>
        {diaries.map((diary) => {
          return (
            <DiaryRender
              key={diary.id}
              date={diary.date}
              id={diary.id}
              weather={diary.weather}
              visibility={diary.visibility}
              fetchDiaryEntry={fetchDiaryEntry}
            />
          );
        })}
      </ul>
    </>
  );
}

export default App;
