import api from "./api";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const createPost = async (formData) => {
  const response = await api.post(
    "/posts",
    formData
  );

  return response.data;
};

export const updatePost = async (id, formData) => {
  const response = await api.put(
    `/posts/${id}`,
    formData
  );
  return response.data;
};

export const deletePost = async (id) => {
  return await api.delete(`/posts/${id}`);
};