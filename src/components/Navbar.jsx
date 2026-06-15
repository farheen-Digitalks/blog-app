import { Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const Navbar = () => {
    return (
        <header className="bg-white h-20 border-b border-slate-200 flex justify-between items-center px-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] z-10 sticky top-0 flex-shrink-0">
            <h1 className="text-xl font-semibold text-slate-800">
                {/* Optional page title could go here */}
            </h1>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="bg-slate-50 border border-slate-200 text-sm rounded-full pl-11 pr-4 py-2.5 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    />
                    <Search className="absolute left-4 top-2.5 text-slate-400" size={18} />
                </div>
                <button className="relative text-slate-500 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group">
                    <img
                        src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff"
                        alt="profile"
                        className="w-10 h-10 rounded-full border-2 border-indigo-100 group-hover:border-indigo-300 transition-all shadow-sm"
                    />
                </div>
            </div>
        </header>
    );
};

export default Navbar;