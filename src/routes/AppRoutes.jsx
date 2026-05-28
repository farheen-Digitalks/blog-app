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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;