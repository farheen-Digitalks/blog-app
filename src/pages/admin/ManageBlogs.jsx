import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import useDebounce from "../../hooks/useDebounce";
import { deletePost, getPosts } from "../../services/postService";
import { Search, FileX } from "lucide-react";

const ManageBlogs = () => {

  // for pagination and debounce search 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/posts?page=${page}&search=${debouncedSearch}`).catch(async () => {
        // Fallback if admin route doesn't exist
        return { data: { posts: await getPosts(), totalPages: 1 } };
      });

      const fetchedBlogs = res.data || [];
      console.log(res);
      setBlogs(Array.isArray(fetchedBlogs) ? fetchedBlogs : []);
      setTotalPages(res.data?.totalPages || 1);
    } catch (error) {
      console.log("Error loading blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deletePost(id);
        loadBlogs();
      } catch (error) {
        console.log(error);
        alert("Failed to delete blog");
      }
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [page, debouncedSearch]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Manage Blogs</h1>
          <p className="text-slate-500 mt-1 text-sm">View, edit, and moderate all blog posts</p>
        </div>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            value={search}
            placeholder="Search blogs..."
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 bg-slate-50 rounded-lg pl-11 pr-4 py-2.5 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white shadow-sm transition-all"
          />
          <Search className="absolute left-4 top-3 text-slate-400" size={18} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-slate-50/80 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-600 text-xs tracking-wider uppercase">Image</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 text-xs tracking-wider uppercase">Content</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 text-xs tracking-wider uppercase">Author</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 text-xs tracking-wider uppercase">Date</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 text-xs tracking-wider uppercase text-center">Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 text-xs tracking-wider uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-16 text-center text-slate-400 bg-slate-50/50">
                      <div className="flex flex-col items-center justify-center">
                        <FileX size={48} strokeWidth={1} className="text-slate-300 mb-4" />
                        <p className="font-medium text-lg text-slate-500">No blogs found.</p>
                        <p className="text-sm mt-1">Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog, index) => (
                    <tr key={blog.id} className="hover:bg-slate-50/80 transition-colors duration-200 animate-fade-in-up group" style={{ animationDelay: `${index * 0.05}s` }}>
                      <td className="px-6 py-4">
                        {blog.image_url ? (
                          <img src={`http://localhost:3000${blog.image_url}`} alt="Blog post" className="h-14 w-14 object-cover rounded-xl shadow-sm border border-slate-200" />
                        ) : (
                          <div className="h-14 w-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 border border-slate-200 shadow-sm">N/A</div>
                        )}
                      </td>
                      <td className="px-6 py-4 w-2/5">
                        <p className="font-medium text-slate-800 line-clamp-2 leading-relaxed">{blog.content || 'No content'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                            {(blog.User?.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-slate-700">{blog.User?.name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm font-medium">
                        {blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          PUBLISHED
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button onClick={() => handleDelete(blog.id)} className="bg-white hover:bg-red-50 hover:text-red-600 text-slate-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm border border-slate-200 hover:border-red-200 cursor-pointer text-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  )))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-slate-500 font-medium">
          Showing page <span className="font-bold text-slate-800">{page}</span> of <span className="font-bold text-slate-800">{totalPages || 1}</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg disabled:opacity-50 text-slate-600 font-medium hover:bg-slate-50 transition-colors shadow-sm text-sm"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg disabled:opacity-50 text-slate-600 font-medium hover:bg-slate-50 transition-colors shadow-sm text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;