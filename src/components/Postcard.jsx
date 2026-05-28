const PostCard = ({ post }) => {
  return (
    <div className="border rounded-xl p-4 shadow">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-52 object-cover rounded"
        />
      )}

      <h2 className="text-2xl font-bold mt-3">
        {post.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {post.content.slice(0, 100)}...
      </p>
    </div>
  );
};

export default PostCard;