export interface UserFromDb {
  _id: string;
  alatooID: number;
  name: string;
  avatar: string | null;
  role: 'student' | 'teacher';
}

export interface LoginResponse {
  user: UserFromDb;
  accessToken: string;
}

export interface LoginMutation {
  alatooID: number;
  password: string;
}
