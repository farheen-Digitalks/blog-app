import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="sidebar">

      <h2 className="logo">Blogify</h2>

      <nav>

        <Link to="/admin/dashboard">
          Dashboard
        </Link>

        <Link to="/admin/blogs">
          Blogs
        </Link>

        <Link to="/admin/users">
          Users
        </Link>

        <Link to="/admin/categories">
          Categories
        </Link>

        <Link to="/admin/settings">
          Settings
        </Link>

      </nav>

    </aside>
  );
};

export default Sidebar;