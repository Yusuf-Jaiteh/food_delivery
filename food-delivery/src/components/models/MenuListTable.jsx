import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';

function MenuListTable() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch("http://localhost:8080/api/menus"); 
        if (!response.ok) {
          throw new Error("Failed to fetch menus");
        }
        const data = await response.json();
        setMenus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [menus]);


  function addMenu(){
    navigate('/menu-form')
  }


  function editMenu(id) {
    navigate(`/menu-form/${id}`); 
  }


  function deleteMenu(id){
    const isDelete = confirm("Do you want to delete this menu!");
    if(isDelete){
        const response = fetch(`http://localhost:8080/api/menus/${id}` ,{
            method: "DELETE",
        })
       setMenus([])
    }
}

  
  if (loading) {
    return <p>Loading menus...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <TableContainer>
        <Typography variant="h4" gutterBottom>
                  Menus
        </Typography>

        <div className='text-end'>
                <button className='btn btn-primary my-3 me-3' onClick={addMenu}>Add Menu</button>
                </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Menu Number</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menus.map((menu, index) => (
            <TableRow key={menu.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{menu.name}</TableCell>
              <TableCell>{menu.description}</TableCell>
              <TableCell>{menu.price}</TableCell>
              <TableCell>
                  <Button onClick={() => editMenu(menu.id)}>EDIT</Button>
                  <Button onClick={() => deleteMenu(menu.id)}>DELETE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}

export default MenuListTable;
