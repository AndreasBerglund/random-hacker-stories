export interface IStory {
  id: number;
  title: string;
  url: string | undefined; //Optionally there is no url
  score: number;
  time: number;
  author: IAuthor;
}

export interface IAuthor {
  id: number;
  score: number;
}

export interface IItem {
  id: number;
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time?: number; //unix timestamp
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: IItem;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number[];
}

export interface IUser {
  id: number;
  created: number; //unix timestamp
  karma: number;
  about?: string;
  submitted?: IItem[];
}
