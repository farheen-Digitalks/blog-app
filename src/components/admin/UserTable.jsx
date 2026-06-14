const UserTable = ({ users }) => {
    return (
        <table className="user-table w-full text-left border-collapse">
            <thead>
                <tr className="border-b">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Action</th>
                </tr>
            </thead>

            <tbody>
                {users?.map(user => (
                    <tr key={user._id} className="border-b">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.role}</td>
                        <td className="p-3">
                            <button className="delete-btn bg-red-500 text-white px-3 py-1 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserTable;