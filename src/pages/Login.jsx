import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Welcome Back 👋</h1>
        <p>Login to your account</p>

        <form className="auth-form">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">
            Login
          </button>

        </form>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </div>

      </div>

    </div>
  );
};

export default Login;