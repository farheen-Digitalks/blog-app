import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreatePost from "../pages/CreatePost";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageBlogs from "../pages/admin/ManageBlogs";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../layout/AdminLayout";
import Register from "../pages/Register";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            {/* <Navbar /> */}

            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                 <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/create"
                    element={<CreatePost />}
                />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route
                        path="users"
                        element={<ManageUsers />}
                    />
                    <Route
                        path="blogs"
                        element={<ManageBlogs />}
                    />
                    {/* <Route
                        path="settings"
                        element={<Settings />}
                    /> */}
                </Route>
            
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;