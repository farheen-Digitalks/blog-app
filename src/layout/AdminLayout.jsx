
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
 return (
    <div className="layout">
      <AdminSidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;