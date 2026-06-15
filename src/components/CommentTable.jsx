const CommentTable = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return (
            <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50">
                <div className="text-4xl mb-3 opacity-30">💬</div>
                <h3 className="text-lg font-medium text-gray-900">No comments yet</h3>
                <p className="text-gray-500 mt-1">Be the first to share your thoughts!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {comments.map((comment, index) => (
                <div key={comment._id || index} className="flex gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-lg shadow-sm">
                            {(comment.user?.name || "A").charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-none p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{comment.user?.name || "Anonymous"}</h4>
                            <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
                                {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now'}
                            </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            {comment.text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentTable;
