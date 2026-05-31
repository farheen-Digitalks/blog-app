import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminDashboard = () => {

  const [data, setData] = useState({});

  const getDashboard = async () => {
    try {

      const res = await api.get("/admin/dashboard");

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div>

      <h1>Admin Dashboard</h1>

      <h3>Total Users: {data.totalUsers}</h3>

      <h3>Total Blogs: {data.totalBlogs}</h3>

      <hr />

      <h2>Recent Users</h2>

      {
        data.recentUsers?.map((user) => (
          <p key={user._id}>
            {user.name}
          </p>
        ))
      }

      <hr />

      <h2>Recent Blogs</h2>

      {
        data.recentBlogs?.map((blog) => (
          <div key={blog._id}>
            <h4>{blog.title}</h4>
            <p>{blog.createdBy?.name}</p>
          </div>
        ))
      }

    </div>
  );
};

export default AdminDashboard;