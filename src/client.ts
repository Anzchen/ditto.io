import axios from "axios";

axios.defaults.withCredentials = true;

// export const BASE_API = process.env.REACT_APP_API_BASE_URL;

// Users
export const USERS_API = `http://localhost:4000/api/users`;

export const signin = async (username: string, password: string) => {
  const response = await axios.post(`${USERS_API}/signin`, {
    username: username,
    password: password,
  });
  return response.data;
};

export const profile = async () => {
  const response = await axios.post(`${USERS_API}/profile`);
  return response.data;
};

export const updateUser = async (username: string, userData: any) => {
  const response = await axios.put(`${USERS_API}/${username}`, userData);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axios.get(`${USERS_API}`);
  return response.data;
};

export const createUser = async (userData: any) => {
  const response = await axios.post(`${USERS_API}`, userData);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const signup = async (userData: any) => {
  const response = await axios.post(`${USERS_API}/signup`, userData);
  return response.data;
};

export const signout = async () => {
  const response = await axios.post(`${USERS_API}/signout`);
  return response.data;
};

export const followUser = async (username: string) => {
  const response = await axios.post(`${USERS_API}/followuser`, {
    username: username,
  });
  return response.data;
};

export const unfollowUser = async (username: string) => {
  const response = await axios.post(`${USERS_API}/unfollowuser`, {
    username: username,
  });
  return response.data;
};

export const getFollowers = async (username: string) => {
  const response = await axios.post(`${USERS_API}/followers`, {
    username: username,
  });
  return response.data;
};

export const getFollowing = async (username: string) => {
  const response = await axios.post(`${USERS_API}/following`, {
    username: username,
  });
  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await axios.get(`${USERS_API}/${userId}`);
  return response.data;
};

export const getUserByUsername = async (username: string) => {
  const response = await axios.get(`${USERS_API}/getuser/${username}`);
  return response.data;
};

export const getUserSongs = async (userId: string) => {
  const response = await axios.get(`${USERS_API}/songs/${userId}`);
};
// Reviews
export const REVIEWS_API = `http://localhost:4000/api/reviews`;

export const createReview = async (review: any) => {
  const response = await axios.post(`${REVIEWS_API}`, review);

  return response.data;
};

export const addToFavorite = async (songId: any) => {
  const response = await axios.post(`${USERS_API}/addfav`, {songId: songId});

  return response.data;
};

export const getUserReviews = async (username: string) => {
  const response = await axios.get(`${REVIEWS_API}/reviewer/${username}`);
  console.log("Response:" + JSON.stringify(response));
  return response.data;
};

