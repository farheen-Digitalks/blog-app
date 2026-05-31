import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">Blogify</h2>
      <nav>

        <NavLink to="/admin">
          Dashboard
        </NavLink>

        <NavLink to="/admin/users">
          Users
        </NavLink>

        <NavLink to="/admin/blogs">
          Blogs
        </NavLink>

        <NavLink to="/admin/settings">
          Settings
        </NavLink>

      </nav>

    </aside>
  );
};

export default AdminSidebar;