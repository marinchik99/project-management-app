export type UserType = {
  id: string;
  name: string;
  login: string;
  password: string;
};

export type SigninResponseType = {
  token: string;
  login?: string;
};

export type TaskType = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: {
    filename: string;
    filesize: number;
  }[];
};
