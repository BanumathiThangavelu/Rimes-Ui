/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResponseType {
  status: string;
  result: any;
  message: string;
}

export interface PostTypeRes {
  _id?: string;
  id?: string;
  userId: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  tags?: string;
}
