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

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/create"
                    element={<CreatePost />}
                />

                <Route
                    path="/admin"
                    element={

                        <AdminDashboard />

                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ManageUsers />
                    }
                />

                <Route
                    path="/admin/blogs"
                    element={
                        <ManageBlogs />
                    }
                />
            </Routes>


        </BrowserRouter>
    );
};

export default AppRoutes;