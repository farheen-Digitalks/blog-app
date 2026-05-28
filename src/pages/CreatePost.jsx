import { useState } from "react";

import { createPost } from "../services/postService";

const CreatePost = () => {
  const [title, setTitle] = useState("");

  const [content, setContent] =
    useState("");

  const [image, setImage] =
    useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);

    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      await createPost(formData);

      alert("Post Created");

      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Title"
          className="border p-3 rounded"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Content"
          className="border p-3 rounded h-40"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        <button className="bg-black text-white p-3 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;