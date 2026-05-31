import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "../pages/Home";

import Login from "../pages/Login";

import CreatePost from "../pages/CreatePost";

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
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <ManageUsers />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/blogs"
                    element={
                        <AdminRoute>
                            <ManageBlogs />
                        </AdminRoute>
                    }
                />
            </Routes>


        </BrowserRouter>
    );
};

export default AppRoutes;