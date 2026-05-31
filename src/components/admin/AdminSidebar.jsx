import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div>
      <h2>Admin Panel</h2>

      <Link to="/admin/users">
        Manage Users
      </Link>

      <br />

      <Link to="/admin/blogs">
        Manage Blogs
      </Link>
    </div>
  );
};

export default AdminSidebar;