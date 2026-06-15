import { useEffect, useState } from "react";
import api from "../../services/api";
import UserTable from "../../components/admin/UserTable";
import { Users, Plus, X } from "lucide-react";
import { createUser, getUsers } from "../../services/userService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      console.log(res)
      setUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createUser(formData);
      alert("User created successfully");
      setFormData({ name: "", email: "", password: "", role: "user" });
      setShowCreateForm(false);
      fetchUsers(); // Refresh table
    } catch (error) {
      console.log(error);
      alert("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Manage Users</h1>
          <p className="text-slate-500 mt-1 text-sm">View and manage system users and their roles</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2.5 rounded-lg text-indigo-700 font-medium border border-indigo-100 w-full sm:w-auto justify-center">
            <Users size={18} /> Total: {users.length}
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm w-full sm:w-auto"
          >
            {showCreateForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add New User</>}
          </button>
        </div>
      </div>

      {showCreateForm && (
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          <h2 className="text-xl font-bold text-slate-800 mb-6">Create New User</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white text-sm">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <button type="submit" disabled={loading} className="bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-lg font-medium transition-all shadow-sm disabled:opacity-70 flex items-center gap-2">
                {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                {loading ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      )}

      <UserTable users={users} />
    </div>
  );
};

export default ManageUsers;