import { useEffect, useState } from "react";
import api from "../../services/api";

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

      <h1>Manage Users</h1>

      {
        users.map((user)=>(
          <div key={user._id}>

            <h3>{user.name}</h3>
            <p>{user.email}</p>

          </div>
        ))
      }

    </div>
  );
};

export default ManageUsers;