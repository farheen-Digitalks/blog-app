import { useState } from "react";
import api from "../../services/api";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.post("/admin/users", formData);
            alert("User created successfully");
            setFormData({ name: "", email: "", password: "", role: "user" });
        } catch (error) {
            console.log(error);
            alert("Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Create User</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="border p-3 rounded" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-3 rounded" />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="border p-3 rounded" />
                <select name="role" value={formData.role} onChange={handleChange} className="border p-3 rounded">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" disabled={loading} className="bg-black text-white p-3 rounded">
                    {loading ? "Creating..." : "Create User"}
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
