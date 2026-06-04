import { useEffect, useState } from "react";
import api from "../../services/api";
import useDebounce from "../../hooks/useDebounce";

const ManageBlogs = () => {

  // for pagination and debounce search 
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {

      const res = await api.get(`/admin/blogs/posts?page=${page}&search=${debouncedSearch}`);

      setBlogs(res.data);
      setTotalPage(res.data.totalPges);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [page, debouncedSearch]);

  return (
    <div>
      <input type="text" value={search} placeholder="search" onChange={(e) => setSearch(e.target.value)} />

      <h1>Manage Blogs</h1>

      {
        blogs.map((blog) => (
          <div key={blog._id}>

            <h3>{blog.title}</h3>

            <p>
              {blog.createdBy?.name}
            </p>

          </div>
        ))
      }

      {/* pagination */}
      <div>
        <button
          disabled={
            page === 1
          }
          onClick={() =>
            setPage(
              page - 1
            )
          }
        >
          Prev
        </button>

        <span>
          {" "}
          {page} / {
            totalPages
          }{" "}
        </span>

        <button
          disabled={
            page ===
            totalPages
          }
          onClick={() =>
            setPage(
              page + 1
            )
          }
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default ManageBlogs;