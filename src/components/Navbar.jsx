import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black text-white px-6 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        Blog App
      </h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>

        <Link to="/create">
          Create Post
        </Link>

        <Link to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;