import { useState } from "react";
import { createPost } from "../services/postService";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        content: "",
        image: null
    });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {
        const { name, value, files } =
            e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();

            data.append(
                "content",
                formData.content
            );

            if (formData.image) {
                data.append(
                    "image",
                    formData.image
                );
            }

            await createPost(data);

            alert("Post Created");

            setFormData({
                content: "",
                image: null
            });

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >

                <textarea
                    name="content"
                    placeholder="Enter Content"
                    className="border p-3 rounded h-40"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white p-3 rounded"
                >
                    {
                        loading
                            ? "Creating..."
                            : "Create Post"
                    }
                </button>

            </form>

        </div>
    );
};

export default CreatePost;