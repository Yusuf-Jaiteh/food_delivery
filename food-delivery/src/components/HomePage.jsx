import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';

const HomePage = ({ user }) => {
  const [menus, setMenus] = useState([]);
  const { isLoggedIn, role} = useAuth;

  useEffect(() => {
    // Fetch menus from backend
    axios.get('http://localhost:8080/api/menus').then((response) => {
      setMenus(response.data);
    });
  }, []);

  const handleOrder = (menuId) => {
    // Create a new order
    axios.post('http://localhost:8080/api/orders', { customerId: user.id, menuId })
      .then(() => alert('Order placed successfully!'))
      .catch(() => alert('Failed to place order'));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Available Menus
      </Typography>
      <Grid container spacing={3}>
        {menus.map((menu) => (
          <Grid item xs={12} sm={6} md={4} key={menu.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{menu.name}</Typography>
                <Typography>{menu.description}</Typography>
                <Typography variant="h6">${menu.price}</Typography>
                {/* <Button variant="contained" color="primary" onClick={() => handleOrder(menu.id)}>
                    Order Now
                  </Button> */}
                {(isLoggedIn && role === 'CUSTOMER') && (
                  <Button variant="contained" color="primary" onClick={() => handleOrder(menu.id)}>
                    Order Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
