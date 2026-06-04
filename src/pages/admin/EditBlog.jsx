import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  getPostById,
  updatePost
} from "../services/postService";

const EditPost = () => {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      title: "",
      content: "",
      image: null
    });

  useEffect(() => {

    fetchPost();

  }, []);

  const fetchPost =
    async () => {

      const res =
        await getPostById(id);

      setFormData({
        title:
          res.data.title,
        content:
          res.data.content,
        image: null
      });

    };

  const handleChange =
    (e) => {

      const {
        name,
        value,
        files
      } = e.target;

      setFormData({
        ...formData,
        [name]:
          files
            ? files[0]
            : value
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const data =
        new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "content",
        formData.content
      );

      if (
        formData.image
      ) {

        data.append(
          "image",
          formData.image
        );

      }

      await updatePost(
        id,
        data
      );

      navigate(
        "/admin/blogs"
      );
    };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="flex flex-col gap-4"
    >

      <input
        name="title"
        value={
          formData.title
        }
        onChange={
          handleChange
        }
      />

      <textarea
        name="content"
        value={
          formData.content
        }
        onChange={
          handleChange
        }
      />

      <input
        type="file"
        name="image"
        onChange={
          handleChange
        }
      />

      <button
        type="submit"
      >
        Update Blog
      </button>

    </form>
  );
};

export default EditPost;