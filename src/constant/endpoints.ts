const BASE_URL_API = import.meta.env.VITE_BASE_URL;

export const POST_API = {
  GET_POSTS: `${BASE_URL_API}/posts/posts`,
  GET_POST_BY_ID: `${BASE_URL_API}/posts/post-detail/?id=`,
  CREATE_POST: `${BASE_URL_API}/posts/post-add`,
  UPDATE_POST: `${BASE_URL_API}/posts/post-update`,
  DELETE_POST: `${BASE_URL_API}/posts/post-delete/?id=`,
};

export const AUTH_API = {
  LOGIN: `${BASE_URL_API}/auth/login`,
};
