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
import { ProtectedRoute } from "../middleware/ProtectedRoute";
import SinglePost from "../pages/SinglePost";

function AppRoutes() {
    return (
        <BrowserRouter>
            {/* <Navbar /> */}

            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/post/:id"
                    element={<SinglePost />}
                />

                <Route
                    element={<ProtectedRoute />}
                >

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
                        <Route
                            path="create"
                            element={<CreatePost />}
                        />
                        {/* <Route
                        path="settings"
                        element={<Settings />}
                    /> */}
                    </Route>

                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;