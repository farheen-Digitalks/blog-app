import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  getUserById,
  updateUser
} from "../services/userService";

const EditUser = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      role: ""
    });

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser = async () => {

    const res =
      await getUserById(id);

    setFormData(res.data);

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await updateUser(
      id,
      formData
    );

    navigate("/admin/users");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="user">
          User
        </option>

        <option value="admin">
          Admin
        </option>
      </select>

      <button type="submit">
        Update User
      </button>

    </form>
  );
};

export default EditUser;