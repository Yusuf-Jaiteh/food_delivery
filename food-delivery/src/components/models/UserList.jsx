import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';

function UserList(){

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers()
    }, [users]);

    function addUser(){
        navigate('/add-user')
    }

    function editUser(id) {
        navigate(`/add-user/${id}`); 
    }


   
    function fetchUsers(){
        fetch('http://localhost:8080/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error(error));
    }

    
    function deleteUser(id){
        const isDelete = confirm("Do you want to delete this user!");
        if(isDelete){
            const response = fetch(`http://localhost:8080/api/users/${id}` ,{
                method: "DELETE",
            })
            fetchUsers();
        }
    }

    
    return(
        <>
            <div className='min-vh-100' style={{backgroundColor: '#3333'}}> 
                <h1>Users</h1>
                <div className='text-end'>
                <button className='btn btn-primary my-3 me-3' onClick={addUser}>Add User</button>
                </div>
                <table className='table ms-2 table-light table-striped table-bordered'>
                    <thead>
                        <tr> 
                            <th>
                                No.
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Username
                            </th>
                            <th>
                                Role
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => 
                            <tr key={user.id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {user.firstName}
                                </td>
                                <td>
                                    {user.lastName}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role} 
                                </td>
                                <td>
                                    <button className='btn btn-warning me-2' onClick={() => editUser(user.id)}>EDIT</button>
                                    <button className='btn btn-danger' onClick={() => deleteUser(user.id)}>DELETE</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default UserList