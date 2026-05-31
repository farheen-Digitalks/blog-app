import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {

    const [data, setData] = useState({});

    const getDashboard = async () => {
        try {

            const res = await api.get("/admin/dashboard");

            setData(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDashboard();
    }, []);

    return (
        <div className="dashboard-container">

            <aside className="sidebar">
                <h2>Admin Panel</h2>

                <ul>
                    <li>Dashboard</li>
                    <li>Users</li>
                    <li>Blogs</li>
                    <li>Settings</li>
                </ul>
            </aside>

            <main className="dashboard-content">

                <h1>Dashboard</h1>

                <div className="cards">

                    <div className="card">
                        <h3>Total Users</h3>
                        <p>150</p>
                    </div>

                    <div className="card">
                        <h3>Total Blogs</h3>
                        <p>450</p>
                    </div>

                    <div className="card">
                        <h3>Published Blogs</h3>
                        <p>400</p>
                    </div>

                    <div className="card">
                        <h3>Draft Blogs</h3>
                        <p>50</p>
                    </div>

                </div>

            </main>

        </div>
    );
};

export default AdminDashboard;