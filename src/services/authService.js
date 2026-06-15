import api from "./api";

export const platformUserregister = async (formData) => {
  const response = await api.post("/platformUser/register", formData);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post(
    "/platformUser/login",
    data
  );

  return response.data;
};
