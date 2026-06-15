import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { platformUserregister } from "../services/authService";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyName: "",
        companyEmail: "",
        name: "",
        email: "",
        password: ""
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

        try {
            setLoading(true);

            const payload = {
                companyName: formData.companyName,
                companyEmail: formData.companyEmail,
                name: formData.name,
                email: formData.email,
                password: formData.password
            };

            const response = await platformUserregister(payload);
            console.log(response);
            alert(response?.message);
            navigate("/");

        } catch (error) {

            alert(
                error.response?.message || error.response?.data?.message ||
                "Registration failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4 relative overflow-hidden font-sans">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-3xl mix-blend-multiply"></div>
                <div className="absolute bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl mix-blend-multiply"></div>
            </div>

            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-white/50 relative z-10 animate-fade-in-up">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create Account 🚀</h1>
                    <p className="text-gray-500">Join Blogify today</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white transition-all shadow-sm text-sm"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="companyEmail"
                                placeholder="Company Email"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white transition-all shadow-sm text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white transition-all shadow-sm text-sm"
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Personal Email Address"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white transition-all shadow-sm text-sm"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white transition-all shadow-sm text-sm"
                        />
                    </div>

                    <button 
                        disabled={loading}
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3.5 rounded-xl transition-all shadow-md mt-2 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                        {loading ? "Registering..." : "Create Account"}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-600">
                    Already have an account?
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1 transition-colors">Sign in</Link>
                </div>

            </div>
        </div>
    );
};

export default Register;