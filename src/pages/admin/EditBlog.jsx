import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        content: "",
        image: null,
    });
    const [existingImage, setExistingImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/posts/${id}`);
                setFormData({
                    content: res.data.content || "",
                    image: null
                });
                setExistingImage(res.data.image_url ? `http://localhost:3000${res.data.image_url}` : null);
            } catch (error) {
                console.log(error);
                alert("Failed to fetch post details");
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
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
            data.append("content", formData.content);
            if (formData.image) {
                data.append("image", formData.image);
            }

            await api.put(`/posts/${id}`, data);
            alert("Post Updated Successfully");
            navigate("/admin/blogs");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Blog</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Title removed as it's not used in schema */}
                <textarea
                    name="content"
                    placeholder="Enter Content"
                    className="border border-gray-300 p-3 rounded h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
                {existingImage && !formData.image && (
                    <div className="mb-2">
                        <p className="text-sm text-gray-500 mb-1">Current Image:</p>
                        <img src={existingImage} alt="Current" className="h-32 object-cover rounded" />
                    </div>
                )}
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="text-gray-600"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update Post"}
                </button>
            </form>
        </div>
    );
};

export default EditBlog;
