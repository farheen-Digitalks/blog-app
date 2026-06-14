const CommentTable = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return <p>No comments yet.</p>;
    }

    return (
        <table className="w-full text-left border-collapse border border-gray-200">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-3 border-b">User</th>
                    <th className="p-3 border-b">Comment</th>
                    <th className="p-3 border-b">Date</th>
                </tr>
            </thead>
            <tbody>
                {comments.map((comment) => (
                    <tr key={comment._id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{comment.user?.name || "Anonymous"}</td>
                        <td className="p-3">{comment.text}</td>
                        <td className="p-3">{new Date(comment.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CommentTable;
