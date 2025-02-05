export interface UserFromDb {
  _id: string;
  alatooID: number;
  name: string;
  avatar: string | null;
  role: 'student' | 'teacher';
  liked_posts: string[];
  liked_replies: string[];
}

export interface LoginResponse {
  user: UserFromDb;
  accessToken: string;
}

export interface LoginMutation {
  alatooID: number;
  password: string;
}
