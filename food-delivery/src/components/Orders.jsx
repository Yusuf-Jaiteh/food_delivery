import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { role, username } = useAuth();

  useEffect(() => {
    getOrders();
  }, []);

  const changeStatus = (orderId, order) => {
    order.status = 'DELIVERED';
    axios.put(`http://localhost:8080/api/orders/${orderId}`,  order )
      .then(() => {
        getOrders();
      });
  };

  const getOrders = () => {
    axios.get('http://localhost:8080/api/orders').then((response) => {
      setOrders(response.data);
    });
  }

  return (
    <>
    <div className='vh-100'>

    
        <TableContainer>
          {role === 'STAFF' ?
              <Typography variant="h4" gutterBottom>
                      ORDERS
              </Typography>
              :
              role ==='CUSTOMER' ?
                <Typography variant="h4" gutterBottom>
                    MY ORDERS
                </Typography> :
                  <Typography variant="h4" gutterBottom>
                      MY DELIVERIES
                  </Typography>
          }
          {role === 'STAFF' &&
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order NO:</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>DELIVERER</TableCell>
                <TableCell>Menu</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.customer.firstName}</TableCell>
                  <TableCell>{order.deliverer.firstName}</TableCell>
                  <TableCell>{order.menu.name}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {order.status === 'PENDING' && (
                      <Button onClick={() => changeStatus(order.id, order)}>Mark as Delivered</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          }

        {role === 'DELIVERER' &&
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order NO:</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Menu</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {orders
              .filter(order => order.deliverer.email === username) // Filter orders based on the condition
              .map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.customer.firstName}</TableCell>
                  <TableCell>{order.menu.name}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {order.status === 'PENDING' && (
                      <Button onClick={() => changeStatus(order.id, order)}>Mark as Delivered</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          }

        {role === 'CUSTOMER' &&
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order NO:</TableCell>
                <TableCell>DELIVERER</TableCell>
                <TableCell>Menu</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {orders
              .filter(order => order.customer.email === username) // Filter orders based on the condition
              .map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.customer.firstName}</TableCell>
                  <TableCell>{order.menu.name}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          }
        </TableContainer>


        </div>
    </>
  );
};

export default Orders;
