const UserTable = ({ users }) => {
    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-xl border border-gray-100">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <tr>
                        <th className="p-4 font-semibold text-gray-600 text-sm tracking-wider uppercase">User</th>
                        <th className="p-4 font-semibold text-gray-600 text-sm tracking-wider uppercase">Role</th>
                        <th className="p-4 font-semibold text-gray-600 text-sm tracking-wider uppercase text-right">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {users?.map((user, index) => (
                        <tr
                            key={user._id}
                            className="hover:bg-blue-50/50 transition-colors duration-200 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.08}s` }}
                        >
                            <td className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md text-lg border-2 border-white">
                                        {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800 text-base">{user.name}</span>
                                        <span className="text-sm text-gray-500">{user.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${user.role?.name === 'admin' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                                    {(user.role?.name || 'user').toUpperCase()}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <button className="bg-red-50 hover:bg-red-500 hover:text-white text-red-600 px-4 py-1.5 rounded-lg font-medium transition-all duration-300 shadow-sm border border-red-100 cursor-pointer">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {(!users || users.length === 0) && (
                        <tr>
                            <td colSpan="3" className="p-10 text-center text-gray-400">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="text-4xl mb-3 opacity-30">👥</div>
                                    <p className="font-medium text-lg">No users found</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable;