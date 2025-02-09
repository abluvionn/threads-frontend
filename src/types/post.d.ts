import { UserFromDb } from './user';

export interface Post {
  _id: string;
  image: string | null;
  text: string;
  author: UserFromDb;
  createdAt: string;
  likes: string[];
  replies: string[];
}

export interface Reply extends Post {
  toPost: string;
  toReply: string | null;
}

export interface PostDetailed {
  _id: string;
  image: string | null;
  text: string;
  author: UserFromDb;
  createdAt: string;
  likes: string[];
  replies: Reply[];
}
