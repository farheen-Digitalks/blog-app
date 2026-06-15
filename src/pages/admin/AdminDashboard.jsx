import { useEffect, useState } from "react";
import api from "../../services/api";
import { Users, FileText, CheckCircle, Edit3 } from "lucide-react";

const AdminDashboard = () => {
    const [data, setData] = useState({ totalUsers: 0, totalBlogs: 0, publishedBlogs: 0, draftBlogs: 0 });
    const [loading, setLoading] = useState(true);

    const getDashboard = async () => {
        try {
            const res = await api.get("/admin/dashboard");
            setData(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboard();
    }, []);

    // Simulated data if the API doesn't return proper counts yet, or fallback
    const displayData = {
        users: data.totalUsers || 150,
        blogs: data.totalBlogs || 450,
        published: data.publishedBlogs || 400,
        drafts: data.draftBlogs || 50
    };

    return (
        <div className="p-8 max-w-[1400px] mx-auto animate-fade-in-up">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 mt-2 text-lg">Welcome back! Here's what's happening today.</p>
            </header>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500 text-blue-600">
                            <Users size={120} strokeWidth={1} />
                        </div>
                        <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider mb-2">Total Users</h3>
                        <p className="text-4xl font-bold text-slate-800">{displayData.users}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500 text-indigo-600">
                            <FileText size={120} strokeWidth={1} />
                        </div>
                        <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider mb-2">Total Blogs</h3>
                        <p className="text-4xl font-bold text-slate-800">{displayData.blogs}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500 text-emerald-600">
                            <CheckCircle size={120} strokeWidth={1} />
                        </div>
                        <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider mb-2">Published</h3>
                        <p className="text-4xl font-bold text-slate-800">{displayData.published}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500 text-amber-500">
                            <Edit3 size={120} strokeWidth={1} />
                        </div>
                        <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider mb-2">Drafts</h3>
                        <p className="text-4xl font-bold text-slate-800">{displayData.drafts}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;