import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative overflow-hidden h-56 bg-gray-100">
          {post.image_url || post.image ? (
            <img
              src={`http://localhost:3000${post.image_url || post.image}`}
              alt={post.title || "Blog post"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
              📝
            </div>
          )}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-700 shadow-sm">
            Blog
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {post.title || "Untitled Post"}
          </h2>

          <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow">
            {post.content ? post.content.substring(0, 120) + "..." : "No preview available for this post."}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                {(post.User?.name || "A").charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700">{post.User?.name || "Author"}</span>
            </div>
            <span className="text-xs text-gray-500 font-medium">Read more →</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;