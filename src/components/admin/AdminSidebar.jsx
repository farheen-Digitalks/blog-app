import { NavLink } from "react-router-dom";
import { hasAnyPermission } from "../../utils/checkPermission";
import { LayoutDashboard, Users, FileText, PenTool, Settings, User } from "lucide-react";

const AdminSidebar = () => {
  const menuItems = [
    { path: "/admin", title: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/admin/users", title: "Manage Users", module: "USERS", actions: ["READ", "UPDATE", "DELETE"], icon: <Users size={20} /> },
    { path: "/admin/blogs", title: "Manage Blogs", module: "POSTS", actions: ["READ", "UPDATE", "DELETE"], icon: <FileText size={20} /> },
    { path: "/admin/create", title: "Create Post", module: "POSTS", actions: ["CREATE"], icon: <PenTool size={20} /> },
    { path: "/admin/settings", title: "Settings", icon: <Settings size={20} /> }
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 flex-shrink-0 flex flex-col min-h-screen border-r border-slate-800 z-20">
      <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800/50">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">B</div>
        <h2 className="text-xl font-bold tracking-tight text-white">Blogify</h2>
      </div>
      
      <nav className="flex-1 py-6 px-4 flex flex-col gap-1.5">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Menu</div>
        {menuItems.map((item, index) => {
          let hasAccess = true;
          if (item.module && item.actions) {
            hasAccess = hasAnyPermission(item.module, item.actions);
          }
          if (!hasAccess) return null;

          return (
            <NavLink 
              key={index} 
              to={item.path} 
              end 
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm
                ${isActive 
                  ? 'bg-indigo-600/10 text-indigo-400' 
                  : 'hover:bg-slate-800/50 hover:text-slate-100'
                }
              `}
            >
              {item.icon}
              {item.title}
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800/50">
        <div className="bg-slate-800/50 p-3 rounded-xl flex items-center gap-3 border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <User size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin User</p>
            <p className="text-xs text-slate-400">View Profile</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;