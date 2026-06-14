import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            setLoading(true);

            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };

            const response = await registerUser(payload);

            alert(response.data.message);
            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Create Account 🚀</h1>
                <p>Join Blogify today</p>

                <form onSubmit={handleSubmit} className="auth-form">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="companyEmail"
                        placeholder="Company Email"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <button disabled={loading}>
                        {loading ? "Registering..." : "Register"}
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