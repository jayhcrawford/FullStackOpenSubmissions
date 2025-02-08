import axios from "axios";
import { Diary } from "../types.ts"

const baseURL = "http://localhost:3000";

export const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${baseURL}/api/diaries`);
  return data;
};

export default {
  getAll
};

