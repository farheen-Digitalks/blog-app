import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CommentTable from "../components/CommentTable";

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

    if (!post) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 mt-10">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            {post.image && <img src={post.image} alt={post.title} className="w-full h-96 object-cover mb-8 rounded shadow" />}
            <div className="text-gray-800 text-lg mb-12 whitespace-pre-wrap">{post.content}</div>

            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <CommentTable comments={comments} />
        </div>
    );
};

export default SinglePost;
