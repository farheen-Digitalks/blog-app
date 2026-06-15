import { useState } from "react";
import { createPost } from "../services/postService";
import { PenTool, Image as ImageIcon, Send, Loader2 } from "lucide-react";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        content: "",
        image: null
    });

    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files[0]) {
            setFormData({
                ...formData,
                [name]: files[0]
            });
            // Create preview URL for the image
            setPreviewUrl(URL.createObjectURL(files[0]));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
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

            await createPost(data);
            alert("Post Created Successfully");

            setFormData({
                content: "",
                image: null
            });
            setPreviewUrl(null);

        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Something went wrong while creating the post"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-[1000px] mx-auto animate-fade-in-up">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                    <PenTool className="text-indigo-600" size={28} />
                    Create New Post
                </h1>
                <p className="text-slate-500 mt-2 text-sm">Write your thoughts and share them with the world</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Post Content
                        </label>
                        <textarea
                            name="content"
                            placeholder="What's on your mind? Write your blog content here..."
                            className="w-full border border-slate-200 p-4 rounded-xl h-48 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white resize-y text-slate-700 leading-relaxed"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Cover Image (Optional)
                        </label>
                        
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group overflow-hidden relative">
                                {previewUrl ? (
                                    <>
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="bg-slate-900/70 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">Change Image</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="p-3 bg-indigo-50 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                            <ImageIcon className="w-6 h-6 text-indigo-500" />
                                        </div>
                                        <p className="mb-1 text-sm text-slate-500">
                                            <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="image"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-slate-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || !formData.content.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-md shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Publish Post
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;