import api from "./api";

export const register = async (formData) => {
  const response = await api.post("/auth/register", formData);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};
