import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login = () => {
    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        email: "",
        password: ""
    })

    const [loading, setloading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.prevenDefault();

        try {
            setloading(true);
            const response = await login(formdata);
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/admin");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setloading(false);
        }
    }

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Welcome Back 👋</h1>
                <p>Login to your account</p>

                <form onSubmit={handleSubmit} className="auth-form">

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                    />

                    <button disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
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