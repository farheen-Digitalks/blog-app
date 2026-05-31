import { useEffect, useState } from "react";
import api from "../../api/axios";

const ManageBlogs = () => {

  const [blogs,setBlogs] = useState([]);

  const getBlogs = async () => {
    try{

      const res = await api.get("/admin/blogs");

      setBlogs(res.data);

    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    getBlogs();
  },[]);

  return (
    <div>

      <h1>Manage Blogs</h1>

      {
        blogs.map((blog)=>(
          <div key={blog._id}>

            <h3>{blog.title}</h3>

            <p>
              {blog.createdBy?.name}
            </p>

          </div>
        ))
      }

    </div>
  );
};

export default ManageBlogs;