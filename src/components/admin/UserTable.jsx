const UserTable = () => {
    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Farheen</td>
                    <td>farheen@gmail.com</td>
                    <td>User</td>
                    <td>
                        <button className="delete-btn">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default UserTable;