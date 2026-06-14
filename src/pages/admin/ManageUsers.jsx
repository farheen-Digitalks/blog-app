import { useEffect, useState } from "react";
import api from "../../services/api";
import UserTable from "../../components/admin/UserTable";

const ManageUsers = () => {

  const [users,setUsers] = useState([]);

  const getUsers = async () => {
    try{

      const res = await api.get("/admin/users");

      setUsers(res.data);

    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    getUsers();
  },[]);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <UserTable users={users} />

    </div>
  );
};

export default ManageUsers;