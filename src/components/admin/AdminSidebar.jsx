import { NavLink } from "react-router-dom";
import { hasAnyPermission } from "../../utils/checkPermission";

const AdminSidebar = () => {

  const menuItems = [
    {
      path: "/admin",
      title: "Dashboard",
    },
    {
      path: "/admin/users",
      title: "Manage Users",
      module: "USERS",
      actions: ["READ", "UPDATE", "DELETE"]
    },
    {
      path: "/admin/users/create",
      title: "Create User",
      module: "USERS",
      actions: ["CREATE"]
    },
    {
      path: "/admin/blogs",
      title: "Manage Blogs",
      module: "POSTS",
      actions: ["READ", "UPDATE", "DELETE"]
    },
    {
      path: "/admin/create",
      title: "Create Post",
      module: "POSTS",
      actions: ["CREATE"]
    },
    {
      path: "/admin/settings",
      title: "Settings",
    }
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">Blogify</h2>
      <nav>
        {menuItems.map((item, index) => {
          let hasAccess = true;

          if (item.module && item.actions) {
            hasAccess = hasAnyPermission(item.module, item.actions);
          }

          if (!hasAccess) return null;

          return (
            <NavLink key={index} to={item.path} end>
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;