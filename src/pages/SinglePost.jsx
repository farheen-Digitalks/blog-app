import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import CommentTable from "../components/CommentTable";
import Navbar from "../components/Navbar";

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    const fetchPostAndComments = async () => {
        try {
            const postRes = await api.get(`/posts/${id}`);
            setPost(postRes.data);
            const commentsRes = await api.get(`/posts/${id}/comments`);
            setComments(commentsRes.data);
        } catch (error) {
            console.log("Error fetching post or comments", error);
        }
    };

    useEffect(() => {
        fetchPostAndComments();
    }, [id]);

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                <Navbar />
                <div className="flex-1 flex justify-center items-center pb-32">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-medium">Loading post...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />
            
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
                <Link to="/home" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-8 transition-colors">
                    <span className="mr-2">←</span> Back to all posts
                </Link>

                <header className="mb-10 text-center">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs mb-6 border border-blue-100 uppercase tracking-wider">
                        Article
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm">
                                {(post.User?.name || "A").charAt(0).toUpperCase()}
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium text-gray-900">{post.User?.name || "Anonymous Author"}</p>
                                <p className="text-xs">Published on {post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {post.image_url || post.image ? (
                    <figure className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative max-h-[500px]">
                        <img 
                            src={`http://localhost:3000${post.image_url || post.image}`} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                        />
                    </figure>
                ) : (
                    <div className="h-10"></div>
                )}

                <div className="prose prose-lg prose-indigo mx-auto text-gray-700 leading-relaxed whitespace-pre-wrap bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    {post.content}
                </div>

                <hr className="my-16 border-gray-200" />

                <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Discussion</h2>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">{comments.length}</span>
                    </div>
                    
                    <CommentTable comments={comments} />
                </section>
            </article>
        </div>
    );
};

export default SinglePost;
