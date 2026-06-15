import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [loading, setloading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setloading(true);

            const payload = {
                email: formData.email,
                password: formData.password
            };

            const response = await login(payload);
            console.log(response)
            const { token, user } = response;

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
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4 relative overflow-hidden font-sans">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl mix-blend-multiply"></div>
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-100/40 blur-3xl mix-blend-multiply"></div>
            </div>

            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-white/50 relative z-10 animate-fade-in-up">
                
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center font-bold text-3xl text-white shadow-lg mb-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                        B
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="name@company.com"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5 ml-1">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
                        />
                    </div>

                    <button 
                        disabled={loading} 
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3.5 rounded-xl transition-all shadow-md mt-2 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="text-center mt-8 text-sm text-gray-600">
                    Don't have an account?
                    <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1 transition-colors">Create an account</Link>
                </div>

            </div>
        </div>
    );
};

export default Login;