import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Create Account 🚀</h1>
        <p>Join Blogify today</p>

        <form className="auth-form">

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

           <input
            type="text"
            placeholder="Company Name"
          />

           <input
            type="text"
            placeholder="Company Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            Register
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/login"> Login</Link>
        </div>

      </div>

    </div>
  );
};

export default Register;