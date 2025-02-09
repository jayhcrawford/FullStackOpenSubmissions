export type Diary = {
  id: number,
  date: string,
  weather: string,
  visibility: string,
}

export type SensitiveDiary = {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment: string
}

export type NewDiary = {
  date: string,
  weather: string,
  visibility: string,
  comment: string
}
