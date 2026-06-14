import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import useDebounce from "../../hooks/useDebounce";
import { getPosts } from "../../services/postService";

const ManageBlogs = () => {

  // for pagination and debounce search 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBlogs = async () => {
    try {
      setLoading(true);
      // Fallback to postService getPosts if no pagination is needed, or keep api.get
      const res = await api.get(`/admin/blogs/posts?page=${page}&search=${debouncedSearch}`).catch(async () => {
         // If admin route doesn't exist, use the regular getPosts
         return { data: await getPosts() };
      });
      
      const fetchedBlogs = res.data?.posts || res.data || [];
      
      setBlogs(Array.isArray(fetchedBlogs) ? fetchedBlogs : []);
      setTotalPages(res.data?.totalPages || 1);

    } catch (error) {
      console.log("Failed to fetch blogs", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await api.delete(`/posts/${id}`);
        getBlogs();
      } catch (error) {
        console.log(error);
        alert("Failed to delete blog");
      }
    }
  };

  useEffect(() => {
    getBlogs();
  }, [page, debouncedSearch]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>

        <div className="relative">
          <input
            type="text"
            value={search}
            placeholder="Search blogs..."
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg pl-4 pr-10 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading blogs...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Image</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Content</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Author</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    {blog.image_url ? (
                      <img src={`http://localhost:3000${blog.image_url}`} alt="Blog post" className="h-12 w-12 object-cover rounded shadow-sm" />
                    ) : (
                      <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">N/A</div>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-800 line-clamp-2">{blog.content || 'No content'}</p>
                  </td>
                  <td className="p-4 text-gray-600">
                    {blog.User?.name || 'Unknown'}
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Published
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <Link to={`/admin/blogs/edit/${blog.id}`} className="text-blue-600 hover:text-blue-900 mr-4 font-medium text-sm">Edit</Link>
                    <button onClick={() => handleDelete(blog.id)} className="text-red-600 hover:text-red-900 font-medium text-sm">Delete</button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Showing page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
        </p>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default ManageBlogs;