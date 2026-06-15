
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
 return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;