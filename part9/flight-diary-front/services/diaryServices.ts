import axios from "axios";
import { Diary, NewDiary, SensitiveDiary } from "../types.ts"

const baseURL = "http://localhost:3000";

export const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${baseURL}/api/diaries`);
  return data;
};

export const fetchEntry = async (id: number) => {
  const { data } = await axios.get<SensitiveDiary>(`${baseURL}/api/diaries/${id}`);
  return data;
};

export const postEntry = async (object: NewDiary) => {
  const { data } = await axios.post<Diary>(`${baseURL}/api/diaries`, object);
  return data;
};



export default {
  getAll,
  fetchEntry,
  postEntry
};

